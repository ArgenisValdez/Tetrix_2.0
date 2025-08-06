const express = require("express");
const cors = require("cors");
const app = express();

const mySQL = require("./connection");

app.use(cors());
app.use(express.json());

app.post("/login", (pedido, respuesta) => {
    const { usuario, pass } = pedido.body;

    const query = 'SELECT COUNT(*) AS existe FROM usuarios WHERE user = ? AND pass = ?';
    mySQL.connection.query(query, [usuario, pass], (error, resultados) => {
        if (error) {
            console.error("Error de consulta:", error);
            return respuesta.status(500).send({ error: "Error interno del servidor" });
        }
        respuesta.send(resultados[0]);
    });
});


app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})