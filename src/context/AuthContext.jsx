import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem("auth");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync state <-> localStorage
  useEffect(() => {
    if (auth) localStorage.setItem("auth", JSON.stringify(auth));
    else localStorage.removeItem("auth");

    console.log("[AuthProvider] auth changed =>", auth);
  }, [auth]);

  // Centralized login
  const login = (data) => {
    console.log("[AuthProvider] login()", data);
    setAuth(data);
  };

  // Centralized logout
  const logout = () => {
    console.log("[AuthProvider] logout()");
    setAuth(null);
  };

  // useMemo prevents children reading stale values
  const value = useMemo(() => {
    return { auth, setAuth, login, logout };
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
