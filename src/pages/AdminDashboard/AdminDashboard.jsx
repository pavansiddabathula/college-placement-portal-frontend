import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./AdminDashboard.css";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { auth } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const [metricsRes, usersRes] = await Promise.all([
          api.get("/admin/metrics"),
          api.get("/admin/users?limit=10")
        ]);
        if (!mounted) return;
        setMetrics(metricsRes.data);
        setUsers(usersRes.data || []);
      } catch (e) {
        if (!mounted) return;
        setErr("Failed to load admin data.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="page-loader">Loading admin dashboard...</div>;
  if (err) return <div className="page-error">{err}</div>;

  return (
    <main className="dashboard page-container">
      <h1 className="page-title">Admin Console — {auth?.user?.name || "Admin"}</h1>

      <section className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{metrics?.totalStudents ?? 0}</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{metrics?.activeJobs ?? 0}</div>
          <div className="stat-label">Active Jobs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{metrics?.placedThisMonth ?? 0}</div>
          <div className="stat-label">Placed (Mo)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{metrics?.pendingApprovals ?? 0}</div>
          <div className="stat-label">Pending Approvals</div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Recent Users</h3>
          <small>Quick actions</small>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.active ? "Active" : "Disabled"}</td>
                <td>
                  <button onClick={() => alert("Open profile")}>View</button>
                  <button onClick={() => alert("Toggle status")} className="secondary">Toggle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
