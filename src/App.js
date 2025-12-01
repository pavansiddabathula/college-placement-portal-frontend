import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import NavbarLoader from "./components/Navbar/NavbarLoader";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyOtpPage from "./pages/VerifyOtpPage/VerifyOtpPage";
import SetPassword from "./pages/SetPasswordPage/SetPasswordPage";

import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";


export default function App() {
  return (
    <Router>
      <AuthProvider>

        <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
          
          <NavbarLoader />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
              <Route path="/set-password" element={<SetPassword />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>

          <Footer />
        </div>

      </AuthProvider>
    </Router>
  );
}
