// Modelo de los mensajes que llegan desde el formulario de contacto
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true } // guarda automáticamente la fecha (createdAt)
);

module.exports = mongoose.model("Message", messageSchema);
