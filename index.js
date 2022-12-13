import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();


//instanciar a variável que vai ficar responsável pelo nosso servidor
const app = express() 

<<<<<<< Updated upstream

// lógicas das rotas vão aqui //

connect();
=======
app.use(cors());
>>>>>>> Stashed changes

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json())

<<<<<<< Updated upstream
// app.use("/termo", termoRoute);
=======
// Conectando com banco de dados
connect();


// app.use("/user", userRoute);
// app.use("/log", logRoute);
app.use("/termo", termoRoute );
>>>>>>> Stashed changes

// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
	console.log(
		`App up and running on port http://localhost:${process.env.PORT}`
	);
});