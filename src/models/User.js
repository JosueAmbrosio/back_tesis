// src/models/User.js

const db = require('../config');
const bcrypt = require('bcrypt');

class User {
    static register(nombre, email, contrasena, callback) {
        bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            db.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', 
            [nombre, email, hashedPassword], callback);
        });
    }

    static login(email, contrasena, callback) {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
            if (err) return callback(err);

            if (results.length === 0) return callback(null, null);

            const user = results[0];
            bcrypt.compare(contrasena, user.contrasena, (err, isMatch) => {
                if (err) return callback(err);

                if (!isMatch) return callback(null, null);

                callback(null, user);
            });
        });
    }

    static updateUser(id, nombre, email, contrasena, callback) {
        bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            db.query('UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id = ?', 
            [nombre, email, hashedPassword, id], callback);
        });
    }

    static getAllUsers(callback) {
        db.query('SELECT * FROM usuarios', callback);
    }
}

module.exports = User;
