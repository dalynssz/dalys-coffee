// Modelo de producto del catálogo
const mongoose = require("mongoose");
const { CATEGORY_IDS } = require("../data/products");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "El nombre es obligatorio."], trim: true, maxlength: 80 },
    price: { type: Number, required: [true, "El precio es obligatorio."], min: [0, "El precio no puede ser negativo."] },
    description: { type: String, trim: true, maxlength: 200, default: "" },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria."],
      enum: { values: CATEGORY_IDS, message: "Esa categoría no existe." },
    },
    available: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
