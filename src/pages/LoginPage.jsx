import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
// import "../assets/css/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    // Retrieve stored credentials (mock storage for now)

    if (email && password) {
      login({ email, password })
        .then((res) => {
          console.log(res);
          localStorage.setItem("authToken", res.data.token);
          alert("Login successful!");
          navigate("/dashboard");
        })
        .catch(() => {
          alert("Login failed!");
        });
    } else {
      // Set error message
      setError("Invalid email or password");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="auth__container">
      <div className="logo-container">
        <div className="logo_banner">
          Still
          <br />
          Pay
        </div>
      </div>
      <div className="signup-container">
        <div className="form_container">
          <h1 className="signup-title">Login</h1>
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-btn">
              Login
            </button>
            <div className="login-text">
              Don't have an account?
              <span
                onClick={handleSignUpRedirect}
                className="login-link"
                style={{ cursor: "pointer", marginLeft: "5px" }}
              >
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
