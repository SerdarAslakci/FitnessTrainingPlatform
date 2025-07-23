import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bg from './assets/bg.jpg';  // Arka plan resmini buraya ekle

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      fetchWorkouts();
    } else {
      navigate("/login");
    }
  }, []);

  const fetchWorkouts = () => {
    const token = localStorage.getItem("token");

    if(token == null)
    {
      navigate("/login");
    }
  
    axios.get('http://localhost:5029/api/MyWorkoutPlan', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error('Veri alınırken hata oluştu:', error);
        }
      });
  };

  const markDayCompleted = (day) => {
    const token = localStorage.getItem("token");
  
    axios.put('http://localhost:5029/api/MyWorkoutPlan/CompleteDay', null, {
      params: { day: day },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      axios.get('http://localhost:5029/api/MyWorkoutPlan', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const updatedWorkouts = response.data;
        setWorkouts(updatedWorkouts);
  
        const allCompleted = updatedWorkouts.every(workout => 
          workout.exercises.every(exercise => exercise.isCompleted)
        );
  
        if (allCompleted) {
          resetWeekExercises();
        } else {
          navigate("/myworkout");
        }
      });
    })
    .catch(error => {
      console.error('Veri güncellenirken hata oluştu:', error);
    });
  };

  
  const handleSearchWorkoutButton = (exerciseName) => {
    navigate(`/exercises?search=${encodeURIComponent(exerciseName)}`);
  };

  const checkAndResetIfNeeded = async () => {
    const allCompleted = workouts.every(workout => 
      workout.exercises.every(exercise => exercise.isCompleted)
    );
  
    if (allCompleted) {
      await resetWeekExercises();  
      await fetchWorkouts();       
    }
  };
  
  const resetWeekExercises = async () => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.put('http://localhost:5029/api/MyWorkoutPlan/ResetAllWeek', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Hafta sıfırlama başarılı.");
  
      // Reset sonrası verileri tekrar çekelim
      const response = await axios.get('http://localhost:5029/api/MyWorkoutPlan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkouts(response.data);
  
    } catch (error) {
      console.error('Egzersizler sıfırlanırken hata oluştu:', error.response ? error.response.data : error.message);
    }
  };
  

    const getNextIncompleteDay = () => {
      return workouts.findIndex(workout => {
        return !workout.exercises.every(exercise => exercise.isCompleted);
      });
    };

    const handleLogoutButton = () => {
      localStorage.removeItem('token');
      navigate("/login");
    };
  return (
    <div className="vh-100" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", overflowY: "auto" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">FITNESS</Link>

          {/* Hamburger Menü Butonu - küçük ekranlarda görünür */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Açılır Menü */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/exercises">Exercises</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nutrition">Nutrition & Meals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/myworkout">My Workout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
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



      {/* Workout Plan Container */}
      <div className="container mt-4 bg-dark text-white">
        {/* Weekly Workout Display */}
        <div className="row justify-content-center my-3">
          {workouts.map((workout, index) => (
            <div key={index} className={`col-12 col-md-4 my-3`}>
              <div className={`card ${index === getNextIncompleteDay() ? 'border-primary' : 'border-light'} bg-dark text-white`} style={{ width: '100%' }}>
                <div className="card-header text-center">
                  <h6>DAY-{index + 1}</h6>  {/* Gün sayısını düzgün yazalım */}
                </div>
                <div className="card-body">
                  <table className="table table-dark table-bordered text-white ">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((exercise, idx) => (
                        <tr key={idx}>
                          <td>{exercise.name}</td>
                          <td>{exercise.sets}</td>
                          <td>{exercise.reps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getNextIncompleteDay() >= 0 && (() => {
        const dayData = workouts[getNextIncompleteDay()];
        const groupedExercises = dayData.exercises.reduce((groups, ex) => {
          const group = ex.muscleGroup || "Diğer";
          if (!groups[group]) groups[group] = [];
          groups[group].push(ex);
          return groups;
        }, {});

        return (
          <div key={dayData.day} className="card mb-5 shadow-lg bg-dark text-light border-0">
            <div className="card-header bg-black text-white text-center py-3 border-bottom">
              <h3 className="mb-0">Day {dayData.day} – Workout Plan</h3>
            </div>
            <div className="card-body">
              {Object.entries(groupedExercises).map(([groupName, exercises]) => (
                <div key={groupName} className="mb-5">
                  <h4 className="text-info border-bottom pb-2 mb-3">{groupName.toUpperCase()}</h4>
                  <div className="row">
                    {exercises.map((exercise, idx) => (
                      <div key={idx} className="col-md-6 mb-4">
                        <div className="card h-100 bg-secondary text-light border-0 shadow-sm">
                          <div className="card-body position-relative">
                             {/* Sağ üst köşe Link */}
                            <button
                              onClick={() => handleSearchWorkoutButton(exercise.name, exercise.groupName)}
                              className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2"
                              title="Go to details"
                            >
                              ➜
                            </button>

                            <h5 className="card-title"><strong>{exercise.name}</strong></h5>
                            <p className="card-text">{exercise.description}</p>
                            <p className="mb-0">
                              <span className="badge bg-dark me-2">Sets: {exercise.sets}</span>
                              <span className="badge bg-dark">Reps: {exercise.reps}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-success btn-lg px-5"
                  onClick={() => markDayCompleted(dayData.day)}
                  disabled={dayData.exercises.every(ex => ex.isCompleted)}
                >
                  Complete Today
                </button>
              </div>
            </div>
          </div>

        );
      })()}

      </div>
    </div>
  );
};

export default Workout;
