// src/controllers/videoController.js

const Video = require('../models/Video');

// Obtener todos los videos
exports.getAllVideos = (req, res) => {
    Video.getAllVideos((err, videos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los videos.' });
        }
        res.json({ videos });
    });
};

// Obtener un video por su id
exports.getVideoById = (req, res) => {
    const videoId = req.params.id;

    Video.getVideoById(videoId, (err, video) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el video.' });
        }
        if (!video.length) {
            return res.status(404).json({ error: 'Video no encontrado.' });
        }
        res.json({ video: video[0] });
    });
};
