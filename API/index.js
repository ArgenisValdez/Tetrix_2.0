const express = require("express");
const cors = require("cors");
const app = express();

const mySQL = require("./connection");
const seguridad = require("./seguridad");

app.use(cors());
app.use(express.json());

app.post("/login", (pedido, respuesta) => {
    const { usuario, pass } = pedido.body;

    const query = 'SELECT pass FROM usuarios WHERE user = ?';
    mySQL.connection.query(query, [usuario], (error, resultados) => {
        if (error) {
            console.error("Error de consulta:", error);
            return respuesta.status(500).send({ error: "Error interno del servidor" });
        }

        if (resultados.length === 0) {
            return respuesta.send({ existe: 0 });
        }

        const hashAlmacenado = resultados[0].pass;
        const coincide = seguridad.bcrypt.compareSync(pass, hashAlmacenado);

        if (coincide) {
            respuesta.send({ existe: 1 });
        } else {
            respuesta.send({ existe: 0 });
        }
    });
});


app.post("/create", (pedido, respuesta) => {
    const { usuario, clave } = pedido.body;

    // Validación estricta de entrada
    if (typeof usuario !== 'string' || typeof clave !== 'string') {
        return respuesta.status(400).send("Los campos 'usuario' y 'clave' son obligatorios y deben ser texto.");
    }

    let passHashing;

    try {
        // Encriptación segura
        passHashing = seguridad.miHash(clave);
    } catch (error) {
        console.error("Error al procesar datos sensibles:", error.message);
        return respuesta.status(500).send("Error al procesar los datos del usuario.");
    }

    // Almacenamiento seguro con placeholders
    const query = 'INSERT INTO usuarios (user, pass) VALUES (?, ?)';
    mySQL.connection.query(query, [usuario, passHashing], (error, resultado) => {
        if (error) {
            console.error("Error al insertar:", error);
            return respuesta.status(500).send("Error interno del servidor");
        }
        respuesta.send("Usuario creado con éxito");
    });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})