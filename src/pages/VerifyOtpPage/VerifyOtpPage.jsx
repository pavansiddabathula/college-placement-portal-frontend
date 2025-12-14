import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyOtpPage.css";
import api from "../../api/api";

export default function VerifyOtp() {
  const navigate = useNavigate();
  
  // READ identifier from session storage
  const identifier = sessionStorage.getItem("resetIdentifier");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
    const res = await api.post("/auth/verify-otp", { identifier, otp });

    const nextUrl = res.data.returnurl;

    if (!nextUrl) {
        setError("Navigation error: return URL not provided.");
        return;
    }

    // fast redirect (strip domain)
    navigate(nextUrl.replace("http://localhost:3000", ""), {
        state: { identifier }
    });

    } catch (err) {
    setError(err?.response?.data?.message || "Invalid OTP. Try again.");
    }

  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h2 className="title">Verify OTP</h2>
        <p className="subtitle">Enter the OTP sent to your Gmail</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleVerify}>
          <label className="input-label">OTP</label>
          <input
            className="input-box"
            maxLength="6"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="btn-primary">Verify OTP</button>
        </form>

        <div className="back">
          <a href="/forgot-password">← Back</a>
        </div>

      </div>
    </div>
  );
}
