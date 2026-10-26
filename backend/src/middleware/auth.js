// Protege las rutas de administración.
// El frontend envía el token así:  Authorization: Bearer <token>
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ mensaje: "Debes iniciar sesión para hacer esto." });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ mensaje: "Tu sesión expiró. Inicia sesión de nuevo." });
  }
}

module.exports = requireAuth;
