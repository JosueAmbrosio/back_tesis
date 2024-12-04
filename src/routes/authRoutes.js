// src/routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.put('/user', authController.updateUser);
router.post('/chat', authController.chatBot); 

module.exports = router;
