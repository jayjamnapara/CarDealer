import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaUserEdit } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([])
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [selectIndex, setSelectIndex] = useState(null)
  const [show, setShow] = useState(false)

  // get user data
  useEffect(() => {
    const getUser = (() => {
      try {
        const data = JSON.parse(localStorage.getItem('users'))
        return Array.isArray(data) ? data : []
      }
      catch {
        return []
      }
    })() // Immediately invoke the function
    setUserDetails(getUser)
  }, [])

  // delete data
  const deleteUser = (indexToDelete) => {
    const updateUser = userDetails.filter((_, index) => index !== indexToDelete)
    setUserDetails(updateUser)
    localStorage.setItem('users', JSON.stringify(updateUser))
  }

  // edit data
  const editClick = (user, index) => {
    setEditUser(user)
    setSelectIndex(index)
  }

  const editChange = (e) => {
    const { name, value } = e.target
    setEditUser((prev) => ({ ...prev, [name]: value }))
  }

  const editSave = (e) => {
    e.preventDefault();
    const updateUser = [...userDetails];
    updateUser[selectIndex] = { ...updateUser[selectIndex], ...editUser }
    setUserDetails(updateUser)
    localStorage.setItem('users', JSON.stringify(updateUser))
    setSelectIndex(null)
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {userDetails.map((item, index) => (
        <div
          key={index}
          className={`w-72 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 ${item.role === 'user'
            ? 'bg-gradient-to-br from-pink-100 to-purple-200 ring-4 ring-purple-400'
            : 'bg-white ring-4 ring-gray-600'
            }`}
        >
          {/* Avatar */}
          <div className="flex justify-center pt-6">
            <img
              src={
                item.role === 'user' ? 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
              }
              alt="User"
              className={`rounded-full ${item.role === 'user' ? 'w-24 h-24' : 'w-20 h-20 mt-4'} shadow-md border-4 border-white`}
            />
          </div>

          <div className='p-4 text-center'>
            {
              selectIndex === index ? (
                <form onSubmit={editSave} className='space-y-3 animate-fade-in-up transition-all duration-500 ease-out'>
                  {/* name */}
                  <div className='relavtive'>
                    <input
                      type="text"
                      name='name'
                      value={editUser.name}
                      onChange={editChange}
                      className='peer w-full px-3 pb-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                      required
                    />  
                  </div>

                  {/* Email */}
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      value={editUser.email}
                      onChange={editChange}
                      className='peer w-full px-3 pt-2 pb-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                      placeholder=' '
                      required
                    />
                  </div>

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

                  {/* save Button */}
                  <div>
                    <button onClick={editSave} className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300'>Save</button>
                  </div>
                </form>
              ) :
                (
                  <>
                    <div className="p-4 text-center animate-fade-in-up transition-all duration-500 ease-out">
                      <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                      <p className="text-sm text-gray-600 mt-1">{item.email}</p>
                      <p
                        className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.role === 'admin'
                          ? 'bg-red-200 text-red-500'
                          : 'bg-blue-200 text-blue-500'
                          }`}
                      >
                        {item.role}
                      </p>
                    </div>
                  </>
                )
            }
          </div>

          <div className='w-full rounded-xl px-2 mb-3 flex justify-between'>
            {
              item.role === 'admin' && (
                <button onClick={() => { editClick(item, index) }} className='mx-2 bg-blue-300 p-2 text-center rounded-full text-blue-900 duration-300 hover:scale-110'><FaUserEdit size={25} /></button>
              )
            }
            <button onClick={() => { deleteUser(index) }} className='mx-2 bg-red-400 p-2 text-center rounded-full text-rose-900 duration-300 hover:scale-110'><FiTrash size={25} /></button>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default UserDetails;