import React from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  return (
    <main className="student-dashboard-container">

      <h1 className="dashboard-title">Welcome Student 👋</h1>

      <section className="stats-box">
        <div className="stat-card">
          <h2>8</h2>
          <p>Applied Jobs</p>
        </div>

        <div className="stat-card">
          <h2>3</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="stat-card">
          <h2>1</h2>
          <p>Upcoming Interviews</p>
        </div>

        <div className="stat-card">
          <h2>80%</h2>
          <p>Profile Strength</p>
        </div>
      </section>

      <section className="panel">
        <h3>Recent Jobs</h3>

        <div className="job-list">
          <div className="job-item">
            <h4>Java Full Stack Developer</h4>
            <p>TCS • Hyderabad</p>
          </div>

          <div className="job-item">
            <h4>Backend Developer</h4>
            <p>Infosys • Bangalore</p>
          </div>

          <div className="job-item">
            <h4>MERN Developer</h4>
            <p>Wipro • Pune</p>
          </div>
        </div>
      </section>

    </main>
  );
}
