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
    phone: { String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER", "EDITOR"], default: "USER" },
    photo: { String },
    estado: {
      type: String,
      enun: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
      ],
    },
    cidade: { type: String },
    created: [{ type: Schema.Types.ObjectId, ref: "Termo" }], //referência cruzada com termo.model
    edited: [{ type: Schema.Types.ObjectId, ref: "Termo" }], //referência cruzada com termo.model
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
