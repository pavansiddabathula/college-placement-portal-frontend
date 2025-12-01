import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {

  const auth = JSON.parse(localStorage.getItem("auth")); // check login state

  return (
    <main className="hero-placeholder">
      <div className="container hero-content">
        <h1>Your Future Starts Here.</h1>
        <p className="lead">Welcome to the college placement automation system.</p>

        <div className="cta-row" role="navigation" aria-label="primary actions">
          {!auth && (
            <>
              <Link className="cta-outline" to="/register">Register</Link>
              <Link className="cta-filled" to="/login">Login</Link>
            </>
          )}
        </div>

        <section className="features" aria-label="features">
          <article className="feature">
            <h4>Daily Job Alerts</h4>
            <p>Students get daily Gmail alerts for new job posts.</p>
          </article>
          <article className="feature">
            <h4>Simple Apply</h4>
            <p>Apply via external links (LinkedIn / Naukri) with one click.</p>
          </article>
          <article className="feature">
            <h4>Admin Control</h4>
            <p>Placement officers can add, update, and remove job posts.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
