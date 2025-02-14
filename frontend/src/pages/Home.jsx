import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Home.css";
import { FaHome, FaBox, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // Import icons

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/"); // Redirect to home page
  };
  

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Inventory Manager</div>
        <div className="nav-links">
          <Link to="/" className="nav-btn"><FaHome /> Home</Link>
          <Link to="/inventory" className="nav-btn"><FaBox /> Inventory</Link>
          {!token && <Link to="/signup" className="nav-btn"><FaUserPlus /> Signup</Link>}
          {token ? (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link to="/login" className="nav-btn"><FaSignInAlt /> Login</Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Inventory Manager</h1>
        <p>Manage your inventory efficiently with our system.</p>
        {!token && <Link to="/signup" className="cta-btn">Get Started</Link>}
      </section>
    </div>
  );
};

export default Home;
