import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import { termoRoute } from "./routes/termo.routes.js";
import { perfilUser } from "./routes/perfil.user.js";

dotenv.config();

const app = express();
app.use(express.json());

// lógicas das rotas vão aqui //

connect();
app.use(cors({ origin: process.env.REACT_URL }));

// app.use("/user", userRoute);

app.use("/termo", termoRoute);

app.use("/user", perfilUser);

// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
	console.log(
		`App up and running on port http://localhost:${process.env.PORT}`
	);
});
