const express = require('express');
const { registerUser } = require('../controllers/userController.js');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

module.exports = router;
