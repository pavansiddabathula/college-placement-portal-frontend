
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function StudentNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

    const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");

  };


  return (
    <header className="main-header">
      <div className="nav-container">

        <div className="logo">NextStep Portal</div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/student-dashboard" className="nav-link">Home</Link></li>
            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
            <li><Link to="/trainings" className="nav-link">Trainings</Link></li>
            <li><Link to="/counselling" className="nav-link">Counselling</Link></li>
            <li><Link to="/guidance" className="nav-link">Guidance</Link></li>
            <li><Link to="/roadmaps" className="nav-link">Roadmaps</Link></li>
            <li><Link to="/companies" className="nav-link">Companies</Link></li>

            {/* Profile */}
            <li><Link to="/profile" className="nav-link profile-link">Profile</Link></li>

            <li><button className="btn-logout" onClick={logout}>Logout</button></li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
