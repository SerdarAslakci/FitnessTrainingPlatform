import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "./assets/bg.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Önceki hatayı temizle

    try {
      const response = await axios.post(
        "http://localhost:5029/api/auth/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error", error);
      setError("Email or password is incorrect. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>FITNESS</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/exercises"}>Exercises</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/nutrition"}>Nutrition & Meals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          flex: 1,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden"
        }}
      >
        <div className="row w-100 justify-content-center">
          <div className="col-md-7 col-lg-5 col-sm-9 col-12">
            <div className="card shadow p-4" style={{ minHeight: "500px" }}>
              <div className="card-body d-flex flex-column justify-content-center">
                <h3 className="text-center mb-5 fw-bold">Login</h3>

                {/* Hata mesajı */}
                {error && (
                  <div className="alert alert-danger w-100 text-center" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                  <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label fw-bold fs-6">Email</label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label htmlFor="password" className="form-label fw-bold fs-6">Password</label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-dark w-50 h-20 mt-4">Login</button>
                  <Link className="nav-link" style={{ fontSize: '11px' }} to={"/register"}>Sign Up</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
