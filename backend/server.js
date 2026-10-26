const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "..")));

const PORT = 3000;


// Permite recibir datos en formato JSON
app.use(express.json());
// =========================
// LOGIN DE ADMINISTRACIÓN
// =========================

app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === "admin" &&
        password === "1234"
    ) {

        res.json({
            success: true,
            mensaje: "Inicio de sesión correcto ♡"
        });

    } else {

        res.status(401).json({
            success: false,
            mensaje: "Usuario o contraseña incorrectos."
        });

    }

});


// Ruta principal del backend
app.get("/", (req, res) => {

    res.json({
        mensaje: "Daly's Coffee Backend funcionando ☕🩷"
    });

});


// Iniciar servidor
app.listen(PORT, () => {

    console.log(
        `Daly's Coffee Backend funcionando en http://localhost:${PORT}`
    );

});