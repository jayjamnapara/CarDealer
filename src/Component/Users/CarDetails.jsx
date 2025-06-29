import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCarSide, FaGasPump, FaCalendarAlt, FaPalette, FaCogs, FaTachometerAlt, FaStar, FaRupeeSign, FaIndustry, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCarData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3030/CarDetails/${id}`)
      .then((res) => setCarData(res.data))
      .catch((err) => console.log(err));

    AOS.init({ duration: 1000 });
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-black px-4 py-12 flex items-center justify-center">
      <div
        className="w-full max-w-6xl bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all"
        data-aos="fade-up"
      >
        {/* Car Image Section */}
        <div className="relative">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover lg:rounded-l-3xl"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full p-6">
            <h2 className="text-white text-3xl font-bold">{car.name}</h2>
            <p className="text-rose-400 text-sm">{car.model} • {car.brand}</p>
          </div>
        </div>

        {/* Car Details Section */}
        <div className="p-8 text-white space-y-6">
          <h3 className="text-2xl font-semibold mb-4 border-b border-white/20 pb-2">Specifications</h3>

          <div className="grid grid-cols-2 gap-6 text-sm md:text-base">
            <Detail icon={<FaIndustry />} label="Brand" value={car.brand} />
            <Detail icon={<FaCarSide />} label="Type" value={car.type} />
            <Detail icon={<FaStar />} label="Ratings" value={`${car.ratings} ⭐`} />
            <Detail icon={<FaRupeeSign />} label="Price" value={`₹${car.price}`} />
            <Detail icon={<FaCalendarAlt />} label="Year" value={car.year} />
            <Detail icon={<FaGasPump />} label="Fuel" value={car.fuelType} />
            <Detail icon={<FaTachometerAlt />} label="Mileage" value={`${car.milage} km/l`} />
            <Detail icon={<FaPalette />} label="Color" value={car.color} />
            <Detail icon={<FaCogs />} label="Transmission" value={car.transmission} />
            <Detail
              icon={
                car.availability === 'Available' ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )
              }
              label="Availability"
              value={car.availability}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail component
const Detail = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <span className="text-rose-500 text-xl">{icon}</span>
    <p className="text-white/90">
      <span className="text-gray-400">{label}:</span> {value}
    </p>
  </div>
);

export default CarDetails;