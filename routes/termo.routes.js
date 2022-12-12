import express from "express";
import { generateToken } from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { UserModel } from "../model/user.model.js";

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const termoRouter = express.Router();

//Get em todos os termos
termoRouter.get("/all-termos", async (req,res) => {
    try {
        const users = await termoModel.find({}, { __v: 0, updatedAt: 0 })
      .sort({
        termo: 1,
      })
      return res.status(201).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

termoRoute.get("/termo/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // const user = await UserModel.find({_id: id})
      const user = await UserModel.findById(id).populate("tasks");
  
      if (!user) {
        return res.status(400).json({ msg: " Usuário não encontrado!" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
  });

//Get termo específico


termoRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "Email ou senha invalidos. Verifique se ambos atendem as requisições.",
      });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    delete createdUser._doc.passwordHash;
    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

termoRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Email ou senha invalidos." });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        token: token,
      });
    } else {
      return res.status(401).json({ msg: "Email ou senha invalidos." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// userRouter.get(
//   "/teste",
//   isAuth,
//   attachCurrentUser,
//   isAdmin,
//   async (req, res) => {
//     return res.status(200).json(req.currentUser);
//   }
// );

export { termoRouter };