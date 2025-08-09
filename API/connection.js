const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',//Aqui va tu propia contraseña de tu base de datos :) !
    database: 'seguridad'
});

connection.connect(function(error) {
    if(error) throw error;
    console.log('Conectado a la base de datos');
});

module.exports = { connection };