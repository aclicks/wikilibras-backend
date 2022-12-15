import express from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.confg.js";
import { termoModel } from "../models/termo.model.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const perfilUser = express.Router();

const saltRounds = 10;

perfilUser.post("/sign-up", async (req, res) => {
  try {
    const {password} = req.body;

    console.log(password)

    if (
      !password ||
      !password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm)
      ) {
      return res
        .status(400)
        .json({ msg: "Senha não tem os requisitos mínimos de segurança" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashePassword = await bcrypt.hash(password, salt);

    //criar o usuário

    const newUser = await UserModel.create({
      ...req.body,
      passwordHash: hashePassword,
    });
    delete newUser._doc.passwordHash;
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

//login

perfilUser.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Usuário não cadastrado!" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      //criando token
      const token = generateToken(user);

      return res.status(200).json({
        user: user,
        token: token,
      });
    } else {
      return res.status(401).json({ msg: "Email ou Senha inválida!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.get("/all-users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.get("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      console.log("user ",user)
      if (!user) {
        return res.status(400).json({ msg: "Usuário não encontrado!" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.erros);
    }
  });

perfilUser.delete("/delete/:id", isAuth , attachCurrentUser , async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    //await termoModel.deleteOne({criadoPor:req.currentUser._id})
    //await termoModel.deleteOne({editadoPor:req.currentUser._id})
    

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const editUser = await UserModel.findByAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});


perfilUser.get("/profile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    //req.currentUser -> veio do middle attachCurrentUser

    return res.status(200).json(req.currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//Tudo vai aqui dentro
export { perfilUser };
