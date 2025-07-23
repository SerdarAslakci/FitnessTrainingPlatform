import React, { useEffect,useState } from "react";
import bg from './assets/bg.jpg';
import { Link } from "react-router-dom";
import nutrition from "./assets/Nutrition.jpg";
import axios from "axios";

function Nutrition()
{
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[foods, setFoods] = useState([]);
    const[foodNotFiltered, setfoodNotFiltered] = useState([]);
    const[minCal,setMinCal] = useState(0); 
    const[maxCal,setMaxCal] = useState(0);
    
    useEffect(() => 
    {
      const token = localStorage.getItem("token");
      if(token)
      {
        setIsLoggedIn(true);
      }
      getFoods();
    },[foods]);

    const handleMaxChange = (e) =>
    {
      setMaxCal(e.target.value);
    }
    const handleMinChange = (e) =>
    {
      setMinCal(e.target.value);
    }

    const getFoods = async() => 
    {
      if(foods.length == 0)
      {
        document.getElementById("btnAll").click();
      }
    }
    const handleLogoutButton = () => 
    {
       localStorage.removeItem("token");
    }

    const handleFilter = async (filter) => 
    {
      try
      {
        if(filter == 'protein')
        {
          const response = await axios.get(`http://localhost:5029/api/foods/get-all`,{params :{foodType : "Protein"}});
          if(response.data != null)
          {
            setFoods(response.data);
            const buttons = document.getElementsByClassName("btnFilter");
            Array.from(buttons).forEach(element => {
              if (element.id === "btnProtein") {
                element.classList.add("active");
              }
              else
              {
                element.classList.remove("active");
              }
            });
          }
        }
        else if(filter == 'carbs')
        {
          const response = await axios.get(`http://localhost:5029/api/foods/get-all`,{params :{foodType : "Karbonhidrat"}});
          if(response.data != null)
          {
            setFoods(response.data);
            const buttons = document.getElementsByClassName("btnFilter");
            Array.from(buttons).forEach(element => {
              if (element.id === "btnCarbs") {
                element.classList.add("active");
              }
              else
              {
                element.classList.remove("active");
              }
            });
          }
        }
        else if(filter == 'fats')
        {
          const response = await axios.get(`http://localhost:5029/api/foods/get-all`,{params :{foodType : "yağ"}});
          if(response.data != null)
          {
            setFoods(response.data);
            const buttons = document.getElementsByClassName("btnFilter");
            Array.from(buttons).forEach(element => {
              if (element.id === "btnFats") {
                element.classList.add("active");
              }
              else
              {
                element.classList.remove("active");
              }
            });
          }  
        }
        else
        {
          const response = await axios.get(`http://localhost:5029/api/foods/get-all`);
          if(response.data != null)
          {
            setFoods(response.data);
            const buttons = document.getElementsByClassName("btnFilter");
            Array.from(buttons).forEach(element => {
              if (element.id === "btnAll") {
                element.classList.add("active");
              }
              else
              {
                element.classList.remove("active");
              }
            });
          }
        }

      }
      catch(error)
      {
        console.log(error);
      }

    }
    
    const handleFilterByCalories = () =>
    {
      setfoodNotFiltered(foods);
      setFoods(foods.filter(s => s.calories <= maxCal && s.calories >= minCal));
    }

    const handleDeleteFilterByCalories = () =>
    {
      setFoods(foodNotFiltered);
      setMinCal(0);
      setMaxCal(0);
    }

    return(
      
        <div className="bg-black">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-2">
               <div className="container-fluid">
                    <Link className="navbar-brand ml-" to={"/"}>FITNESS</Link>

                     {/* Toggle button for mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
            

                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav ms-auto">
                          {isLoggedIn ? (
                            <>
                              <li className="nav-item">
                                <Link className="nav-link" to={"/exercises"}>Exercises</Link>
                              </li>

                              <li className="nav-item">
                                <Link className="nav-link active" to={"/nutrition"}>Nutrition & Meals</Link>
                              </li>

                              <li className="nav-item">
                                <Link className="nav-link" to={"/myworkout"}>My Workout</Link>
                              </li>

                              <li className="nav-item">
                                <Link className="nav-link" to={"/profile"}>Profile</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" onClick={handleLogoutButton} to={"/"}> <i className="fa-solid fa-right-from-bracket"></i></Link>
                              </li>
                            </>
                                ) : (
                            <>
                              <li className="nav-item">
                                <Link className="nav-link" to={"/exercises"}>Exercises</Link>
                              </li>
                              
                              <li className="nav-item">
                                <Link className="nav-link active" to={"/nutrition"}>Nutrition & Meals</Link>
                              </li>

                              <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" to={"/register"}>Register</Link>
                              </li>
                            </>
                          )}
                      </ul>
                    </div>
               </div>
            </nav>


        <div className="container-fluid text-center px-0 h-30vh" >
          <div className="container-fluid w-100 d-flex align-items-center justify-content-center" style={
            { backgroundImage:`url(${nutrition})`,
              backgroundPosition:"center",
              backgroundSize:"cover", 
              height: "45vh",
            }}>
            <div className="bg-dark py-3 px-5 border-rounded">
              <h1 className="display-4  text-white fw-bold mb-4" >NITRUTION</h1>
              <h4 className="text-white fw-bold">"Strong Nutrition, Stronger You."</h4>
            </div>
          </div>


          <div className="container mt-5">
            <h2 className="text-white mb-0">Nutrition Info</h2>
            <small className="text-white mb-5">(Calculated for 100g)</small>

            {/* Filtre Butonları */}
            <div className="d-flex justify-content-center gap-3 mb-4 mt-4">
              <button id="btnAll" className="btn btn-outline-light btnFilter" onClick={() => handleFilter('all')}>All</button>
              <button id="btnCarbs" className="btn btn-outline-warning btnFilter" onClick={() => handleFilter('carbs')}>Carbs</button>
              <button id="btnProtein" className="btn btn-outline-success btnFilter" onClick={() => handleFilter('protein')}>Protein</button>
              <button id="btnFats" className="btn btn-outline-danger btnFilter" onClick={() => handleFilter('fats')}>Fats</button>
            </div>

            {/* Kalori Aralığı Girişi */}
            <div className="d-flex flex-column justify-content-center align-items-center my-4">
              <h5 className="text-white text-center mb-2">Calorie Range (Min - Max)</h5>
              <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
                <div className="col-12 col-md-auto">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min Calories"
                    value={minCal}
                    onChange={handleMinChange}
                  />
                </div>
                <span className="text-white">-</span>
                <div className="col-12 col-md-auto">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max Calories"
                    value={maxCal}
                    onChange={handleMaxChange}
                  />
                </div>
                
                {/* Butonlar */}
                <div className="d-flex gap-2 col-12 col-md-auto justify-content-center">
                  <button id="filterButton" className="btn btn-outline-success text-green" onClick={handleFilterByCalories}>✔</button>
                  <button id="deleteFilterButton" className="btn btn-outline-danger text-red" onClick={handleDeleteFilterByCalories}>❌</button>
                </div>
              </div>
            </div>




            {/* Yiyecekler */}
            <div className="row">
              {foods.map(food => (
                <div key={food.id} className="col-sm-12 col-md-6 col-lg-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-white bg-dark rounded px-2 py-3"><strong>{food.name}</strong></h5>
                      <p className="card-text"><strong>Calories:</strong> {food.calories}</p>
                      <p className="card-text"><strong>Protein:</strong> {food.protein}g</p>
                      <p className="card-text"><strong>Carbs:</strong> {food.carbs}g</p>
                      <p className="card-text"><strong>Fats:</strong> {food.fats}g</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

       
      </div>
    </div>
    );
}

export default Nutrition;