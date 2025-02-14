const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Trim inputs
        const trimmedUsername = username.trim().toLowerCase();
        const trimmedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username: trimmedUsername }, { email: trimmedEmail }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: existingUser.username === trimmedUsername 
                    ? "Username already exists" 
                    : "Email already exists" 
            });
        }

        // Create new user (hashing happens inside the User model)
        const user = new User({ 
            username: trimmedUsername, 
            email: trimmedEmail, 
            password // 🔹 No manual hashing here
        });

        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ 
            success: true,
            message: "User registered successfully", 
            token,
            user: { id: user._id, username: user.username, email: user.email } 
        });

    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// 🔹 Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// 🔹 Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });

    } catch (err) {
        console.error("Profile Error:", err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};