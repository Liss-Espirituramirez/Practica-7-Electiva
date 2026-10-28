
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const puerto = 3000;

const conexion = {
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "estudiante",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "practica"
};

// Mostrar el archivo HTML en el navegador
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Comprobar la conexión con MySQL
app.get("/api", async (req, res) => {
    try {
        const db = await mysql.createConnection(conexion);
        const [filas] = await db.query("SELECT DATABASE() AS baseDatos");
        await db.end();

        res.json({
            mensaje: "Hola mundo",
            conexion: "Conectado correctamente a MySQL",
            baseDatos: filas[0].baseDatos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al conectar con MySQL",
            error: error.message
        });
    }
});

app.listen(puerto, "0.0.0.0", () => {
    console.log(`Servidor iniciado en el puerto ${puerto}`);
});
