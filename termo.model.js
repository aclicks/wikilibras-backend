import { Schema, model } from "mongoose";

const termoSchema = new Schema(
  {
    termo: { type: String, required: true, trim: true },
    urlTermo: { type: String, required: true, trim: true },
    conceito: { type: String, required: true, trim: true },
    urlConceito: { type: String, required: true, trim: true },
    fraseContexto: { type: String, required: true, trim: true },
    cm: {
      type: String,
      enum: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
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
        "21",
        "22",
        "24",
        "25",
        "26",
        "28",
        "32",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
      ],
    },
    criadoPor: [{ type: String }], //guardar ID de usuário que criou
    editadoPor: [{ type: String }], //guardar IDs de usuários que editaram e fazer um populate
  },
  { timestamps: true }
);

export const termoModel = model("Termo", termoSchema);
