import React, { useState, useRef } from "react";
import "./LoginModal.css";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onLogin }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [rollOrId, setRollOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const rollRef = useRef(null);
  const passRef = useRef(null);

  const [touched, setTouched] = useState({
    rollOrId: false,
    password: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ NEW: success message state
  const [success, setSuccess] = useState("");

  const validateField = (name, value) => {
    setErrors((prev) => {
      const next = { ...prev };

      if (name === "rollOrId") {
        if (role === "STUDENT") {
          next.rollOrId =
            /^[0-9A-Za-z]{10}$/.test(value.trim())
              ? ""
              : "Roll number must be exactly 10 characters.";
        } else {
          next.rollOrId =
            /^[0-9A-Za-z]{6}$/.test(value.trim())
              ? ""
              : "Admin ID must be exactly 6 characters.";
        }
      }

      if (name === "password") {
        next.password =
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters.";
      }

      return next;
    });
  };

  const validate = () => {
    const e = {};

    if (role === "STUDENT") {
      if (!/^[0-9A-Za-z]{10}$/.test(rollOrId.trim())) {
        e.rollOrId = "Roll number must be exactly 10 characters.";
      }
    } else {
      if (!/^[0-9A-Za-z]{6}$/.test(rollOrId.trim())) {
        e.rollOrId = "Admin ID must be exactly 6 characters.";
      }
    }

    if (!password || password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ rollOrId: true, password: true });

    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccess(""); // clear previous success message

    try {
      let res;

      if (role === "STUDENT") {
        res = await api.post("api/auth/student/login", {
          rollNumber: rollOrId.trim(),
          password
        });
      } else {
        res = await api.post("api/auth/admin/login", {
          adminid: rollOrId.trim(),
          password
        });
      }

      const loginData = {
        role,
        token: res.data.access_token,
        tokenType: res.data.token_type,
        roles: res.data.roles,
        user: res.data.user
      };

      setAuth(loginData);
      // ✅ SHOW SUCCESS MESSAGE
      setSuccess("Login successful!");
      onLogin(loginData);

      
      

      // wait 1s then redirect
      setTimeout(() => {
        navigate(role === "STUDENT" ? "/student-dashboard" : "/admin/dashboard");
      }, 10000);

    } catch (err) {
      if (!err.response) {
        setErrors({
          backend: "Server is not available. Please try again later."
        });
      } else {
        setErrors({
          backend: err?.response?.data?.message || "Invalid login details."
        });
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-card">
        <div className="role-switch">
          <button
            className={role === "STUDENT" ? "active" : ""}
            onClick={() => {
              setRole("STUDENT");
              setRollOrId("");
              setPassword("");
              setErrors({});
              setSuccess("");
              setShowPass(false);
              setTouched({ rollOrId: false, password: false });
            }}
          >
            Student
          </button>

          <button
            className={role === "OFFICER" ? "active" : ""}
            onClick={() => {
              setRole("OFFICER");
              setRollOrId("");
              setPassword("");
              setErrors({});
              setSuccess("");
              setShowPass(false);
              setTouched({ rollOrId: false, password: false });
            }}
          >
            Placement Officer
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <label>{role === "STUDENT" ? "Roll Number ID" : "Admin ID"}</label>
          <input
            ref={rollRef}
            value={rollOrId}
            onChange={(e) => {
              setRollOrId(e.target.value);
              setErrors((prev) => ({ ...prev, rollOrId: "" }));
              if (errors.backend) setErrors((prev) => ({ ...prev, backend: "" }));
            }}
            onBlur={() => validateField("rollOrId", rollOrId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                validateField("rollOrId", rollOrId);
                passRef.current?.focus();
              }
            }}
            placeholder={role === "STUDENT" ? "10-char Roll Number" : "6-char Admin ID"}
          />

          {errors.rollOrId && <div className="err">{errors.rollOrId}</div>}

          <label>Password</label>
          <div className="password-row">
            <input
              ref={passRef}
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
                if (errors.backend) setErrors((prev) => ({ ...prev, backend: "" }));
              }}
              onBlur={() => validateField("password", password)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("password", password);
                  document.querySelector("button.primary").click();
                }
              }}
              placeholder="Your password"
            />

            <i
              className={`fa-solid ${showPass ? "fa-eye" : "fa-eye-slash"} eye-icon`}
              onClick={() => setShowPass(!showPass)}
            ></i>
          </div>

          {errors.password && <div className="err">{errors.password}</div>}
          {errors.backend && <div className="err backend">{errors.backend}</div>}

          {/* ✅ SUCCESS MESSAGE (inline styling) */}
          {success && (
            <div
              style={{
                color: "green",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "8px",
              }}
            >
              {success}
            </div>
          )}

          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}
