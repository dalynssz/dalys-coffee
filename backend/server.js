// =====================================================
// DALY'S COFFEE · BACKEND (Express + MongoDB)
// Para iniciarlo:  npm run dev
// =====================================================
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");

const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/products");
const contactRoutes = require("./src/routes/contact");
const chatRoutes = require("./src/routes/chat");

if (!process.env.JWT_SECRET) {
  console.error("Falta JWT_SECRET en el archivo .env. Revisa .env.example.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// En Render el servidor está detrás de un proxy: así sabemos la IP real de cada visitante
app.set("trust proxy", 1);

// CORS: solo estas páginas pueden usar la API desde el navegador
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // origin vacío = peticiones sin navegador (Postman, curl...)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
  })
);

// Permite recibir datos en formato JSON (máximo 20 KB)
app.use(express.json({ limit: "20kb" }));

// Ruta para comprobar que el servidor está vivo
app.get("/", (req, res) => {
  res.json({ mensaje: "Backend de Daly's Coffee funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

// Ruta que no existe
app.use((req, res) => {
  res.status(404).json({ mensaje: "Esa ruta no existe en la API." });
});

// Cualquier error inesperado
app.use((error, req, res, next) => {
  if (error.message?.startsWith("Origen no permitido")) {
    return res.status(403).json({ mensaje: error.message });
  }
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ mensaje: "Los datos enviados no son JSON válido." });
  }
  console.error(error);
  res.status(500).json({ mensaje: "Ocurrió un error en el servidor. Inténtalo de nuevo." });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Daly's Coffee Backend funcionando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB:", error.message);
    process.exit(1);
  });
