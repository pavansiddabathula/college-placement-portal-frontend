import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

import PublicNavbar from "./PublicNavbar";
import StudentNavbar from "./StudentNavbar";
import AdminNavbar from "./AdminNavbar";

export default function NavbarLoader() {
  const { auth } = useAuth();
  const location = useLocation(); 

  console.log("[NavbarLoader] Render:", { auth, pathname: location.pathname });

  // Because location.pathname changes on navigation,
  // NavbarLoader will automatically re-render.

  if (!auth) return <PublicNavbar key="public" />;
  if (auth.role === "STUDENT") return <StudentNavbar key="student" />;
  if (auth.role === "OFFICER") return <AdminNavbar key="officer" />;

  return <PublicNavbar key="public-fallback" />;
}
