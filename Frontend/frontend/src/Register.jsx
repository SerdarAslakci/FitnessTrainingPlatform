import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bg from './assets/bg.jpg';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(100);
  const [weight, setWeight] = useState(100);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5029/api/auth/register",
        { firstName, lastName, age, height, weight, dob, fitnessGoal, email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (Array.isArray(errors)) {
          setErrorMessage(errors.map(err => err.description).join(", "));
        } else if (typeof errors === "string") {
          setErrorMessage(errors);
        } else {
          setErrorMessage("Kayıt başarısız oldu, tekrar deneyiniz.");
        }
      } else {
        setErrorMessage("Kayıt başarısız oldu, tekrar deneyiniz.");
      }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column"
    }}>
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
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/register"}>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="p-4 border rounded shadow bg-white w-100 mx-3 mx-sm-4 my-sm-3 my-3" style={{ maxWidth: "600px" }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}


          <form lang="en"className="row g-3" onSubmit={handleSubmitRegister}>
            {/* First Name */}
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
              <input type="text"  value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstName" required />
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" id="lastName" required />
            </div>

            {/* Email */}
            <div className="col-12">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
            </div>

            {/* Password */}
            <div className="col-12">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
            </div>

            {/* Date of Birth */}
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label fw-bold">Date of Birth</label>
              <input type="date" value={dob} min="1925-01-01" max="2013-12-31" onChange={(e) => {
                const selectedDate = e.target.value;
                setDob(selectedDate);
                const birthDate = new Date(selectedDate);
                const today = new Date();
                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  calculatedAge--;
                }
                setAge(calculatedAge);
              }} className="form-control" id="dob" required />
            </div>

            {/* Height */}
            <div className="col-md-3">
              <label htmlFor="height" className="form-label fw-bold">Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="form-control" id="height" min="100" max="250" required />
            </div>

            {/* Weight */}
            <div className="col-md-3">
              <label htmlFor="weight" className="form-label fw-bold">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-control" min="30" max="350" id="weight" required />
            </div>

            {/* Fitness Goal */}
            <div className="col-12">
              <label htmlFor="fitnessGoal" className="form-label fw-bold">Fitness Goal</label>
              <select value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)} className="form-select" id="fitnessGoal" required>
                <option value="">-- Select your goal --</option>
                <option value="Lose Weight">Lose Weight</option>
                <option value="Build Muscle">Build Muscle</option>
                <option value="Increase Endurance">Increase Endurance</option>
                <option value="Improve Flexibility">Improve Flexibility</option>
                <option value="Maintain Current Fitness">Maintain Current Fitness</option>
                <option value="General Health & Wellness">General Health & Wellness</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-outline-dark px-4">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
