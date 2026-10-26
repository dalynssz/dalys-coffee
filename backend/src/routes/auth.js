// =====================================================
// LOGIN DE ADMINISTRACIÓN
// POST /api/auth/login  -> revisa usuario y contraseña, devuelve un token
// GET  /api/auth/me     -> dice si el token sigue siendo válido
// =====================================================
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/auth");

const router = express.Router();
const WRONG = "Usuario o contraseña incorrectos.";

router.post("/login", async (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!username || !password) {
    return res.status(400).json({ mensaje: "Escribe tu usuario y tu contraseña." });
  }

  const user = await User.findOne({ username });
  // bcrypt.compare compara la contraseña escrita con la cifrada
  const valid = user && (await bcrypt.compare(password, user.passwordHash));
  if (!valid) {
    return res.status(401).json({ mensaje: WRONG });
  }

  const token = jwt.sign({ sub: user._id.toString(), username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.json({ token, username: user.username, mensaje: "Inicio de sesión correcto." });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
