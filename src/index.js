// src/index.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// Usar middleware para habilitar CORS y poder hacer peticiones desde otros dominios
app.use(cors());

// Usar middleware para procesar el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api', authRoutes);

// Rutas de videos
app.use('/api', videoRoutes);

// Configuramos el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
