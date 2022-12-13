import express from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt0";
import { generateToken } from "../config/jwt.confg.js";

const perfilUser = express.Router();

const saltRounds = 10;

perfilUser.post("/sign-up", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.mach(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm)
    ) {
      return res
        .status(400)
        .json({ msg: "Senha não tem os requisitos mínimos de sgurança" });
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
      return res.status(400).json({ msg: "Usuário não cadatrado!" });
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

perfilUser.get("/user/:id"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(400).json({ msg: "Usuário não encontrado!" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.erros);
    }
  };

perfilUser.delete("delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.erros);
  }
});

perfilUser.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const editUser = await Usermodel.findByAndUpdate(
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

//Tudo vai aqui dentro
export { perfilUser };
