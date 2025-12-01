import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
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

        <div className="logo">NextStep Admin</div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/admin/dashboard" className="nav-link">Home</Link></li>

            <li><Link to="/admin/jobs" className="nav-link">Jobs Management</Link></li>
            <li><Link to="/admin/add-job" className="nav-link">Add Job</Link></li>
            <li><Link to="/admin/trainings" className="nav-link">Trainings</Link></li>
            <li><Link to="/admin/counselling" className="nav-link">Counselling</Link></li>
            <li><Link to="/admin/stats" className="nav-link">Student Stats</Link></li>
            <li><Link to="/admin/companies" className="nav-link">Companies Info</Link></li>
            <li><Link to="/admin/panel" className="nav-link">Admin Panel</Link></li>

            <li><button className="btn-logout" onClick={logout}>Logout</button></li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
