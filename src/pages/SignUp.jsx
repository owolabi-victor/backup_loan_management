// pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!termsAgreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    // Store user in local storage (mock backend)
    const userCredentials = {
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(userCredentials));
    
    alert("Sign up successful!");
    navigate("/"); // Redirect to login
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div className="logo">Still<br />Pay</div>
      </div>
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Please enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <div className="password-field">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Please create your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-field">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirm-password" 
                placeholder="Please confirm your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          <div className="terms-checkbox">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAgreed}
              onChange={() => setTermsAgreed(!termsAgreed)}
            />
            <label htmlFor="terms" style={{ display: "inline", fontWeight: "normal" }}>
              I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
            </label>
          </div>
          
          <button type="submit" className="signup-btn">Sign Up</button>
          
          <div className="login-text">
            Already have an account? <a href="/" className="login-link">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;