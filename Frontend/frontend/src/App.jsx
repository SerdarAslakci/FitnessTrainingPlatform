import {BrowserRouter as Router, Routes, Route}  from "react-router-dom"
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Exercises from "./Exercises"
import Nutrition from "./Nutrition"
import Profile from "./Profile"
import UpdateProfile from "./UpdateProfile"
import MyWorkout  from "./MyWorkout"
import WorkoutGenerator from "./WorkoutGenerator"
import NutritionPlan from "./NutritionPlan"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/exercises" element={<Exercises/>}/>
        <Route path="/nutrition" element={<Nutrition/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/exercises/category/:category" element={<Exercises />} />
        <Route path="/exercises/exercise-detail/:id" element={<Exercises />} />
        <Route path="/profile/update-profile" element ={<UpdateProfile/>}/>
        <Route path="/myworkout" element = {<MyWorkout/>}/>
        <Route path="/workoutgenerator" element = {<WorkoutGenerator/>}/>
        <Route path="/nutritionplan" element = {<NutritionPlan/>}/>
      </Routes>
    </Router>
  )
}

export default App
