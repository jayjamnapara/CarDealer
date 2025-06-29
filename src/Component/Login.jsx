import React, { useContext, useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    let userData = JSON.parse(localStorage.getItem('users')) || []
    // if (!Array.isArray(userData)) {
    //   userData = [userData]
    // }

    // find user email, password, and role matching
    const userAuth = userData.find(u => u.email === email && u.password === password && u.role === role)

    if (!userAuth) {
      alert('Invalid credential or role mismatch....!');
      return;
    }
    login(userAuth)
    alert('suuccessfully login.....! redirecting.......!')

    // Navigate based on role
    if (userAuth.role === 'user') {
      navigate('/home');
    } else if (userAuth.role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-orange-400 p-4 animate-fadeIn'>
      <div className='bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-500'>
        <h2 className='text-3xl font-bold text-center mb-4 text-purple-700'>Welcome Back</h2>
        <p className='text-md text-center text-gray-500 mb-5'>Please Log In to your Account!</p>
        <form className='space-y-8' onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setemail(e.target.value) }}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer rounded-md"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600 peer-focus:bg-white"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full group">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer rounded-md"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600 peer-focus:bg-white"
            >
              Password
            </label>
            <span
              className="absolute top-2/4 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* role toggle */}
          <div>
            <div className='flex justify-center items-center gap-4 mx-5'>
              <span className={`text-sm font-medium ${role === 'user' ? 'text-purple-700' : 'text-gray-500'}`}>
                User
              </span>
              <div
                className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${role === 'admin' ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => {
                  setRole(prev => (prev === 'admin' ? 'user' : 'admin'))
                }}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${role === 'admin' ? 'translate-x-7' : 'translate-x-0'}`}
                />
              </div>
              <span className={`text-sm font-medium ${role === 'admin' ? 'text-purple-700' : 'text-gray-500'}`}>
                Admin
              </span>
            </div>
          </div>

          <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300'>Login</button>
          <Link to='/'> <p className='w-full text-center'>You have no account? <span className='text-purple-800 underline font-semibold'>Sign up</span></p> </Link>
        </form>
      </div>
    </div>
  )
}

export default Login