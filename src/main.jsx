// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.css"; // Keep your CSS
import App from "./App.jsx";
import "./index.css"; // Ensure this is imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
