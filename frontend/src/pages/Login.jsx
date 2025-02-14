import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //  Import useNavigate
import "./css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //  Initialize useNavigate

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); //  Save JWT Token
        alert("Login Successful!");
        navigate("/"); //  Redirect to Home Page
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="input-field"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          className="input-field"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
