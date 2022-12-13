import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import { termoRoute } from "./routes/termo.routes.js";

dotenv.config();

const app = express() 
app.use(express.json())


// lógicas das rotas vão aqui //

connect();

// app.use("/user", userRoute);

app.use("/termo", termoRoute );

// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
	console.log(
		`App up and running on port http://localhost:${process.env.PORT}`
	);
});