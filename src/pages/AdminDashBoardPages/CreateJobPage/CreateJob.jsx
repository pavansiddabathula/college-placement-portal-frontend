
import React, { useState } from "react";
import api from "../../../api/api";

import "./CreateJob.css";


export default function AddJobPage() {
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    jobType: "",
    location: "",
    salaryPackage: "",
    pdfUrl: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // validation
  const validate = (values = form) => {
    const e = {};

    if (!values.title.trim()) e.title = "Job title is required";
    if (!values.companyName.trim()) e.companyName = "Company name is required";
    if (!values.jobType) e.jobType = "Select job type";
    if (!values.location.trim()) e.location = "Location is required";
    if (!values.salaryPackage.trim()) e.salaryPackage = "Salary package is required";
    if (!values.description.trim() || values.description.length < 20)
      e.description = "Description must be at least 20 characters";

    if (values.pdfUrl && !/^https?:\/\/.+/.test(values.pdfUrl))
      e.pdfUrl = "Enter a valid URL";

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // remove error while typing
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);

    try {
      await api.post("/jobs/createJob", form);
      alert("Job posted successfully");

      setForm({
        title: "",
        companyName: "",
        jobType: "",
        location: "",
        salaryPackage: "",
        pdfUrl: "",
        description: ""
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create job");
    }

    setSubmitting(false);
  };

  return (
    <main className="job-page">
      <div className="job-card">
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid">
            <div className={`field ${errors.title ? "error" : ""}`}>
              <label>Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} />
              {errors.title && <span>{errors.title}</span>}
            </div>

            <div className={`field ${errors.companyName ? "error" : ""}`}>
              <label>Company Name</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} />
              {errors.companyName && <span>{errors.companyName}</span>}
            </div>

            <div className={`field ${errors.jobType ? "error" : ""}`}>
              <label>Job Type</label>
              <select name="jobType" value={form.jobType} onChange={handleChange}>
                <option value="">Select</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
              {errors.jobType && <span>{errors.jobType}</span>}
            </div>

            <div className={`field ${errors.location ? "error" : ""}`}>
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
              {errors.location && <span>{errors.location}</span>}
            </div>

            <div className={`field ${errors.salaryPackage ? "error" : ""}`}>
              <label>Salary Package</label>
              <input name="salaryPackage" value={form.salaryPackage} onChange={handleChange} />
              {errors.salaryPackage && <span>{errors.salaryPackage}</span>}
            </div>

            <div className={`field ${errors.pdfUrl ? "error" : ""}`}>
              <label>JD PDF URL</label>
              <input name="pdfUrl" value={form.pdfUrl} onChange={handleChange} />
              {errors.pdfUrl && <span>{errors.pdfUrl}</span>}
            </div>
          </div>

          <div className={`field full ${errors.description ? "error" : ""}`}>
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && <span>{errors.description}</span>}
          </div>

          <button className="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Create Job"}
          </button>
        </form>
      </div>
    </main>
  );
}