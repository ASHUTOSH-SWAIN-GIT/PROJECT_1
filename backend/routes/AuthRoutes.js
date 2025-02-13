const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/Authcontroler');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Route (Requires Token)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
