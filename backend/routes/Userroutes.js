const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/Authcontroler'); // Import controllers
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware to protect routes

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile (protected route, requires authentication)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
