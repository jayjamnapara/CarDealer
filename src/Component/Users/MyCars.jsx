import React, { useEffect, useState } from 'react'
import { FiPhoneCall, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MyCars = () => {
  const [myCars, setMyCars] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    //get data from localStorage
    const saveCars = JSON.parse(localStorage.getItem('saveCar')) || []
    // console.log(saveCars)
    setMyCars(saveCars)
  }, [])

  //onclick show the car details
  const carDetails = (id) => {
    const carDetails = myCars.find(item => item.id === id)
    if (!carDetails) {
      alert('car Details is not Available.')
    }
    else {
      navigate(`../cardetails/${id}`);
    }
  }

  // onclick delete car
  const deleteData = (id) => {
    const dltid = myCars.filter(item => item.id !== id)
    localStorage.setItem('saveCar', JSON.stringify(dltid))
    setMyCars(dltid)
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-black via-[#2b2b2e] to-black flex justify-center items-center text-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10'>
        {
          myCars.map((CarItem, index) => (
            <div key={index} className="bg-[#1f1f22] hover:bg-[#2a2a2d] border border-gray-700 hover:border-rose-500 transition-all duration-300 rounded-xl shadow-lg p-5 flex flex-col justify-between">
              <div
                onClick={() => { carDetails(CarItem.id) }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <img
                  src={CarItem.image}
                  alt={CarItem.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />

                {/* Car name + type */}
                <div className="mb-2">
                  <h3 className="text-2xl font-semibold text-white">{CarItem.name}</h3>
                  <p className="text-sm text-gray-400">{CarItem.Type}</p>
                </div>

                {/* Fuel + Rating badges */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-2 py-1 text-xs font-semibold bg-rose-500 text-white rounded-full">
                    {CarItem.fuelType}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-black rounded-full">
                    ⭐ {CarItem.ratings}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold text-black rounded-full ${CarItem.availability === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {CarItem.availability}
                  </span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                  <p><span className="font-medium text-white">Brand:</span> {CarItem.brand}</p>
                  <p><span className="font-medium text-white">Mileage:</span> {CarItem.milage}</p>
                  <p><span className="font-medium text-white">Color:</span> {CarItem.color}</p>
                  <p><span className="font-medium text-white">Type:</span> {CarItem.type}</p>
                </div>

                {/* Price */}
                <div className="mt-auto">
                  <p className="text-lg font-bold text-rose-500">₹{CarItem.price}</p>
                </div>
              </div>

              {/* button */}
              <div className='flex justify-center'>
                <button onClick={() => { deleteData(CarItem.id) }}
                  className='py-3 px-6 mt-5 flex justify-center mx-auto rounded-full border-2 border-rose-800
                hover:bg-gradient-to-bl hover:from-rose-500 hover:via-red-800 to-rose-500 transition-all duration-300'
                  data-aos="fade-up" data-aos-delay='300'>
                  <span
                    className='hover:scale-105 flex items-center gap-2 transition-all duration-300'>
                    <FiTrash className='transition-all duration-300' /> 
                    <span className='hidden lg:block md:block'>Delete</span>
                  </span>
                </button>
                <button
                  className='py-3 px-6 mt-5 flex justify-center mx-auto rounded-full border-2 border-green-800
                hover:bg-gradient-to-bl hover:from-green-500 hover:via-green-800 to-green-500 transition-all duration-300'
                  data-aos="fade-up" data-aos-delay='300'>
                  <span
                    className='hover:scale-105 flex items-center gap-2 transition-all duration-300'>
                    <FiPhoneCall className='transition-all duration-300' /> 
                    <span className='hidden lg:block md:block'>Contact</span>
                  </span>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyCars