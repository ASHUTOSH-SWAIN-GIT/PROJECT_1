// 📁 routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/Authcontroler"); // User-related controllers
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

// Protected Routes (Require authentication)
router.get("/profile", authMiddleware, getProfile); // Get user profile

module.exports = router;
