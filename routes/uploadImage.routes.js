import express from "express";
import { uploadImg } from "../config/cloudinary.config.js";
const uploadImgRouter = express.Router();

uploadImgRouter.post("/", uploadImg.single("picture"), (req, res) => {
  if (!req.file) {
    console.log(req.file);
    return res.status(400).json({ msg: "Upload fail" });
  }

  return res.status(201).json({ url: req.file.path });
});

router.get('/', (req, res) => {
  pic.find()
    .then(picFromDB => {
      // console.log(moviesFromDB);
      res.render(, { pic: picFromDB });
    })
    .catch(err => console.log(`Erro recuperando foto de perfil: ${err}`));
});



export { uploadImgRouter };
