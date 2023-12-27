import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    const user = {
      email,
      password,
    };

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      localStorage.setItem("token", "test");
      window.location.href = "/";
    } else {
      setError("Invalid Credentials");
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  }, [token]);
  return (
    <div className="resetPassword">
      <div className="wrapper">
        <nav className="nav">
          <div className="nav-logo">
            <p>Car Rental System</p>
          </div>
          <div className="nav-menu" id="navMenu">
            <ul>
              <li>
                <a href="/" className="link active">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            <a href="/login">
              <button className="btn white-btn" id="loginBtn">
                Sign In
              </button>
            </a>
            <a href="/signup">
              <button className="btn" id="registerBtn">
                Sign Up
              </button>
            </a>
          </div>
          <div className="nav-menu-btn">
            <i className="bx bx-menu" onclick="myMenuFunction()"></i>
          </div>
        </nav>

        <form className="form-box" onSubmit={handleSubmit}>
          <div className="login-container" id="login">
            <header>Login</header>
            {error && <span className="error-message">{error}</span>}
            <div className="input-box">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                className="input-field"
                placeholder="Username or Email"
              />
              <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                className="input-field"
                placeholder="Password"
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
              <button type="submit" className="submit">
                Login
              </button>
            </div>
            <div className="two-col">
              <div className="two">
                <label>
                  <a href="resetPassword">Forgot password?</a>
                </label>
              </div>
            </div>
            <div className="top">
              <span>
                Don't have an account?{" "}
                <a href="/signup" onclick="register()">
                  Sign Up
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;