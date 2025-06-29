import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [show, setShow] = useState(false)
  const [Editing, setEditing] = useState(false)

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggeduser')) || null;
    setUserDetails(loggedUser);
  }, []);

  // when click edit data 
  const editClick = (user) =>{
    setEditUser(user)
    setEditing(true)
  }

  // onchange value   
  const editChange = (e) =>{
    const {name, value} = e.target
    setEditUser((prev)=>({...prev, [name] : value}))
  }

  // edit data save user
  const updateUser = (e) =>{
    e.preventDefault();

    //localstorage in loggeduser update
    localStorage.setItem('loggeduser', JSON.stringify(editUser))
    
    //updated user
    let allUser = JSON.parse(localStorage.getItem('users')) || []
    const updated = allUser.map(user=> user.email === userDetails.email ? editUser : user);
    
    //localstorage in users update edited user
    localStorage.setItem('users', JSON.stringify(updated))
    setUserDetails(editUser)
    setEditing(false)
  }

  return (
    <div className="h-full py-22 w-full bg-gradient-to-br from-black via-[#2b2b2e] to-black flex justify-center items-center px-4">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 my-1 w-full max-w-md text-white border border-rose-400/30">
        {/* ✅ Working Avatar with Rose Glow and Animation */}
        <div className="flex justify-center mb-6 animate-float">
          <img
            src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>

        <h2 className="text-2xl font-extrabold text-center mb-1 animate-fade-in-up">Welcome!</h2>
        <p className="text-sm text-center text-gray-300 mb-6">Profile Overview</p>

        {!Editing && userDetails ? (
          <>
            <div className="space-y-5 text-base animate-fade-in-up transition-all duration-500 ease-out">
              <div className="flex justify-between border-b border-gray-700 pb-2 animate-fade-in-up transition-all duration-500 ease-out">
                <span className="text-gray-400">👤 Name</span>
                <span className="text-rose-200 font-medium">{userDetails.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2 animate-fade-in-up transition-all duration-500 ease-out">
                <span className="text-gray-400">📧 Email</span>
                <span className="text-rose-200 font-medium">{userDetails.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2 animate-fade-in-up transition-all duration-500 ease-out">
                <span className="text-gray-400">🛡️ Role</span>
                <span className="text-rose-200 font-medium capitalize">{userDetails.role}</span>
              </div>

              <div className="pt-4 text-center">
                <button onClick={() => editClick(userDetails)} className="px-6 py-2 bg-rose-600 hover:bg-rose-700 transition rounded-md font-semibold text-white shadow-md">
                  Update Profile
                </button>
              </div>
            </div>
          </>
        ) :
          (
            <div className='my-5.5'>
              <form onSubmit={updateUser} className='space-y-3 animate-fade-in-up transition-all duration-500 ease-out'>
                {/* name */}
                <div className='relative'>
                  <input
                    type="text"
                    name="name"
                    value={editUser.name}
                    onChange={editChange}
                    className='peer w-full px-3 pb-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                    required
                  />
                </div>

                {/* email */}
                <div className='relative'>
                  <input type="email"
                    name="email"
                    value={editUser.email}
                    onChange={editChange}
                    className='peer w-full px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                    required
                  />
                </div>

                {/* password */}
                <div className='relative'>
                  {/* password */}
                  <div className='relative'>
                    <input
                      type={show ? 'text' : 'password'}
                      name='password'
                      value={editUser.password}
                      onChange={editChange}
                      className='peer w-full px-3 pt-2 pb-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                      placeholder=' '
                      required
                    />
                    <span
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer'
                      onClick={() => setShow(!show)}
                    >
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                {/* save button */}
                <div className='w-full flex gap-3'>
                  <button type='submit' className='bg-purple-600 w-full hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300'>Update</button>
                  <button type='button' className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition" onClick={()=> setEditing(false)}> Cancel </button>
                </div>
              </form>
            </div>
          )}
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Profile;