// src/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.register = (req, res) => {
    const { nombre, email, contrasena } = req.body;

    if (!nombre || !email || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    User.register(nombre, email, contrasena, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar el usuario.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
};

// Login de usuario
exports.login = (req, res) => {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    User.login(email, contrasena, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error al hacer login.' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    });
};

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los usuarios.' });
        }
        res.json({ users });
    });
};

// Actualizar usuario
exports.updateUser = (req, res) => {
    const { id, nombre, email, contrasena } = req.body;

    if (!id || !nombre || !email || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    User.updateUser(id, nombre, email, contrasena, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el usuario.' });
        }
        res.json({ message: 'Usuario actualizado exitosamente.' });
    });
};

// Función para chat de voz
exports.chatBot = (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'No se recibió mensaje del usuario.' });
    }

    const botReply = getBotResponse(userMessage);
    res.json({ reply: botReply });
};

// Lógica de respuestas del bot
function getBotResponse(userMessage) {
    const botResponses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "cómo estás": "Estoy aquí para ayudarte, ¿qué necesitas?",
        "adiós": "¡Hasta luego! Cuídate.",
        "qué es javascript": "JavaScript es un lenguaje de programación usado principalmente en la web para crear páginas interactivas.",
        "gracias": "¡De nada! Estoy para ayudarte."
    };

    userMessage = userMessage.toLowerCase();
    for (const keyword in botResponses) {
        if (userMessage.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return "Lo siento, no entiendo esa pregunta.";
}
