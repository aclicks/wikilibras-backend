import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: { String },
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    phone: { String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER", "EDITOR"], default: "USER" },
    photo: { String },
    estado: {
      type: String,
      enun: [
        "Acre-AC",
        "Alagoas-AL",
        "Amapá-AP",
        "Amazonas-AM",
        "Bahia-BA",
        "Ceará-CE",
        "Distrito Federal-DF",
        "Espírito Santo-ES",
        "Goiás-GO",
        "Maranhão-MA",
        "Mato Grosso-MT",
        "Mato Grosso do Sul-MS",
        "Minas Gerais-MG",
        "Pará-PA",
        "Paraíba-PB",
        "Paraná-PR",
        "Pernambuco-PE",
        "Piauí-PI",
        "Rio de Janeiro-RJ",
        "Rio Grande do Norte-RN",
        "Rio Grande do Sul-RS",
        "Rondônia-RO",
        "Roraima-RR",
        "Santa Catarina-SC",
        "São Paulo-SP",
        "Sergipe-SE",
        "Tocantins-TO",
      ],
    },
    cidade: { type: String },
    created: [{ type: Schema.Types.ObjectId, ref: "Termo" }], //referência cruzada com termo.model
    edited: [{ type: Schema.Types.ObjectId, ref: "Termo" }], //referência cruzada com termo.model
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
