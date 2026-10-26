// Conexión con MongoDB Atlas usando Mongoose
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<db_password>")) {
    console.error(
      "Falta MONGODB_URI en el archivo .env (o todavía tiene <db_password>). Revisa .env.example."
    );
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
}

module.exports = connectDB;
