import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './styles/global.css';
import { AuthProvider } from "./context/AuthContext";


const root = createRoot(document.getElementById("root"));
root.render( 
<AuthProvider>
    <App />
  </AuthProvider>
  );
