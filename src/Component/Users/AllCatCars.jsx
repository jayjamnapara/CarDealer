import React from 'react';
import { useNavigate } from 'react-router-dom'

const AllCatCars = ({CarData}) => {
    const navigate = useNavigate();

    // onclick car store in localstorage 
    const saveMycar = (Car) => {
        const savedCar = JSON.parse(localStorage.getItem('saveCar')) || []
        const saveCar = savedCar.find((item) => item.id === Car.id)
        //multiple car store
        if (!saveCar) {
            const updateCars = [...savedCar, Car];
            //save in localstorage
            localStorage.setItem('saveCar', JSON.stringify(updateCars))
            alert('carSave Into localstorage.')
        }
        else {
            alert('This car is already saved.');
        }
    }

    // Car Deatils find
    const carDetails = (id) => {
        // console.log(id)
        const carDetails = CarData.find((item) => item.id === id)
        if (!carDetails) {
            alert('Car not Details not Availble.')
            // return false;
        }
        else {
            navigate(`../cardetails/${id}`)
        }
    }

    return (
        <div className='p-8 w-full bg-black min-h-screen text-white'>
            {
                CarData.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {CarData.map((item, index) => (
                            <div key={index} className='bg-[#1f1f22] hover:bg-[#2a2a2d] border border-gray-700 hover:border-rose-500 transition-all duration-300 rounded-xl shadow-lg p-5 flex flex-col justify-between'>
                                <div onClick={()=>carDetails(item.id)} data-aos='fade-up' data-aos-delay={index * 100}>
                                    {/* Image render */}
                                    <img src={item.image} alt={item.name} className="h-48 w-full object-cover rounded-lg mb-4" />
                                    {/* car name + type */}
                                    <div className='mb-2'>
                                        <h3 className='text-2xl font-semibold text-white'>{item.name}</h3>
                                        <p className='text-sm text-gray-400'>{item.type}</p>
                                    </div>
                                    {/* Fuel + ratings badges */}
                                    <div className='flex items-center space-x-3 mb-3'>
                                        <span className="px-2 py-1 text-xs font-semibold bg-rose-500 text-white rounded-full">
                                            {item.fuelType}
                                        </span>
                                        <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-black rounded-full">
                                            ⭐ {item.ratings}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-semibold text-black rounded-full ${item.availability === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}>
                                            {item.availability}
                                        </span>
                                    </div>
                                    {/* Specs */}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                                        <p><span className="font-medium text-white">Brand:</span> {item.brand}</p>
                                        <p><span className="font-medium text-white">Mileage:</span> {item.milage}</p>
                                        <p><span className="font-medium text-white">Color:</span> {item.color}</p>
                                        <p><span className="font-medium text-white">Type:</span> {item.type}</p>
                                    </div>
                                    {/* Price */}
                                    <div className="mt-auto">
                                        <p className="text-lg font-bold text-rose-500">₹{item.price}</p>
                                    </div>
                                </div>
                                {/* button to save */}
                                <button
                                    onClick={() => saveMycar(item)}
                                    data-aos='fade-up' data-aos-delay={index * 100}
                                    className='py-3 mt-5 px-10 rounded-full bg-gradient-to-tl from-rose-500 via-red-700 to-rose-500 
                                    hover:bg-gradient-to-bl hover:from-rose-500 hover:via-red-700 hover:to-rose-500 transition-colors duration-300'>
                                    Save Car
                                </button>
                            </div>
                        ))}
                    </div>
                )
                    :
                    (
                        <>
                            <p className="text-center text-gray-500 text-lg" data-aos="fade-up" data-aos-delay="200">
                                No cars found in this category.
                            </p>
                        </>
                    )
            }
        </div>
    )
}

export default AllCatCars