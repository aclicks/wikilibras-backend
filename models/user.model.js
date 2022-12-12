import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    phone: String,
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER", "EDITOR"], default: "USER" },
    photo: String,
    created: [{ type: Schema.Types.ObjectId, ref: "CriadoPor" }], //referência cruzada com termo.model
    edited: [{ type: Schema.Types.ObjectId, ref: "EditadoPor" }], //referência cruzada com termo.model
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);