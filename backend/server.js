require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS dynamically
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000", // Fallback if env variable is missing
    credentials: true,
  })
);

// Import routes
const inventoryRoutes = require("./routes/InventoryRoute");
const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/AuthRoutes");

// Use routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to MongoDB & Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
