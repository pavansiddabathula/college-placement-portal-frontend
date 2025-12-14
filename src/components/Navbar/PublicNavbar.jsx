import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  /* 🔒 Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  /* 🔁 Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="main-header">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">NextStep Portal</div>

        {/* NAV MENU */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/jobs" className="nav-link">Jobs</NavLink></li>
            <li><NavLink to="/companies" className="nav-link">Companies</NavLink></li>
            <li><NavLink to="/interview-prep" className="nav-link">Interviews</NavLink></li>
            <li><NavLink to="/drives" className="nav-link">Drives</NavLink></li>
            <li><NavLink to="/roadmaps" className="nav-link">Roadmaps</NavLink></li>
            <li><NavLink to="/resources" className="nav-link">Resources</NavLink></li>
            <li><NavLink to="/trainings" className="nav-link">Training</NavLink></li>

            {/* 🔹 MOBILE ONLY AUTH BUTTONS */}
            <li className="mobile-auth">
              <NavLink to="/register" className="btn-outline" onClick={closeMenu}>
                Register
              </NavLink>
            </li>
            <li className="mobile-auth">
              <NavLink to="/login" className="btn-filled" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* 🔹 DESKTOP AUTH BUTTONS */}
        <div className="nav-actions">
          <NavLink to="/register" className="btn-outline">Register</NavLink>
          <NavLink to="/login" className="btn-filled">Login</NavLink>
        </div>

        {/* 🍔 ACCESSIBLE HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          role="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          tabIndex={0}
          onClick={() => setMenuOpen(prev => !prev)}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </header>
  );
}
