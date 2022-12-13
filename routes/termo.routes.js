import express from "express";
import { termoModel } from "../models/termo.model.js";
import { UserModel } from "../models/user.model.js";

const termoRoute = express.Router();

//CREATE termo
termoRoute.post("/new-termo", async (req,res) => {
    try {
        const createdTermo = await termoModel.create({
            ...req.body,
          });

          createdTermo.criadoPor.forEach(async (element) => {
            await UserModel.findByIdAndUpdate(
              element.userID,
              {
                $push: { created: createdTermo._id },
              },
              { runValidators: true }
            );
          })

          return res.status(201).json(createdTermo);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

//READ em todos os termos
termoRoute.get("/all-termos", async (req,res) => {
    try {
        const termos = await termoModel.find({})
      .sort({
        termo: 1,
      })
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
      
      const termo = await termoModel.findById(id).populate({
        path: "editadoPor",
        populate: {
          path: "userID",
          model: "User",
        },
      });
      
  
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
termoRoute.put("/edit/:idTermo", async (req, res) => {
    try {
      const { idTermo } = req.params;

      const updatedTermo = await termoModel.findOneAndUpdate(
        { _id: idTermo },
        { ...req.body },
        { new: true, runValidators: true }
      );

      updatedTermo.editadoPor.forEach(async (element) => {
        await UserModel.findByIdAndUpdate(
          element.userID,
          {
            $push: { edited: updatedTermo._id },
          },
          { runValidators: true }
        );
      })
      return res.status(200).json(updatedTermo);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  });

  //DELETE termo - não deleta o termo no array do usuário
  termoRoute.delete("/delete/:idTermo", async (req, res) => {
      try {
        const { idTermo} = req.params;
         
        /*
        const deleteTermodeUser = await termoModel.findById(idTermo)
        console.log("teste ",deleteTermodeUser)

        deleteTermodeUser.editadoPor.forEach(async (element) => {
            await UserModel.findByIdAndUpdate(
              element.userID,
              {
                $pull: { edited: deleteTermodeUser._id },
              },
              { runValidators: true }
            );
          })
        */
        const deletedTermo = await termoModel.findByIdAndDelete(idTermo);
        return res.status(200).json(deletedTermo);
      } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);
      }
    }
  );


export { termoRoute };