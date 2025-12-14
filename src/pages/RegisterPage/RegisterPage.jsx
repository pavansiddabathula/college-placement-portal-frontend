import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollNumber: "",
    firstName: "",
    lastName: "",
    branch: "",
    email: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);

  const rollRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const branchRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const validate = (values = form) => {
    const e = {};

    if (!/^[0-9A-Za-z]{10}$/.test(values.rollNumber.trim()))
      e.rollNumber = "Roll Number must be 10 alphanumeric characters.";

    if (!values.firstName.trim())
      e.firstName = "Surname (First Name) is required.";

    if (!values.lastName.trim())
      e.lastName = "Your name is required.";

    if (!values.branch.trim())
      e.branch = "Branch is required.";

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(values.email.trim()))
      e.email = "Enter a valid Gmail address.";

    if (!/^[0-9]{10}$/.test(values.phoneNumber.trim()))
      e.phoneNumber = "Phone must be exactly 10 digits.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    setErrors((prev) => {
      const next = { ...prev };

      if (name === "rollNumber") {
        next.rollNumber = /^[0-9A-Za-z]{10}$/.test(value.trim())
          ? ""
          : "Roll Number must be 10 alphanumeric characters.";
      }

      if (name === "firstName") {
        next.firstName = value.trim()
          ? ""
          : "Surname (First Name) is required.";
      }

      if (name === "lastName") {
        next.lastName = value.trim() ? "" : "Your name is required.";
      }

      if (name === "branch") {
        next.branch = value.trim() ? "" : "Branch is required.";
      }

      if (name === "email") {
        next.email = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value.trim())
          ? ""
          : "Enter a valid Gmail address.";
      }

      if (name === "phoneNumber") {
        next.phoneNumber = /^[0-9]{10}$/.test(value.trim())
          ? ""
          : "Phone must be exactly 10 digits.";
      }

      return next;
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        rollNumber: form.rollNumber.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        branch: form.branch.trim()
      };

      const response = await api.post("/students/create", payload);

      if (response.data.status === "SUCCESS") {
        setServerError(null);
        setServerSuccess(
          response.data.message ||
            "Registration successful! Login credentials sent to Gmail."
        );

        setForm({
          rollNumber: "",
          firstName: "",
          lastName: "",
          branch: "",
          email: "",
          phoneNumber: ""
        });

        setErrors({});
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setServerSuccess(null);
        setServerError(
          response.data.errorMessage || "Registration failed."
        );

        if (response.data.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...response.data.fieldErrors }));
        }
      }
    } catch (err) {
      setServerSuccess(null);

      if (!err.response) {
        setServerError("Server is not available. Please try again later.");
      } else {
        const backend = err.response.data;
        setServerError(backend.errorMessage || "Request failed.");

        if (backend.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...backend.fieldErrors }));
        }
      }
    }

    setSubmitting(false);
  };

  return (
    <main className="page-wrapper">
      <div className="form-container">
        <h2>Student Registration</h2>

        {serverSuccess && (
          <div className="server-success">{serverSuccess}</div>
        )}
        {serverError && (
          <div className="server-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Roll Number */}
          <div className={`form-group ${errors.rollNumber ? "error" : ""}`}>
            <label>Roll Number</label>
            <input
              ref={rollRef}
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              onBlur={() =>
                validateField("rollNumber", form.rollNumber)
              }
              placeholder="10-character Roll Number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("rollNumber", form.rollNumber);
                  firstRef.current?.focus();
                }
              }}
            />
            {errors.rollNumber && (
              <div className="error-message">{errors.rollNumber}</div>
            )}
          </div>

          {/* First Name */}
          <div className={`form-group ${errors.firstName ? "error" : ""}`}>
            <label>First Name</label>
            <input
              ref={firstRef}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              onBlur={() =>
                validateField("firstName", form.firstName)
              }
              placeholder="Surname / Family Name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("firstName", form.firstName);
                  lastRef.current?.focus();
                }
              }}
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className={`form-group ${errors.lastName ? "error" : ""}`}>
            <label>Second Name</label>
            <input
              ref={lastRef}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              onBlur={() =>
                validateField("lastName", form.lastName)
              }
              placeholder="Your Name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("lastName", form.lastName);
                  branchRef.current?.focus();
                }
              }}
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>

          {/* Branch */}
          <div className={`form-group ${errors.branch ? "error" : ""}`}>
            <label>Branch</label>
            <select
              ref={branchRef}
              name="branch"
              value={form.branch}
              onChange={handleChange}
              onBlur={() =>
                validateField("branch", form.branch)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("branch", form.branch);
                  emailRef.current?.focus();
                }
              }}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="AIDS">AIDS</option>
              <option value="AIML">AIML</option>
              <option value="EEE">EEE</option>
              <option value="MEC">MEC</option>
              <option value="CIVIL">CIVIL</option>
              <option value="IT">IT</option>
              <option value="IOT">IOT</option>
            </select>
            {errors.branch && (
              <div className="error-message">{errors.branch}</div>
            )}
          </div>

          {/* Gmail */}
          <div className={`form-group ${errors.email ? "error" : ""}`}>
            <label>Gmail</label>
            <input
              ref={emailRef}
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={() =>
                validateField("email", form.email)
              }
              placeholder="yourname@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("email", form.email);
                  phoneRef.current?.focus();
                }
              }}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div className={`form-group ${errors.phoneNumber ? "error" : ""}`}>
            <label>Phone Number</label>
            <input
              ref={phoneRef}
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              onBlur={() =>
                validateField("phoneNumber", form.phoneNumber)
              }
              placeholder="10-digit number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  validateField("phoneNumber", form.phoneNumber);
                  document
                    .querySelector(".submit-btn")
                    .click();
                }
              }}
            />
            {errors.phoneNumber && (
              <div className="error-message">{errors.phoneNumber}</div>
            )}
          </div>

          <button className="submit-btn" disabled={submitting}>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
