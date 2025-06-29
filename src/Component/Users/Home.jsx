import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { FaCar, FaDollarSign, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom'
import Logo from './Img/Logo.PNG';
import Home3 from './Img/Home-3.webp'
import './App.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { BsShieldCheck } from 'react-icons/bs';
import { GiPriceTag } from 'react-icons/gi';
import axios from 'axios'

const Home = ({ CarData }) => {
  const [search, setSearch] = useState('')
  const [Isopen, setIsOpen] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //that not user that can't come home page
    const role = localStorage.getItem('role')
    if (role !== 'user') {
      navigate('/login');
    }
    Aos.init({ duration: 1000 })
  }, [])

  // getuser for checking
  const storedUser = localStorage.getItem('loggeduser') || localStorage.getItem('users')
  const User = storedUser ? JSON.parse(storedUser) : null
  //check the user
  if (!User && !User.name) {
    return (
      <div className='p-8'>
        <p className='text-red-700'>No User Data Found!</p>
      </div>
    )
  }

  //toggle button for navigation for mobile
  const togglebtn = () => {
    setIsOpen(prev => !prev)
    setDropDown(false)
  }

  //mobile menu click logic
  const handleMenuClick = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  //user profile dropdown menu
  const toggleDropDown = () => setDropDown(!dropDown)

  // logic code for logout user  
  const handlelogout = () => {
    localStorage.removeItem('loggeduser')
    localStorage.removeItem('role')
    navigate('/login')
  }

  //search filter data go this page logic
  const searchCar = () => {
    // e.preventDefault();
    const matchCar = CarData.find((items) => items.name.toLowerCase().includes(search.toLowerCase()))
    console.log(matchCar)
    if (!matchCar) {
      alert('Car Not Available')
    }
    else {
      // e.preventDefault();
      navigate(`cardetails/${matchCar.id}`)
    }
  }

  //category wise page data car in render and goes
  const carCate = (Cat) => {
    // axios.get(`http://localhost:3030/CarDetails?type=${encodeURIComponent(Cat)}`)
    axios.get(`http://localhost:3030/CarDetails?type=${Cat}`)
      .then((res) => {
        if (res.data.length === 0) {
          alert(`No cars found in ${Cat} category`);
          return;
        }
        navigate(`carcatshow/${Cat}`)
      })
      .catch((err) => {
        console.error('Error fetching cars by category:', err)
        alert('somthing went wrong.');
      })
  }

  const category = [
    {
      url: 'https://platform.cstatic-images.com/in/v2/stock_photos/3c690ae9-f9d3-437b-84d7-d77e8cc08e70/ca45ae10-61f7-4b3f-a1d2-77838dd185ca.png',
      cat: 'Sedan',
    },
    {
      url: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/model-navigation/bmw-x4-m40i-flyout-neu1.png',
      cat: 'Coupe',
    },
    {
      url: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/models/26my/bentayga-speed/Navigation%20Front.png/_jcr_content/renditions/original.image_file.1440.720.file/Navigation%20Front.png',
      cat: 'SUV',
    },
    {
      url: 'https://mystrongad.com/toyota/2025/tundra/2025-Toyota-Tundra-Hybrid-White.webp',
      cat: 'Truck',
    }
  ];
  return (
    <>
      <nav className='sticky z-50 top-0 w-full bg-[#0f0f11]'>
        <div className='max-w-9xl md:max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='w-full flex justify-between items-center h-16'>

            {/* mobile user profile */}
            <div className='h-full w-fit flex items-center md:hidden lg:hidden'>
              {
                User ? (
                  <div className='relative'>
                    <button
                      onClick={toggleDropDown}
                      className={`text-rose-700 bg-rose-400 rounded-full w-12 py-2 flex justify-center duration-300 focus:ring-rose-900 ${dropDown ? 'focus:ring-4' : 'focus:ring-0'}`}>
                      <FiUser size={30} />
                    </button>
                    {/* DropDown Animation */}
                    <div className={`absolute left-0 top-14 w-64 bg-[#1f1f22] rounded-2xl shadow-lg px-6 py-4 z-50 transition-transform duration-300 origin-top-right transform ${dropDown ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                      <div className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                        <div className="bg-rose-400 rounded-full p-2">
                          <FiUser size={30} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white text-lg font-semibold">{User.name}</p>
                          <p className="text-gray-400 text-sm">{User.email}</p>
                        </div>
                      </div>
                      <ul className="pt-4 space-y-2">
                        <div className='flex justify-between items-center'>
                          <li>
                            <Link to="profile" className="flex items-center text-white hover:text-rose-400 transition">
                              <FiUser className="mr-2" /> My Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="mycar" className="flex items-center text-white hover:text-rose-400 transition">
                              <FaCar className='mr-2' /> My Cars
                            </Link>
                          </li>
                        </div>
                        <li>
                          <button onClick={handlelogout} className='py-2 w-full rounded-full bg-red-400 text-lg text-rose-900 font-semibold'>
                            LogOut
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
                  :
                  (<Link
                    to="/"
                    className="block text-center bg-gradient-to-tr from-rose-900 to-red-400 text-white px-5 py-2 rounded-full hover:from-red-500 hover:to-rose-800"
                  >
                    Log In
                  </Link>)
              }
            </div>

            {/* logo default */}
            <div className='h-full w-50 flex items-center justify-center'>
              <img src={Logo} className='h-30' alt="logo" />
            </div>

            {/* Humburger Icon animation */}
            <div className='relative lg:hidden md:hidden'>
              <button
                className='relative w-8 h-7 flex flex-col justify-between items-center group'
                onClick={togglebtn}>
                <span className={`h-1 w-full bg-white rounded transition-all duration-300 ${Isopen ? 'rotate-45 translate-y-3.5' : ''}`}></span>
                <span className={`h-1 w-full bg-white rounded transition-all duration-300 ${Isopen ? 'opacity-0' : ''}`}></span>
                <span className={`h-1 w-full bg-white rounded transition-all duration-300 ${Isopen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </button>
            </div>

            {/* mobile menu */}
            <div className={`absolute top-16 left-0 w-full md:hidden bg-[#0f0f11] px-6 pt-4 pb-6 space-y-4 shadow-md transform transition-all duration-300 ease-in-out
              ${Isopen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95 pointer-events-none'}`}>
              <button className='block text-white text-lg hover:text-red-700' onClick={() => handleMenuClick('/home')}>Home</button>
              <button className='block text-white text-lg hover:text-red-700' onClick={() => handleMenuClick('about')}>About</button>
              <button className='block text-white text-lg hover:text-red-700' onClick={() => handleMenuClick('contact')}>Contact</button>

              <div className='flex items-center space-x-3'>
                <div className='flex relative w-full bg-white rounded-lg items-center'>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    placeholder="Search The Car"
                    className='focus:outline-none px-3 py-2 w-full text-black rounded-lg'
                  />
                  <span onClick={() => searchCar()} className='absolute right-2 bg-white text-xl rounded-lg text-black'><BiSearch /></span>
                </div>
              </div>
            </div>


            {/* desktop navbar */}
            <div className='md:flex justify-end items-center hidden'>
              <ul className='flex items-center justify-center space-x-5 font-semibold'>
                <li className='transition-all text-white duration-200 hover:text-[#db3c3a]'><Link to='/home'>Home</Link></li>
                <li className='transition-all text-white duration-200 hover:text-[#db3c3a]'><Link to='about'>About</Link></li>
                <li className='transition-all text-white duration-200 hover:text-[#db3c3a]'><Link to='contact'>Contact</Link></li>
                <li className='transition-all text-white duration-200 hover:text-[#db3c3a]'><Link to='carcollection'>Collection</Link></li>
              </ul>

              <div className='flex relative w-75 rounded-lg items-center mx-10'>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                  placeholder="Search The Car"
                  className='focus:outline-none bg-white w-full p-2 px-4 rounded-full'
                />
                <span className='absolute right-0 text-xl py-3 px-1.5 rounded-r-full'>
                  <BiSearch onClick={() => searchCar()} />
                </span>
              </div>

              {
                User ? (
                  <div className='relative w-12 rounded-full flex items-center justify-center'>
                    <button
                      onClick={toggleDropDown}
                      className={`text-rose-700 bg-rose-400 rounded-full w-full py-2 flex justify-center duration-300 focus:ring-rose-900 ${dropDown ? 'focus:ring-4' : 'focus:ring-0'}`}>
                      <FiUser size={30} />
                    </button>
                    {/*dropdown animation*/}
                    <div className={`absolute -right-5 top-14 w-64 bg-[#1f1f22] rounded-2xl shadow-lg px-6 py-4 z-50 transition-transform duration-500 origin-top-right transform ${dropDown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                      <div className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                        <div className="bg-rose-400 rounded-full p-2">
                          <FiUser size={30} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white text-lg font-semibold">{User.name}</p>
                          <p className="text-gray-400 text-sm">{User.email}</p>
                        </div>
                      </div>
                      <ul className="pt-4 space-y-2">
                        <div className='flex justify-between items-center'>
                          <li>
                            <Link to="profile" className="flex items-center text-white hover:text-rose-400 transition">
                              <FiUser className="mr-2" /> My Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="mycar" className="flex items-center text-white hover:text-rose-400 transition">
                              <FaCar className='mr-2' /> My Cars
                            </Link>
                          </li>
                        </div>
                        <li>
                          <button onClick={handlelogout} className='py-2 w-full rounded-full bg-red-400 text-lg text-rose-900 font-semibold'>
                            LogOut
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/"
                    className="block text-center bg-gradient-to-tr from-rose-900 to-red-400 text-white px-5 py-2 rounded-full hover:from-red-500 hover:to-rose-800"
                  >
                    Log In
                  </Link>
                )
              }
            </div>
            {/* desktop navbar */}
          </div>
        </div>
      </nav >

      <div className='relative h-full flex flex-col justify-center items-center'>
        {
          location.pathname === '/home' && (
            <>
              {/* home page */}
              <div className='min-h-[91vh] flex justify-center w-full'>
                <div className='absolute'>
                  <p className='text-white text-center text-[11px] mt-55 md:text-2xl lg:text-xl lg:mt-50' data-aos="fade-up" data-aos-delay='100'>The World's Largest Used Car Dealership</p>
                  <h1 className='text-white mt-5 lg:text-5xl md:text-5xl text-xl' data-aos="fade-up">Find Your perfect Vehical Online</h1>
                </div>
                <img src={Home3} className='h-[100vh] w-full object-cover' alt='home Page' />
              </div>

              {/* select car Type */}
              <div className="bg-black h-full w-full text-white py-6 px-4">
                <h2 className="text-2xl font-semibold my-6 text-center text-rose-400">Select Car Type</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {
                    category.map((category, index) => (
                      <div onClick={() => carCate(category.cat)} key={index} data-aos="fade-up" data-aos-delay='300' className="group border-2 border-gray-700 rounded-xl p-4 hover:shadow-lg hover:border-rose-500 hover:bg-gray-800 transition duration-300 cursor-pointer">
                        <div className="aspect-square overflow-hidden rounded-full bg-gray-800 flex items-center justify-center p-2">
                          <img
                            alt={category.cat}
                            src={category.url}
                            className="h-28 sm:h-32 object-contain group-hover:scale-105 group-hover:brightness-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-center mt-3 font-medium text-gray-300 group-hover:text-rose-400">
                          {category.cat}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='w-full bg-black py-12 px-4 sm:px-6 lg:px-20'>
                <h1 className='text-center text-3xl sm:text-4xl font-bold text-rose-500 mb-12'>Why Choose Us?</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-6xl mx-auto'>
                  {/* Card 1 - Financial Offers */}
                  <div
                    className='bg-[#1f1f22] border border-gray-700 hover:border-rose-500 rounded-xl p-6 shadow-md hover:shadow-rose-700 transition-all duration-300 transform hover:-translate-y-2'
                    data-aos="fade-up" datta-aos-delay='50'
                  >
                    <FaDollarSign className='text-rose-500 bg-gray-800 rounded-full h-14 w-14 p-3 mb-4' />
                    <h3 className='text-xl text-white font-semibold mb-2'>Flexible Financing</h3>
                    <p className='text-gray-400 text-sm'>
                      Get customized loan options, zero down payment plans, and the best interest rates for your dream car.
                    </p>
                  </div>

                  {/* Card 2 - Trusted Dealership */}
                  <div
                    className='bg-[#1f1f22] border border-gray-700 hover:border-rose-500 rounded-xl p-6 shadow-md hover:shadow-rose-700 transition-all duration-300 transform hover:-translate-y-2'
                    data-aos="fade-up" data-aos-delay="200"
                  >
                    <BsShieldCheck className='text-rose-500 bg-gray-800 rounded-full h-14 w-14 p-3 mb-4' />
                    <h3 className='text-xl text-white font-semibold mb-2'>Trusted Dealership</h3>
                    <p className='text-gray-400 text-sm'>
                      With thousands of happy customers and verified reviews, we guarantee a transparent and hassle-free buying experience.
                    </p>
                  </div>

                  {/* Card 3 - Transparent Pricing */}
                  <div
                    className='bg-[#1f1f22] border border-gray-700 hover:border-rose-500 rounded-xl p-6 shadow-md hover:shadow-rose-700 transition-all duration-300 transform hover:-translate-y-2'
                    data-aos="fade-up" data-aos-delay="100"
                  >
                    <GiPriceTag className='text-rose-500 bg-gray-800 rounded-full h-14 w-14 p-3 mb-4' />
                    <h3 className='text-xl text-white font-semibold mb-2'>Transparent Pricing</h3>
                    <p className='text-gray-400 text-sm'>
                      What you see is what you get — no hidden fees, confusing add-ons, or surprise costs at checkout.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        }
        <Outlet />
      </div >

      {/* footer code */}
      <footer className='bg-black text-white w-full py-10 px-6 sm:px-20' >
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* logo & About */}
          <div data-aos='fade-up' data-aos-delay='100'>
            <img src={Logo} className="h-20 object-cover" alt="Logo" />
            <p className="text-gray-400 text-sm">
              AutoMart is the world’s largest used car dealership helping thousands find their perfect vehicle. Trusted since 2010.
            </p>
          </div>

          {/* navigation */}
          <div data-aos='fade-up' data-aos-delay='200'>
            <h3 className='text-rose-500 text-lg font-semibold mb-2'>Quick Links</h3>
            <ul className='text-sm text-white'>
              <li className='hover:text-rose-500 mb-3'><Link to='/home'>Home</Link></li>
              <li className='hover:text-rose-500 mb-3'><Link to='about'>About</Link></li>
              <li className='hover:text-rose-500 mb-3'><Link to='contact'>Contact</Link></li>
              <li className='hover:text-rose-500 mb-3'><Link to='mycar'>My Cars</Link></li>
              <li className='hover:text-rose-500 mb-3'><Link to='carcollection'>Collection</Link></li>
            </ul>
          </div>

          {/* contact */}
          <div className='space-y-2' data-aos='fade-up' data-aos-delay='100'>
            <h3 className='text-rose-400 text-lg font-semibold mb-2'>Contact Us</h3>
            <p className='text-gray-300 text-sm'>support@gmail.com</p>
            <p className='text-gray-300 text-sm'>+91 1234567879</p>
            <p className='text-gray-300 text-sm'>Rajkot, India</p>
          </div>

          {/* Social Media */}
          <div className='' data-aos='fade-up' data-aos-delay='200'>
            <h3 className='text-rose-400 text-lg font-semibold mb-4'>Stay Connected</h3>
            <div className='flex space-x-4 mb-4 text-2xl'>
              <a href="#"><FaFacebookF className='hover:text-rose-500' /></a>
              <a href="#"><FaInstagram className='hover:text-rose-500' /></a>
              <a href="#"><FaTwitter className='hover:text-rose-500' /></a>
            </div>
          </div>

        </div>
        <p className='text-center w-full text-md text-rose-500 mt-8'>&copy;{new Date().getFullYear()} Automart. All rights reserved</p>
      </footer>
    </>
  )
}

export default Home