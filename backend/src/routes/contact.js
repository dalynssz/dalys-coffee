// =====================================================
// FORMULARIO DE CONTACTO
// POST   /api/contact      -> cualquiera envía un mensaje (se guarda en MongoDB)
// GET    /api/contact      -> admin: ver mensajes
// PATCH  /api/contact/:id  -> admin: marcar como leído / no leído
// DELETE /api/contact/:id  -> admin: borrar
// =====================================================
const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const requireAuth = require("../middleware/auth");

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Las mismas reglas que el frontend, pero en el servidor
// (nunca hay que confiar solo en la validación del navegador)
function validate({ name, email, message }) {
  if (!name) return "Escribe tu nombre.";
  if (name.length > 80) return "El nombre es demasiado largo.";
  if (!email) return "Escribe tu correo.";
  if (!emailPattern.test(email)) return "Escribe un correo válido.";
  if (!message) return "Escribe tu mensaje.";
  if (message.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  if (message.length > 2000) return "El mensaje no puede pasar de 2000 caracteres.";
  return null;
}

router.post("/", async (req, res) => {
  const data = {
    name: String(req.body?.name || "").trim(),
    email: String(req.body?.email || "").trim(),
    message: String(req.body?.message || "").trim(),
  };

  const error = validate(data);
  if (error) return res.status(400).json({ mensaje: error });

  await Message.create(data);
  res.status(201).json({ mensaje: "Recibimos tu mensaje. Te responderemos pronto." });
});

router.get("/", requireAuth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.patch("/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ mensaje: "Ese mensaje no existe." });
  }
  const updated = await Message.findByIdAndUpdate(
    req.params.id,
    { read: Boolean(req.body?.read) },
    { new: true }
  );
  if (!updated) return res.status(404).json({ mensaje: "Ese mensaje no existe." });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ mensaje: "Ese mensaje no existe." });
  }
  const deleted = await Message.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ mensaje: "Ese mensaje no existe." });
  res.json({ mensaje: "Mensaje borrado." });
});

module.exports = router;
