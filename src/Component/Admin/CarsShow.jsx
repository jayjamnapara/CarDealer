import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaUserEdit } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'

const CarsShow = () => {
  const [carData, setCarData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const handleGetData = () => {
    axios
      .get('http://localhost:3030/CarDetails')
      .then((res) => {
        setCarData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are You Sure You Want to Delete This Car?')) {
      axios.delete(`http://localhost:3030/CarDetails/${id}`)
        .then(() => {
          handleGetData() // after delete automatically refresh 
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    handleGetData()
    if (location.state?.updated) {
      alert("Car updated successfully.")
      // Clear the state after showing the alert
      navigate(location.pathname, { replace: true })
    }
  }, [location])

  return (
    <>
      {/* Add Car Button */}
      <div className="w-full flex justify-end px-5">
        <Link to="/dashboard/addcar">
          <button className="px-6 py-3 mt-5 bg-rose-500  hover:shadow-rose-500/85 transition duration-300 rounded-full font-semibold text-white shadow-md">
            Add Car
          </button>
        </Link>
      </div>

      {/* Car Data Table */}
      <div className="p-4">
        {/* Table for Medium and Larger Screens */}
        <div className="hidden md:block bg-white shadow-lg rounded-xl border border-gray-200 overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gradient-to-r from-sky-500 to-sky-700 text-white">
              <tr>
                <th className="px-5 py-3 uppercase font-semibold">Image</th>
                <th className="px-5 py-3 uppercase font-semibold">Name</th>
                <th className="px-5 py-3 uppercase font-semibold">Model</th>
                <th className="px-5 py-3 uppercase font-semibold">Brand</th>
                <th className="px-5 py-3 uppercase font-semibold">Type</th>
                <th className="px-5 py-3 uppercase font-semibold">Rating</th>
                <th className="px-5 py-3 uppercase font-semibold">Price</th>
                <th className="px-5 py-3 uppercase font-semibold">Year</th>
                <th className="px-5 py-3 uppercase font-semibold">Fuel</th>
                <th className="px-5 py-3 uppercase font-semibold">Milage</th>
                <th className="px-5 py-3 uppercase font-semibold">Transmission</th>
                <th className="px-5 py-3 uppercase font-semibold">Availability</th>
                <th className="px-5 py-3 uppercase font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {carData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-300">
                  <td className="px-5 py-4">
                    <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded-lg shadow-sm border" />
                  </td>
                  <td className="px-5 py-4">{item.name}</td>
                  <td className="px-5 py-4">{item.model}</td>
                  <td className="px-5 py-4">{item.brand}</td>
                  <td className="px-5 py-4">{item.type}</td>
                  <td className="px-5 py-4">{item.ratings} ⭐</td>
                  <td className="px-5 py-4 font-semibold text-green-700">₹{item.price}</td>
                  <td className="px-5 py-4">{item.year}</td>
                  <td className="px-5 py-4">{item.fuelType}</td>
                  <td className="px-5 py-4">{item.milage} km/l</td>
                  <td className="px-5 py-4">{item.transmission}</td>
                  <td className='px-5 py-4'>{item.availability}</td>
                  <td className="px-5 py-4 flex">
                    <Link to={`/dashboard/editcar/${item.id}`}>
                      <button className="mx-2 bg-blue-300 p-2 rounded-full text-blue-900 duration-300 hover:scale-110"><FaUserEdit size={20} /></button>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="mx-2 bg-red-400 p-2 rounded-full text-rose-900 duration-300 hover:scale-110"><FiTrash size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Small Screens */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {carData.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-28 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.brand} - {item.model} ({item.year})</p>
                  <p className="text-sm text-gray-500">₹{item.price} • {item.fuelType} • {item.transmission}</p>
                  <p className="text-sm text-gray-500">Mileage: {item.milage} km/l • Rating: {item.ratings}⭐</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <Link to={`/dashboard/editcar/${item.id}`}>
                  <button className="bg-blue-100 px-3 py-1 rounded-full text-blue-800"><FaUserEdit /></button>
                </Link>
                <button onClick={() => handleDelete(item.id)} className="bg-red-100 px-3 py-1 rounded-full text-red-800"><FiTrash /></button>
              </div>
            </div>
          ))}

          {carData.length === 0 && (
            <div className="text-center py-10 text-gray-500 font-semibold">
              No cars found in database.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CarsShow