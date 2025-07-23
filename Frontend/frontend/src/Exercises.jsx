import React, { useEffect, useState } from "react";
import bg from './assets/bg.jpg';
import { Link } from "react-router-dom";
import exercisesBg from "./assets/exercisesPageBg.jpg";
import axios from "axios";
import abs from "./assets/Category/abs_0.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Exercises()
{   
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[searchTerm,setSearchTerm] = useState("");
    const[exerciseList,setExerciseList] = useState([]);
    const navigate = useNavigate();
    const {category,id} = useParams();
    const location = useLocation();

    const categories = [
      { name: "Abs", image: abs},
      { name: "Biceps", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/biceps_0.jpg" },
      { name: "Calves", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/calves_0.jpg" },
      { name: "Chest", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/chest_0.jpg" },
      { name: "Forearms", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/forearms_0.jpg" },
      { name: "Glutes", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/glutes_0.jpg" },
      { name: "Hamstrings", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/hamstrings_0.jpg"},
      { name: "Hipflexors", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/hipflexors.jpg" },
      { name: "Lats", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/lats_0.jpg" },
      { name: "Neck", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/neck.jpg" },
      { name: "Obliques", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/obliques.jpg" },
      { name: "Quads", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/quads_1.jpg" },
      { name: "Shoulders", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/shoulders_0.jpg" },
      { name: "Traps", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/traps_0.jpg" },
      { name: "Triceps", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/triceps_0.jpg" },
      { name: "Upperback", image: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/upperback.jpg" },
    ];

    function convertToEmbedUrl(url) {
      try {
        const parsedUrl = new URL(url);
    
        if (parsedUrl.hostname === "youtu.be") {
          const videoId = parsedUrl.pathname.slice(1);
          const start = parsedUrl.searchParams.get("t");
          return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
        }
    
        if (parsedUrl.hostname.includes("youtube.com")) {
          const videoId = parsedUrl.searchParams.get("v");
          const start = parsedUrl.searchParams.get("t");
          return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
        }
    
        return ""; // geçerli değilse boş döner
      } catch (e) {
        return "";
      }
    }

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const search = params.get("search");

      if (search) {
        handleSearchClick(search);
      } else {
        setExerciseList([]);
      }
    }, [location.search]);

    useEffect(() => 
    {
        setExerciseList([]);
        const token = localStorage.getItem("token");
        if(token)
        {
          setIsLoggedIn(true);
        }
        if (id) {
          handleExerciseClick(id);
        } else if (category) {
          handleCategoryClick(category);
        } else {
          setExerciseList([]); 
        }
    },[category,id]);

    const handleLogoutButton = () => 
    {
        localStorage.removeItem("token");
    }   
    
    const handleSearchClick = async (searchTerm) => {
      try {
        document.getElementsByClassName("form-control-lg")[0].value = "";

        const response = await axios.get(`http://localhost:5029/api/FitnessExercises/name/${searchTerm}`);
        const data = response.data;

        if (data) {
          const list = Array.isArray(data) ? data : [data]; // Her zaman array yap
          setExerciseList(list);
        } else {
          setExerciseList([]);
        }
      } catch (error) {
        console.error("Egzersiz bulunamadı", error);
        setExerciseList([]);
      }
    };

    const handleCategoryClick = async (category) =>
    {
      try {
        const response = await axios.get(`http://localhost:5029/api/FitnessExercises/`, {
          params: { MuscleGroup: category } // category bilgisini parametre olarak gönderiyoruz
        });
        if(response.data != null)
        {
          setExerciseList(response.data);
          navigate(`/exercises/category/${category}`);
        }
      } 
      catch (error) {
        console.error("Kategoriye ait egzersizler yüklenemedi", error);
      }
    }

    const handleExerciseClick = async (id) => 
    {
      try{ 
        const exercise = await axios.get(`http://localhost:5029/api/FitnessExercises/${id}`);
        if(exercise.data != null)
        {
          setExerciseList(exercise.data);
          navigate(`/exercises/exercise-detail/${id}`)
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }

    const handleCategoryButtonClick = () =>
    {
      setSearchTerm("");
      setExerciseList([]);
      navigate("/exercises");
    }


    return(
      
        <div style={{backgroundColor:"black",minHeight:"100vh"}}>
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
                                <Link className="nav-link active" to={"/exercises"}>Exercises</Link>
                              </li>

                              <li className="nav-item">
                                <Link className="nav-link" to={"/nutrition"}>Nutrition & Meals</Link>
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
                                <Link className="nav-link active" to={"/exercises"}>Exercises</Link>
                              </li>
                              
                              <li className="nav-item">
                                <Link className="nav-link" to={"/nutrition"}>Nutrition & Meals</Link>
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

          <div className="container-fluid text-center px-0 vh-200">
           
            <div
                className="container-fluid w-100 d-flex align-items-center justify-content-center text-white"
                style={{
                  backgroundImage: `url(${exercisesBg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "60vh"
                }}
              >
                <div>
                <h1 className="display-1 fw-bold mb-4">EXERCISES</h1>
                <h1 className="display-6">Everything you're looking for is right here on the Exercise Page!</h1>
                </div>           
            </div>
      
          {/* Arama Çubuğu */}
          <div  className="input-group mb-4 container mt-5 col-lg-6">
            <input
              id="searchInput"
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for any exercise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => handleSearchClick(searchTerm)} className="btn btn-secondary" ><i className="fas fa-search"></i></button>
          </div>

          <div className="my-3 ">
                <button onClick={handleCategoryButtonClick} className="btn btn-outline-light btn-lg">Categories</button>
          </div>

          <div className="container mt-5 d-flex justify-content-center">
              {/* Eğer liste boşsa kategorileri göster */}
              {exerciseList.length === 0 && (
                <div className="row">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
                    >
                      <div
                        className="text-center category-card"
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          border: "2px solid white", 
                          borderRadius: "10px",
                          padding: "4px", 
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                        }}
                        onClick={() => handleCategoryClick(category.name)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "150px",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "5px",
                            marginBottom:"3px"
                          }}
                        />
                        <h5 className="mt-2 text-white">{category.name}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Eğer sadece bir egzersiz varsa büyük göster */}
              {exerciseList.length === 1 && (
              <div 
                className="card col-9 bg-dark text-white p-4 my-5"
              >
                {exerciseList[0].imgUrl && (
                  <img 
                    src={exerciseList[0].imgUrl} 
                    alt={exerciseList[0].name} 
                    className="img-fluid mb-3 rounded"
                    style={{ maxHeight: '600px', objectFit: 'cover', width: '100%' }}
                  />
                )}

                <h2>{exerciseList[0].name}</h2>
                {exerciseList[0].description && <p>{exerciseList[0].description}</p>}
                <p><strong>Muscle Group:</strong> {exerciseList[0].muscleGroup}</p>
                {exerciseList[0].difficulty && (
                  <p><strong>Difficulty:</strong> {exerciseList[0].difficulty}</p>
                )}

                {/* Video Linki */}
                {exerciseList[0].videoUrl && (
                  <div className="mt-4">
                    <h5 className="my-3">Exercise Video:</h5>
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={convertToEmbedUrl(exerciseList[0].videoUrl)}
                        alt= "Video Not Found!"
                        title="Exercise Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      ></iframe>

                    </div>
                  </div>
                )}
              </div>
            )}

              {/* Eğer birden fazla egzersiz varsa 2’li grid göster */}
              {exerciseList.length > 1 && (
                <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
                  {exerciseList.map((exercise, index) => (
                    <div className="col" 
                    onClick={() => handleExerciseClick(exercise.id)} key={index}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <div className="card bg-dark text-white p-3 h-100">
                        <img src={exercise.imgUrl} alt={exercise.name} className="img-fluid mb-3 rounded" ></img>
                        <h4>{exercise.name}</h4>
                        <p>{exercise.description}</p>
                        <p><strong>Difficulty: </strong>{exercise.difficulty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          </div>
        </div>
    );
}

export default Exercises