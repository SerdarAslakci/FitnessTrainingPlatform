import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bg from './assets/bg.jpg';

function UpdateProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        height: "",
        weight: "",
        fitnessGoal: ""
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5029/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => {
                console.error(err);
                navigate("/login");
            });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogoutButton = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token bulunamadı!");
            return;
        }

        try {
            const response = await axios.put("http://localhost:5029/api/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Profil başarıyla güncellendi!");
            navigate("/profile");
        } catch (err) {
            console.error("Update failed:", err);
            setErrorMessage("An error occurred while updating the profile.");
        }
    };

    return (
        <div className="vh-100" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", overflowY: "auto" }}>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FITNESS</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/exercises">Exercises</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/nutrition">Nutrition</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
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
                <form onSubmit={handleSubmit} className="card shadow-lg p-4 rounded-4 bg-light" style={{ maxWidth: "600px", width: "100%" }}>
                    <h3 className="text-center mb-4">Update Profile</h3>

                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Height (cm)</label>
                        <input type="number" className="form-control" name="height" value={formData.height} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Weight (kg)</label>
                        <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Fitness Goal</label>
                        <select className="form-select" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} required>
                            <option value="">Select a goal</option>
                            <option value="Lose Weight">Lose Weight</option>
                            <option value="Build Muscle">Build Muscle</option>
                            <option value="Increase Endurance">Increase Endurance</option>
                            <option value="Improve Flexibility">Improve Flexibility</option>
                            <option value="Maintain Current Fitness">Maintain Current Fitness</option>
                            <option value="General Health & Wellness">General Health & Wellness</option>
                        </select>
                    </div>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="text-center">
                        <button type="submit" className="btn btn-success px-4">
                            <i className="fa-solid fa-floppy-disk"></i> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
