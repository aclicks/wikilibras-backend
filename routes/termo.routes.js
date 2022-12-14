import express from "express";
import { termoModel } from "../models/termo.model.js";
import { UserModel } from "../models/user.model.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isEditor from "../middlewares/isEditor.js";

const termoRoute = express.Router();
//CREATE termo
termoRoute.post("/new-termo", async (req, res) => {
  try {
    const createdTermo = await termoModel.create({
      ...req.body,
    });

    //console.log("termo ",createdTermo)

    await UserModel.findByIdAndUpdate(
      {
        $push: { created: createdTermo._id },
      },
      { runValidators: true }
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

    const termo = await termoModel.findById(id).populate({
      path: "editadoPor",
      populate: {
        path: "userID",
        model: "User",
      },
    });

    console.log("termo ", termo);
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

    updatedTermo.editadoPor.forEach(async element => {
      await UserModel.findByIdAndUpdate(
        element.userID,
        {
          $push: { edited: updatedTermo._id },
        },
        { runValidators: true }
      );
    });
    return res.status(200).json(updatedTermo);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

//DELETE termo - não deleta o termo no array do usuário
termoRoute.delete("/delete/:idTermo", async (req, res) => {
  try {
    const { idTermo } = req.params;

    const deletedTermo = await termoModel.findByIdAndDelete(idTermo);
    /*
        await UserModel.findByIdAndUpdate(
            deletedTermo.editadoPor.userID,
            {
              $pull: { edited: idTermo }
            },
            { runValidators: true }
          );
        */
    await UserModel.findByIdAndUpdate(
      deletedTermo.criadoPor.userID,
      {
        $pull: { created: idTermo },
      },
      { runValidators: true }
    );

    console.log("teste ", deletedTermo.criadoPor);

    return res.status(200).json(deletedTermo);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export { termoRoute };
