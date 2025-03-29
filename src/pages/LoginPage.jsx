import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    // Retrieve stored credentials (mock storage for now)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Generate a simple authentication token
      const authToken = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      
      // Store authentication token
      localStorage.setItem("authToken", authToken);
      
      // Optional: Store user info for dashboard
      localStorage.setItem("userEmail", email);

      // Success notification
      alert("Login successful!");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      // Set error message
      setError("Invalid email or password");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div className="logo">Still<br />Pay</div>
      </div>
      <div className="signup-container">
        <h1 className="signup-title">Login</h1>
        {error && (
          <div className="error-message" style={{
            color: 'red', 
            marginBottom: '15px', 
            textAlign: 'center'
          }}>
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
          <button type="submit" className="signup-btn">Login</button>
          <div className="login-text">
            Don't have an account? 
            <span 
              onClick={handleSignUpRedirect} 
              className="login-link"
              style={{ cursor: 'pointer', marginLeft: '5px' }}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;