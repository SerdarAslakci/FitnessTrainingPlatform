import React, { useEffect, useState } from "react";
import bg from './assets/bg.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import defaultAvatar from "./assets/defaultAvatar.jpg";

function Profile() {
    const [user, setUser] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(1.55); // Default activity factor
    const [calculatedBMR, setCalculatedBMR] = useState(null);
    const [calculatedTDEE, setCalculatedTDEE] = useState(null);
    const [password, setPassword] = useState(""); // Added for account deletion
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5029/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setUser(res.data))
            .catch(err => {
                console.error(err);
                navigate("/login");
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (user) {
            const bmr = calculateBMR(user);
            const tdee = bmr * selectedActivity;
            setCalculatedBMR(bmr);
            setCalculatedTDEE(tdee);
        }
    }, [user, selectedActivity]);

    const handleLogoutButton = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleDeleteAccount = () => {
        const token = localStorage.getItem("token");

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            axios.delete("http://localhost:5029/api/profile/delete-account", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(password)  // Sadece password stringini gönder
            })
            .then(() => {
                localStorage.removeItem("token");
                navigate("/");
            })
            .catch(err => {
                console.error("Account deletion error:", err);
                alert("Account could not be deleted. Please check your password.");
            });
        }
    };

    const calculateBMR = (user) => {
        return 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    };

    const activityLevels = [
        { value: 1.2, label: "Sedentary", desc: "Little or no exercise." },
        { value: 1.375, label: "Lightly Active", desc: "Light exercise or sports 1-3 days/week." },
        { value: 1.55, label: "Moderately Active", desc: "Moderate exercise or sports 3-5 days/week." },
        { value: 1.725, label: "Very Active", desc: "Hard exercise or sports 6-7 days a week." },
        { value: 1.9, label: "Super Active", desc: "Very hard exercise or a physically demanding job." },
    ];


    const handleActivityLevelChange = async (e) =>
    {
        const newActivityLevel = parseFloat(e.target.value);
        setSelectedActivity(newActivityLevel);
        
        try
        {
            const token = localStorage.getItem("token");
            const bmr = calculateBMR(user);
            const tdee = bmr * newActivityLevel;
            const currentTime = new Date();
            const localTime = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(currentTime);

            const response = await axios.post('http://localhost:5029/api/Profile/AddMetabolismInfo',
            {
                bmr,
                tdee,
                localTime
            }, 
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        catch(error)
        {
            console.log(error.message);
        }


    }

    return (
        <div className="vh-100" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", overflowY: "auto" }}>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">FITNESS</Link>

                {/* Hamburger Menü Butonu */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menü İçeriği */}
                <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to="/exercises">Exercises</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/nutrition">Nutrition & Meals</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/myworkout">My Workout</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogoutButton}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>


            <div className="container d-flex justify-content-center align-items-center py-5">
              {user && (
                  <div className="w-100">
                      {/* Profile Section */}
                      <div className="card shadow-lg text-center bg-dark text-white p-4 rounded-4 mb-4" style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}>
                          <img
                              src={user.profilePhotoUrl || `${defaultAvatar}`}
                              alt="Profile"
                              className="rounded-circle shadow-sm mx-auto mb-3"
                              style={{ width: "130px", height: "130px", objectFit: "cover", border: "3px solid #f8f9fa" }}
                          />
                          <h2 className="text-white mb-1">{user.firstName} {user.lastName}</h2>

                          <hr />

                          <div className="text-start">
                              <p><strong>Email:</strong> {user.email}</p>
                              <p><strong>Age:</strong> {user.age}</p>
                              <p><strong>Height:</strong> {user.height} cm</p>
                              <p><strong>Weight:</strong> {user.weight} kg</p>
                              <p><strong>Fitness Goal:</strong> {user.fitnessGoal}</p>
                          </div>

                          <div className="mt-4 d-flex justify-content-center gap-2">
                              <Link to="/profile/update-profile" className="btn btn-warning px-4">
                                  <i className="fa-solid fa-pen-to-square"></i> Update
                              </Link>
                          </div>
                      </div>

                      {/* BMR & TDEE Calculation Section */}
                      <div className="card shadow-lg bg-light p-4 rounded-4" style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}>
                          <h5 className="text-center">Calculate Your BMR & TDEE</h5>
                          <div className="text-center mb-3">
                              <label htmlFor="activitySelect" className="form-label">Select Your Activity Level:</label>
                              <select
                                  id="activitySelect"
                                  className="form-select mb-3"
                                  value={selectedActivity}
                                  onChange={handleActivityLevelChange}
                              >
                                  {activityLevels.map((level, idx) => (
                                      <option key={idx} value={level.value}>{level.label}</option>
                                  ))}
                              </select>

                              <div className="alert alert-info">
                                  <p><strong>Description:</strong> {
                                      activityLevels.find(a => a.value === selectedActivity)?.desc
                                  }</p>
                              </div>
                          </div>

                          <div className="bg-light text-dark rounded-3 p-3 shadow-sm">
                              <h5 className="text-center">Calculation Results</h5>
                              <p><strong>BMR:</strong> {calculatedBMR?.toFixed(2)} kcal/day</p>
                              <p><strong>TDEE:</strong> {calculatedTDEE?.toFixed(2)} kcal/day</p>
                          </div>
                      </div>

                        {/* Delete Account Section */}
                        <div className="card shadow-lg bg-light p-4 rounded-4 mt-4" style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}>
                            <h5 className="text-center mb-3 text-danger">Delete Account</h5>
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-danger px-4" onClick={handleDeleteAccount}>
                                    <i className="fa-solid fa-trash"></i> Delete Account
                                </button>
                            </div>
                        </div>
                  </div>
              )}
          </div>
        </div>
    );
}

export default Profile;
