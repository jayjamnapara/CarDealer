import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaTimes, FaBars, FaUser, FaCog, FaPlus } from 'react-icons/fa'
import { FaCarSide } from 'react-icons/fa6'
import { MdDashboard } from 'react-icons/md'
import { BiCar, BiUserCircle } from 'react-icons/bi'
import axios from 'axios';
import Logo from './Img/Logo.PNG'
import { FiUser } from 'react-icons/fi'

const Dashboard = () => {
  const [dropDown, setDropDown] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [carLength, setCarLength] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3030/CarDetails').then((res) => setCarLength(res.data))

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsOpen(window.innerWidth > 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    if (localStorage.getItem('role') !== 'admin') {
      navigate('/login')
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [navigate])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDrop = () => setDropDown(!dropDown)

  const handleLogout = () => {
    localStorage.removeItem('loggeduser')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const storedUser = localStorage.getItem('loggeduser') || localStorage.getItem('users')
  const user = storedUser ? JSON.parse(storedUser) : null

  if (!user && !user.name) {
    return (
      <div className="p-8">
        <p className="text-red-600">No user data found.</p>
      </div>
    )
  }

  //total user length 
  let UserLength = 0
  const getUser = JSON.parse(localStorage.getItem('users'))
  UserLength = getUser.length

  // get total car length
  const totalCar = carLength.length

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-500
        ${isOpen ? 'w-[260px]' : 'w-[80px]'}
        flex flex-col items-start sm:items-center 
        bg-black shadow-xl backdrop-blur-lg bg-opacity-90`}
      >
        {/* Top section */}
        <div className="w-full flex justify-between items-center h-16 px-4">
          {isOpen && (
            <Link to="/dashboard" className="text-xl font-semibold">
              <img src={Logo} alt="Car Dealer" className='h-25' />
            </Link>
          )}
          <button className="text-white px-2" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-4 flex flex-col w-full px-2">
          {/* Sidebar Item Template */}
          {[
            { to: '/dashboard', icon: <MdDashboard size={22} />, label: 'Dashboard' },
            { to: 'carsshow', icon: <FaCarSide size={22} />, label: 'Car Show' },
            { to: 'addcar', icon: <FaPlus size={22} />, label: 'Add Cars' },
            { to: 'users', icon: <FaUser size={22} />, label: 'Users' },
            { to: 'setting', icon: <FaCog size={22} />, label: 'Settings' },
          ].map((item, index) => (
            <li
              key={index}
              className="group relative flex items-center hover:bg-gray-600 h-12 rounded-xl mb-2 cursor-pointer transition-all duration-300 px-4"
            >
              <Link to={item.to} className="flex items-center space-x-4 text-white hover:text-black duration-300 w-full">
                {item.icon}
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
              {!isOpen && (
                <span className="absolute left-full ml-3 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right section: top navbar + main content */}
      <div className="flex-1 overflow-y-scroll bg-gray-300 p-6 transition-all duration-500">
        <div className='px-4 pr-10 py-5'>
          {/* Top navbar */}
          <div className="w-full py-7 px-8 bg-black shadow-md shadow-blue-400 z-10 rounded-lg">
            <div className="flex justify-between items-center">
              <header>
                <h1 className="text-md lg:text-2xl md:text-2xl text-white font-bold">Second‑Hand Car‑Dealer</h1>
                <p className="text-rose-600 text-sm lg:text-md md:text-md">Admin Dashboard</p>
              </header>

              <div className="relative">
                <button
                  className={`text-white bg-rose-500 rounded-full px-2 py-2 flex justify-center duration-300 focus:ring-rose-900 ${dropDown ? 'focus:ring-4' : 'focus:ring-0'}`}
                  onClick={toggleDrop}
                >
                  <FiUser className='text-xl lg:text-3xl' />
                </button>

                {dropDown && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right bg-black rounded-md shadow-lg ring-2 ring-gray-400 z-20 px-4 py-3 transition-all">
                    <div className="mb-3 flex justify-between space-x-4 pb-4 items-center border-b text-sm text-gray-700">
                      <div className="bg-rose-500 text-white rounded-full p-2">
                        <FiUser className='text-xl lg:text-3xl' />
                      </div>
                      <div className=''>
                        <p className="font-semibold text-[15px] lg:text-lg text-white">{user.name}</p>
                        <p className="text-xs text-gray-300">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-rose-500 font-semibold text-md text-rose-800 focus:outline-none rounded-full py-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-5">
          {location.pathname === '/dashboard' && (
            <>
              <h1 className='mb-3 text-white font-semibold text-md lg:text-xl md:text-xl'>Welcome to {user.name} Admin Dashboard</h1>
              <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-6 py-6 px-2">
                {/* Car Show Card */}
                <Link to='carsshow' className="w-full">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-xl p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <BiCar className="text-5xl opacity-80" />
                      <span className="text-2xl font-bold">{totalCar}</span>
                    </div>
                    <p className="text-lg font-medium tracking-wide">Total Cars</p>
                  </div>
                </Link>

                {/* Users Card */}
                <Link to='users' className="w-full">
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-2xl shadow-xl p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <BiUserCircle className="text-5xl opacity-80" />
                      <span className="text-2xl font-bold">{UserLength}</span>
                    </div>
                    <p className="text-lg font-medium tracking-wide">Registered Users</p>
                  </div>
                </Link>
              </div>
            </>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;