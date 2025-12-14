import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function StudentNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="nav-container">
        <div className="logo">NextStep Portal</div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span /><span /><span />
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      <nav
        className={`nav-menu ${menuOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li><Link to="/student-dashboard" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/jobs" className="nav-link" onClick={closeMenu}>Jobs</Link></li>
          <li><Link to="/trainings" className="nav-link" onClick={closeMenu}>Trainings</Link></li>
          <li><Link to="/counselling" className="nav-link" onClick={closeMenu}>Counselling</Link></li>
          <li><Link to="/guidance" className="nav-link" onClick={closeMenu}>Guidance</Link></li>
          <li><Link to="/roadmaps" className="nav-link" onClick={closeMenu}>Roadmaps</Link></li>
          <li><Link to="/companies" className="nav-link" onClick={closeMenu}>Companies</Link></li>
          <li><Link to="/profile" className="nav-link" onClick={closeMenu}>Profile</Link></li>

          <li>
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
