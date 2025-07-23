import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import bg from './assets/bg.jpg'

function Home()
{
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => 
  {
    const token = localStorage.getItem("token");
    if(token)
    {
      setIsLoggedIn(true);
    }
  },[])

  const handleLogoutButton = () =>
  {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }


  return (
    <div style={{ overflowX: "hidden" }}>
  
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark bg-opacity-100 px-2">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>FITNESS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to={"/exercises"}>Exercises</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/nutrition"}>Nutrition & Meals</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/myworkout"}>My Workout</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/profile"}>Profile</Link></li>
                  <li className="nav-item"><Link className="nav-link" onClick={handleLogoutButton} to={"/"}><i className="fa-solid fa-right-from-bracket"></i></Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to={"/exercises"}>Exercises</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/nutrition"}>Nutrition & Meals</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/login"}>Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to={"/register"}>Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  
      {/* Hero Section with Image */}
      <section style={{ 
        height: "100vh", 
        backgroundImage: `url(${bg})`, 
        backgroundPosition: "center", 
        backgroundSize: "cover", 
        position: "relative" 
      }}>
        <div className="container text-white py-5" style={{
          position: "absolute", top: "13%", left: "50%", transform: "translateX(-50%)", zIndex: 1
        }}>
          <div className="p-5 rounded bg-dark bg-opacity-75 text-center">
            <h1 className="display-4 fw-bold">Welcome to Fitness Environment</h1>
            <p className="lead">Transform your body, mind, and performance. Your journey to fitness starts now!</p>
            {!isLoggedIn && (
              <div className="mt-4">
                <a href="/login" className="btn btn-outline-light btn-lg m-2">LOGIN</a>
                <a href="/register" className="btn btn-outline-light btn-lg m-2">REGISTER</a>
              </div>
            )}
          </div>
        </div>
      </section>
  
      {/* Scrollable Sections with Black Theme */}
      <div style={{ backgroundColor: "#111", color: "white", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">What We Offer?</h2>
          <p className="text-white mb-5">Explore the key features of your application.</p>
  
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-dark rounded-4 border border-secondary h-100">
                <h4 className="fw-bold text-white">Exercise Guide</h4>
                <p>Plan your workouts with comprehensive exercises, videos, and descriptions.</p>
                <Link to="/exercises" className="btn btn-outline-light">Explore</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-dark rounded-4 border border-secondary h-100">
                <h4 className="fw-bold text-white">Nutrition & Diet</h4>
                <p>Manage your diet with healthy recipes, meal suggestions, and daily calorie tracking.</p>
                <Link to="/nutrition" className="btn btn-outline-light">Check it out</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-dark rounded-4 border border-secondary h-100">
                <h4 className="fw-bold text-white">Track Your Progress</h4>
                <p>Track your workouts and see your progress.</p>
                <Link to="/myworkout" className="btn btn-outline-light">Start</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <p className="mb-0">&copy; 2025 FITNESS. May the strength be with you.</p>
      </footer>
    </div>
  );
  
}

export default Home;