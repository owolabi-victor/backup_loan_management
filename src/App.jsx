// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
// import "./index.css"; // Ensure this is imported
import Layout from "../Layout";
import Loans from "./pages/Loans";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="loan" element={<Loans />} /> */}
        </Route>
        <Route path="/loans" element={<Loans />} />

        {/* Catch-all route to redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
