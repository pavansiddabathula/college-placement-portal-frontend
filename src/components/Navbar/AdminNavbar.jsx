import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    closeMenu();
    navigate("/login");
  };

  /* 🔒 Lock body scroll */
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
        <div className="logo">NextStep Admin</div>

        {/* NAV MENU */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink></li>
            <li><NavLink to="/admin/jobs" className="nav-link">Jobs</NavLink></li>
            <li><NavLink to="/admin/add-job" className="nav-link">Add Job</NavLink></li>
            <li><NavLink to="/admin/students" className="nav-link">Students</NavLink></li>
            <li><NavLink to="/admin/companies" className="nav-link">Companies</NavLink></li>
            <li><NavLink to="/admin/reports" className="nav-link">Reports</NavLink></li>

            {/* MOBILE LOGOUT */}
            <li className="mobile-auth">
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* DESKTOP LOGOUT */}
        <div className="nav-actions">
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>

        {/* HAMBURGER */}
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
