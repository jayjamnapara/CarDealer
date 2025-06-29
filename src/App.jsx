import { useEffect, useState } from "react"
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from "./Component/Signup"
import Login from "./Component/Login"
import Dashboard from "./Component/Admin/Dashboard"
import Home from "./Component/Users/Home"
import CarsShow from "./Component/Admin/CarsShow"
import AddCar from "./Component/Admin/AddCar"
import UserDetails from "./Component/Admin/UserDetails"
import Settings from './Component/Admin/Settings'
import Editcar from './Component/Admin/Editcar'
import Profile from "./Component/Users/Profile"
import About from "./Component/Users/About"
import Contact from "./Component/Users/Contact"
import MyCars from "./Component/Users/MyCars"
import CarDetails from "./Component/Users/CarDetails"
import CarCatShow from "./Component/Users/CarCatShow"
import AllCatCars from "./Component/Users/AllCatCars";


function App() {
  // const [role, setRole] = useState(null)
  // // role get from localstorage
  // useEffect(() => {
  //   const savedRole = localStorage.getItem('role')
  //   setRole(savedRole)
  // }, [])

  // get car from axios
  const [CarData, setCarData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3030/CarDetails')
    .then((res)=>{
      setCarData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* dashboard routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='carsshow' element={<CarsShow />} />
          <Route path='editcar/:id' element={<Editcar />} />
          <Route path='addcar' element={<AddCar />} />
          <Route path='users' element={<UserDetails />} />
          <Route path='setting' element={<Settings />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />

        {/* client side Route */}
        <Route path='/home' element={<Home CarData={CarData} />}>
          <Route path='profile' element={<Profile />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='mycar' element={<MyCars/>}/>
          <Route path='cardetails/:id' element={<CarDetails/>}/>
          <Route path='carcatshow/:cat' element={<CarCatShow />}/>
          <Route path='carcollection' element={<AllCatCars CarData={CarData} />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;