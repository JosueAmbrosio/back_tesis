// src/config.js

const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbot_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = db;
