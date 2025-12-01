import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SetPasswordPage.css";
import api from "../../api/api";

export default function SetPassword() {
  const navigate = useNavigate();
  const identifier = sessionStorage.getItem("resetIdentifier");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post("/api/auth/set-password", {
        identifier,
        newPassword,
        confirmPassword
      });

      const nextUrl = res.data.returnurl;

      if (!nextUrl) {
        setSuccess("Password reset successful!");
        sessionStorage.removeItem("resetIdentifier");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      sessionStorage.removeItem("resetIdentifier");
      navigate(nextUrl.replace("http://localhost:3000", ""));

    } catch (err) {
      setError(err?.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h2 className="title">Set New Password</h2>
        <p className="subtitle">Enter your new password below</p>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <label className="input-label">New Password</label>
          <div className="password-row">
            <input
              className="input-box"
              type={showPass1 ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <i
              className={`fa-solid ${showPass1 ? "fa-eye" : "fa-eye-slash"} eye-icon`}
              onClick={() => setShowPass1(!showPass1)}
            ></i>
          </div>

          {/* Confirm Password */}
          <label className="input-label">Confirm Password</label>
          <div className="password-row">
            <input
              className="input-box"
              type={showPass2 ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <i
              className={`fa-solid ${showPass2 ? "fa-eye" : "fa-eye-slash"} eye-icon`}
              onClick={() => setShowPass2(!showPass2)}
            ></i>
          </div>

          <button className="btn-primary">Update Password</button>
        </form>

        <div className="back">
          <a href="/login">← Back to Login</a>
        </div>

      </div>
    </div>
  );
}
