import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';

const CarCatShow = () => {
  const { cat } = useParams();
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800 });

    axios.get(`http://localhost:3030/CarDetails?type=${cat}`)
      .then((res) => {
        // const resData = res.data;
        // const CarArray = Array.isArray(resData) ? resData : [resData];
        // setCar(CarArray);
        setCar(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [cat]);

  // Car Deatils find
  const carDetails = (id) => {
    // console.log(id)
    const carDetails = car.find((item) => item.id === id)
    if (!carDetails) {
      alert('Car not Details not Availble.')
      // return false;
    }
    else {
      navigate(`../cardetails/${id}`)
    }
  }

  // onclick car store in localstorage 
  const saveMycar = (Car) => {
    const savedCar = JSON.parse(localStorage.getItem('saveCar')) || []
    const saveCar = savedCar.find((item) => item.id === Car.id)
    //multiple car store
    if(!saveCar){
      const updateCars = [...savedCar, Car];
      //save in localstorage
      localStorage.setItem('saveCar', JSON.stringify(updateCars))
      alert('carSave Into localstorage.')
    }
    else{
      alert('This car is already saved.');
    }
  }

  if (loading) {
    return (
      <div
        className="text-white text-center py-16 text-2xl font-semibold"
        data-aos="zoom-in"
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 w-full bg-black min-h-screen text-white">
      {/* Page Heading */}
      <h2
        className="text-4xl text-center font-bold text-rose-600 mb-10"
        data-aos="fade-down"
      >
        {cat} Cars
      </h2>

      {/* Car Grid */}
      {car.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {car.map((Car, index) => (
            <div key={index} className="bg-[#1f1f22] hover:bg-[#2a2a2d] border border-gray-700 hover:border-rose-500 transition-all duration-300 rounded-xl shadow-lg p-5 flex flex-col justify-between">
              <div
                onClick={() => { carDetails(Car.id) }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <img
                  src={Car.image}
                  alt={Car.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />

                {/* Car name + type */}
                <div className="mb-2">
                  <h3 className="text-2xl font-semibold text-white">{Car.name}</h3>
                  <p className="text-sm text-gray-400">{Car.type}</p>
                </div>

                {/* Fuel + Rating badges */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-2 py-1 text-xs font-semibold bg-rose-500 text-white rounded-full">
                    {Car.fuelType}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-black rounded-full">
                    ⭐ {Car.ratings}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold text-black rounded-full ${Car.availability === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {Car.availability}
                  </span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                  <p><span className="font-medium text-white">Brand:</span> {Car.brand}</p>
                  <p><span className="font-medium text-white">Mileage:</span> {Car.milage}</p>
                  <p><span className="font-medium text-white">Color:</span> {Car.color}</p>
                  <p><span className="font-medium text-white">Type:</span> {Car.type}</p>
                </div>

                {/* Price */}
                <div className="mt-auto">
                  <p className="text-lg font-bold text-rose-500">₹{Car.price}</p>
                </div>
              </div>
              {/* button */}
              <button
                onClick={() => saveMycar(Car)}
                data-aos='fade-up' data-aos-delay='400'
                className='py-3 mt-5 px-10 rounded-full bg-gradient-to-tl from-rose-500 via-red-700 to-rose-500 
                    hover:bg-gradient-to-bl hover:from-rose-500 hover:via-red-700 hover:to-rose-500 transition-colors duration-300'>
                Save Car
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-center text-gray-500 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          No cars found in this category.
        </p>
      )
      }
    </div >
  );
};

export default CarCatShow;