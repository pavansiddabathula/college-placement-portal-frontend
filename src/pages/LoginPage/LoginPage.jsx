import React, { useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";
import "./LoginPage.css";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(true);

  const handleLogin = () => {
    setShowModal(false);
  };

  return (
    <div className="login-page-wrapper">
      
      <div className="login-page-container">
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">Choose login type below</p>

        {showModal && <LoginModal onLogin={handleLogin} />}

        <p className="forgot-link">
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
