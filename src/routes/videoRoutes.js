// src/routes/videoRoutes.js

const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

// Ruta para obtener todos los videos
router.get('/videos', videoController.getAllVideos);

// Ruta para obtener un video por su id
router.get('/video/:id', videoController.getVideoById);

module.exports = router;
