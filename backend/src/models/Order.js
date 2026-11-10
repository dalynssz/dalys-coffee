// Pedido a domicilio
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    details: { type: String, default: "" },
    price: { type: Number, required: true }, // precio unitario calculado por el servidor
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true }, // código del pedido, ej. DALYS-K3F9A2
    customer: {
      name: { type: String, required: true, trim: true, maxlength: 80 },
      phone: { type: String, required: true, trim: true, maxlength: 20 },
      address: { type: String, required: true, trim: true, maxlength: 150 },
      neighborhood: { type: String, required: true, trim: true, maxlength: 60 },
      notes: { type: String, trim: true, maxlength: 300, default: "" },
    },
    items: [itemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["wompi", "nequi", "efectivo"], required: true },
    // pendiente → esperando pago (o pago en efectivo al entregar)
    status: {
      type: String,
      enum: ["pendiente", "pagado", "rechazado", "en camino", "entregado", "cancelado"],
      default: "pendiente",
    },
    wompiTransactionId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
