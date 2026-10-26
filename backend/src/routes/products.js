// =====================================================
// CATÁLOGO
// GET    /api/products      -> cualquiera: lista de productos
// POST   /api/products      -> admin: crear producto
// PUT    /api/products/:id  -> admin: editar producto
// DELETE /api/products/:id  -> admin: borrar producto
// =====================================================
const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// Solo dejamos pasar los campos que el admin puede cambiar
function pickFields(body = {}) {
  const fields = {};
  if (body.name !== undefined) fields.name = String(body.name).trim();
  if (body.price !== undefined) fields.price = Number(body.price);
  if (body.description !== undefined) fields.description = String(body.description).trim();
  if (body.category !== undefined) fields.category = String(body.category);
  if (body.available !== undefined) fields.available = Boolean(body.available);
  if (body.order !== undefined) fields.order = Number(body.order);
  return fields;
}

// Convierte los errores de validación de Mongoose en un mensaje claro
function validationMessage(error) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    const first = Object.values(error.errors || {})[0];
    return first?.message?.includes("Cast to Number")
      ? "El precio debe ser un número."
      : first?.message || "Revisa los datos del producto.";
  }
  return null;
}

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ category: 1, order: 1, name: 1 });
  res.json(products);
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const product = await Product.create(pickFields(req.body));
    res.status(201).json(product);
  } catch (error) {
    const msg = validationMessage(error);
    if (msg) return res.status(400).json({ mensaje: msg });
    throw error;
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ mensaje: "Ese producto no existe." });
  }
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ mensaje: "Ese producto no existe." });
    res.json(product);
  } catch (error) {
    const msg = validationMessage(error);
    if (msg) return res.status(400).json({ mensaje: msg });
    throw error;
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ mensaje: "Ese producto no existe." });
  }
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ mensaje: "Ese producto no existe." });
  res.json({ mensaje: "Producto borrado." });
});

module.exports = router;
