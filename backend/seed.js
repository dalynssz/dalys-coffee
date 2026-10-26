// =====================================================
// CARGA INICIAL DE DATOS
//   npm run seed           -> carga productos (si no hay) y crea/actualiza el admin
//   npm run seed -- --reset -> borra los productos y los vuelve a cargar
// =====================================================
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./src/db");
const Product = require("./src/models/Product");
const User = require("./src/models/User");
const { products } = require("./src/data/products");

async function seed() {
  await connectDB();

  // 1. Productos
  if (process.argv.includes("--reset")) {
    const { deletedCount } = await Product.deleteMany({});
    console.log(`Productos borrados: ${deletedCount}`);
  }
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(products);
    console.log(`Productos cargados: ${products.length}`);
  } else {
    console.log(`Ya hay ${count} productos. No se cargaron de nuevo (usa --reset para reemplazarlos).`);
  }

  // 2. Usuario administrador
  const username = (process.env.ADMIN_USERNAME || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!username || password.length < 8 || password === "elige-una-contraseña-segura") {
    console.log("No se creó el admin: pon ADMIN_USERNAME y una ADMIN_PASSWORD de 8 o más caracteres en .env");
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ username }, { username, passwordHash }, { upsert: true });
    console.log(`Administrador listo: ${username}`);
  }

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Error al cargar los datos:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});
