require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes correctly
const inventoryRoutes = require('../backend/routes/InventoryRoute'); 
const userRoutes = require('./routes/Userroutes'); 
const authRoutes = require('./routes/AuthRoutes');

// Use routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to DB & Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });
