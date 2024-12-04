// src/models/Video.js

const db = require('../config');

class Video {
    // Obtener todos los videos
    static getAllVideos(callback) {
        db.query('SELECT * FROM videos', callback);
    }

    // Obtener un video por su id
    static getVideoById(id, callback) {
        db.query('SELECT * FROM videos WHERE id = ?', [id], callback);
    }
}

module.exports = Video;
