require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Enable CORS dynamically
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"]; // Default frontend URL

app.use(
  cors({
    origin: allowedOrigins,
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
