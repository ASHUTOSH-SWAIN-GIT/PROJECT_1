require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//  Allow CORS only for your frontend
app.use(cors({ 
  origin: "http://localhost:5173",  // Change to your frontend URL if deployed
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

//  Additional CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Change to frontend URL if needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middleware
app.use(express.json());

//  Test Route
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Backend is running!" });
});

//  Import Routes
const inventoryRoutes = require("./routes/InventoryRoute");
const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/AuthRoutes");

//  Use Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//  Database Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection error:", err);
    process.exit(1);
  });
