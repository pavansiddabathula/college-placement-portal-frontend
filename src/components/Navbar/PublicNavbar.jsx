import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="nav-container">

        <div className="logo">NextStep Portal</div>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        {/* NAV ITEMS */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
            <li><Link to="/companies" className="nav-link">Companies</Link></li>
            <li><Link to="/interview-prep" className="nav-link">Interview Prep</Link></li>
            <li><Link to="/faqs" className="nav-link">FAQs</Link></li>
            <li><Link to="/help" className="nav-link">Help</Link></li>
            <li><Link to="/trainings" className="nav-link">Trainings</Link></li>

            <li><Link to="/register" className="btn-outline">Register</Link></li>
            <li><Link to="/login" className="btn-filled">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
