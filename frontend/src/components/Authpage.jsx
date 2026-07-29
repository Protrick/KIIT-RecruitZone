import React, { useState } from "react";
import "./Authpage.css";
import campus from "../assets/kiit-university-banner.jpg";
import logo from "../assets/KIIT-logo.jpg";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isValidKiitEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/.test(email);
  };
  const navigate = useNavigate();
 const handleSubmit = async () => {
  setError("");

  if (isSignup && fullName.trim() === "") {
    setError("Full name is required");
    return;
  }

  if (!email || !password) {
    setError("All fields are required");
    return;
  }

  if (!isValidKiitEmail(email)) {
    setError("Only @kiit.ac.in email IDs are allowed");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    let res;

    if (isSignup) {
      // Register
      res = await api.post(
        "auth/register",
        {
          name: fullName,
          email,
          password,
        }
      );
    } else {
      // Login
      res = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    onLogin();
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div
      className="auth-wrapper"
      style={{ backgroundImage: `url(${campus})` }}
    >
      <div className="overlay"></div>

      <div className={`auth-card ${isSignup ? "active" : ""}`}>
        <div className="form-section">
          <div className="form login-form">
            <h2>KIIT T&P Login</h2>
            <p>Welcome back! Please login to continue</p>

            <input
              type="email"
              placeholder="KIIT Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleSubmit} >
              Login
            </button>

            <span onClick={() => {
              setError("");
              setIsSignup(true);
            }}>
              New user? Create an account
            </span>
          </div>

          <div className="form signup-form">
            <h2>Create Account</h2>
            <p>Register for Training & Placement</p>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              placeholder="KIIT Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleSubmit}>Sign Up</button>

            <span onClick={() => {
              setError("");
              setIsSignup(false);
            }}>
              Already have an account? Login
            </span>
          </div>

        </div>

        <div className="branding-section">
          <img src={logo} alt="KIIT Logo" />
          <h3>Kalinga Institute of Industrial Technology</h3>
          <p>Training & Placement Portal</p>
          <div className="line"></div>
          <span>Empowering Careers. Building Futures.</span>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
