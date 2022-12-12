import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { termoRouter } from "../routes/termo.routes.js";
import { connectToDB } from "./config/db.config.js";
import { uploadImgRouter } from "./routes/uploadImage.routes.js";


dotenv.config();
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/termo", termoRouter );
//app.use("/uploadImage", uploadImgRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});