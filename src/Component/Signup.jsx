import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    conformpass: '',
  });
  const [err, setErr] = useState('');
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const SignupUser = (e) => {
    e.preventDefault();
    const passwordRangeX = /^(?=.*[A-z])(?=.*[a-z])(?=.*[\W_]).{6,}$/;

    if (!passwordRangeX.test(user.password)) {
      setErr('Password must contain:\n• one uppercase\n• one lowercase\n• one number\n• one special character\n• at least 6 characters');
      return;
    }

    if (user.password !== user.conformpass) {
      setErr('password and conform password not match please Re-Enter the Password');
    }

    //get user
    const getUser = JSON.parse(localStorage.getItem('users')) || []
    const existUser = getUser.find(u => u.email === user.email)
    // const existUser = user.find(u=> console.log(u.email))

    if (existUser) {
      alert('user already signup please log in.')
      return navigate('/login');
    } else {
      // create a new user
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      }
      getUser.push(newUser)
    }
    
    localStorage.setItem('users', JSON.stringify(getUser))
    localStorage.setItem('role', user.role)

    alert('signup successfully...! Redirecting.....!')

    if (user.role === 'admin') {
      navigate('/dashboard');
    }
    else if (user.role === 'user') {
      navigate('/home')
    }
    else {
      navigate('/login')
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-orange-400 p-4 animate-fadeIn'>
      <div className='bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg transition-all duration-500'>
        <h1 className='text-3xl font-bold text-center mb-8 text-purple-700'>Sign-Up</h1>

        <form onSubmit={SignupUser} className='flex flex-col gap-6'>

          {/* Name */}
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer rounded-md"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600 peer-focus:bg-white"
            >
              Name
            </label>
          </div>


          {/* Email */}
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
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

          {/* Role Toggle */}
          <div>
            <label className='block text-sm mb-2 font-medium text-gray-700'>Select Role</label>
            <div className='flex items-center gap-4 mx-5'>
              <span className={`text-sm font-medium ${user.role === 'user' ? 'text-purple-700' : 'text-gray-500'}`}>
                User
              </span>
              <div
                className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${user.role === 'admin' ? 'bg-purple-600' : 'bg-gray-300'}`}
                onClick={() => {
                  setUser((prev) => ({
                    ...prev, role: prev.role === 'admin' ? 'user' : 'admin'
                  }))
                }}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${user.role === 'admin' ? 'translate-x-7' : 'translate-x-0'}`}
                />
              </div>
              <span className={`text-sm font-medium ${user.role === 'admin' ? 'text-purple-700' : 'text-gray-500'}`}>
                Admin
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full group">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={handleChange}
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

          <p className='text-center text-red-800 w-full'>{err}</p>

          {/* Confirm Password */}
          <div className="relative z-0 w-full group">
            <input
              type={showPass ? 'text' : 'password'}
              name="conformpass"
              value={user.conformpass}
              onChange={handleChange}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer rounded-md"
              placeholder=" "
              required
            />
            <label
              htmlFor="conformpass"
              className="absolute text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600 peer-focus:bg-white"
            >
              Confirm Password
            </label>
            <span
              className="absolute top-2/4 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p className='text-center text-red-800 w-full'>{err}</p>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300'
          >
            Submit
          </button>
          <Link to='/login' className='text-center'>You have alreay an Account?<span className='text-purple-800 font-semibold underline'>Log In</span></Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;