import React from "react";
import { Link } from "react-router-dom";
import "../pages/css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">MyApp</div>
        <div className="nav-links">
          <Link to="/Home" className="nav-btn">Home</Link>
          <Link to="/inventory" className="nav-btn">Inventory</Link>
          <Link to="/signup" className="nav-btn">Sighnup</Link>
          <Link to="/login" className="nav-btn">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Manage your inventory efficiently with our system.</p>
        <Link to="/signup" className="cta-btn">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;  // ✅ Ensure this line is present!
