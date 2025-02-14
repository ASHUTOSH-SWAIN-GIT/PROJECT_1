import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //  Import useNavigate
import axios from "axios";
import "../pages/css/Sighnup.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    //  Frontend Validations
    const validationErrors = {};
    if (!formData.username.trim()) validationErrors.username = "Username is required";
    if (!formData.email.includes("@")) validationErrors.email = "Invalid email address";
    if (formData.password.length < 6) validationErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      //  Send Correct Data to Backend
      const response = await axios.post(`http://localhost:5000/api/auth/register`, {
        username: formData.username, 
        email: formData.email,
        password: formData.password,
      }, { headers: { "Content-Type": "application/json" } });

      setMessage(response.data.message || "Signup successful!");
      localStorage.setItem("token", response.data.token); 

      //  Clear form
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });

      // Redirect to Login Page after Signup
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setErrors({ general: error.response?.data?.error || "Signup failed. Try again!" });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="input-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        {errors.general && <span className="error">{errors.general}</span>}

        <button type="submit">Sign Up</button>
      </form>

      {/* Login Button for Registered Users */}
      <p>Already have an account?</p>
      <button className="login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default Signup;
