import express from "express";
import { termoModel } from "../models/termo.model.js";
import { UserModel } from "../models/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isEditor from "../middlewares/isEditor.js";

const termoRoute = express.Router();

//CREATE termo
termoRoute.post("/new-termo", isAuth, attachCurrentUser, async (req,res) => {
    try {
        const {_id} = req.currentUser
        const createdTermo = await termoModel.create({
            ...req.body, criadoPor:req.currentUser._id
          });
    console.log("id ",createdTermo._id)
    const userUpdated = await UserModel.findByIdAndUpdate(
        req.currentUser._id,
        {
        $push: {
            created: createdTermo._id,
        },
        },
        { new: true, runValidators: true }
    );
            
    return res.status(201).json(createdTermo);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

//READ em todos os termos
termoRoute.get("/all-termos", async (req, res) => {
  try {
    const termos = await termoModel.find({}).sort({
      termo: 1,
    });
    return res.status(201).json(termos);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ termo específico - popula somente ou editadoPor ou criadoPor
termoRoute.get("/termo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const termo = await termoModel.findById(id).populate("editadoPor");
        
    
        console.log("termo ",termo);
        if (!termo) {
          return res.status(400).json({ msg: " Termo não encontrado!" });
        }
        return res.status(200).json(termo);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error.errors);
      }
    });

//UPDATE termo
termoRoute.put("/edit/:idTermo",isAuth, attachCurrentUser, isEditor, async (req, res) => {
  try {
    const { idTermo } = req.params;
    const {_id} = req.currentUser

      const updatedTermo = await termoModel.findOneAndUpdate(
        { _id: idTermo },
        { ...req.body, editadoPor:req.currentUser._id },
        { new: true, runValidators: true }
      );

      const userUpdated = await UserModel.findByIdAndUpdate(
        req.currentUser._id,
        {
        $push: {
            edited: updatedTermo._id,
        },
        },
        { new: true, runValidators: true }
    );
      return res.status(200).json(updatedTermo);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  });

  //DELETE termo - não deleta o termo no array do usuário
  termoRoute.delete("/delete/:idTermo", isAuth, attachCurrentUser, async (req, res) => {
      try {
        const { idTermo} = req.params;
         
        const deletedTermo = await termoModel.findByIdAndDelete(idTermo);
         
          await UserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
              $pull: { created: deletedTermo._id }
            },
            { runValidators: true }
          );

          await UserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
              $pull: { edited: deletedTermo._id }
            },
            { runValidators: true }
          );

          console.log("teste ",deletedTermo.criadoPor)

        return res.status(200).json(deletedTermo);
      } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);
      }
    }
  );


export { termoRoute };
