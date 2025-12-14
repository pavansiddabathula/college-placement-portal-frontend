import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";
import api from "../../api/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Gmail
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setError("Enter a valid Gmail address.");
      return;
    }

    // Validate identifier
    if (identifier.trim().length < 6) {
      setError("Identifier must be at least 6 characters.");
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
        identifier
      });

      const { returnurl, identifier: backendIdentifier } = res.data;

      // ⭐ Store identifier in sessionStorage
      sessionStorage.setItem("resetIdentifier", backendIdentifier);

      // ⭐ Navigate to backend-provided URL
      navigate(returnurl);

    } catch (err) {
      setError(err?.response?.data?.message || "Error sending OTP.");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h2 className="title">Forgot Password</h2>
        <p className="subtitle">Enter your email & ID to receive OTP</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="input-label">Identifier (Roll No / Admin ID)</label>
          <input
            className="input-box"
            placeholder="21481A05K6 or ADM001"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label className="input-label">Gmail</label>
          <input
            className="input-box"
            placeholder="yourname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn-primary">Send OTP</button>
        </form>

        <div className="back">
          <a href="/login">← Back to Login</a>
        </div>

      </div>
    </div>
  );
}
