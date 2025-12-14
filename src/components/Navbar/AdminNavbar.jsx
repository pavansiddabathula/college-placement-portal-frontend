import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
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
        <div className="logo">NextStep Admin</div>

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
          <li><Link to="/admin/dashboard" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/admin/jobs" className="nav-link" onClick={closeMenu}>Jobs Management</Link></li>
          <li><Link to="/admin/add-job" className="nav-link" onClick={closeMenu}>Add Job</Link></li>
          <li><Link to="/admin/trainings" className="nav-link" onClick={closeMenu}>Trainings</Link></li>
          <li><Link to="/admin/counselling" className="nav-link" onClick={closeMenu}>Counselling</Link></li>
          <li><Link to="/admin/stats" className="nav-link" onClick={closeMenu}>Student Stats</Link></li>
          <li><Link to="/admin/companies" className="nav-link" onClick={closeMenu}>Companies Info</Link></li>
          <li><Link to="/admin/panel" className="nav-link" onClick={closeMenu}>Admin Panel</Link></li>

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
