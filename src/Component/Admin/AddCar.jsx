import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [carData, setCarData] = useState({
    image: '',
    name: '',
    model: '',
    brand: '',
    type: '',
    ratings: '',
    price: '',
    year: '',
    fuelType: '',
    milage: '',
    color: '',
    transmission: '',
    availability: '', // "Available" or "Sold Out"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCarData({ ...carData, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const submitCar = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/CarDetails', carData)
      .then(() => {
        alert('Car added successfully!');
        setCarData({
          image: '',
          name: '',
          model: '',
          brand: '',
          type: '',
          ratings: '',
          price: '',
          year: '',
          fuelType: '',
          milage: '',
          color: '',
          transmission: '',
          availability: '',
        });
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-lg bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🚘 Add New Car</h2>
        <form onSubmit={submitCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Image */}
          <div className="col-span-full">
            <label className="block mb-1 text-gray-700 font-medium">Car Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Text Inputs */}
          {[
            { label: 'Car Name', name: 'name' },
            { label: 'Model', name: 'model' },
            { label: 'Brand Name', name: 'brand' },
            { label: 'Type', name: 'type' },
            { label: 'Ratings (out of 5)', name: 'ratings' },
            { label: 'Price', name: 'price' },
            { label: 'Manufacture Year', name: 'year' },
            { label: 'Mileage', name: 'milage' },
            { label: 'Color', name: 'color' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-1 text-gray-700 font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={carData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
                required
              />
            </div>
          ))}

          {/* Fuel Type */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Fuel Type</label>
            <select
              name="fuelType"
              value={carData.fuelType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
              required
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="EV">EV</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Transmission</label>
            <select
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
              required
            >
              <option value="">Select</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Availability</label>
            <select
              name="availability"
              value={carData.availability}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-md bg-gray-50 text-gray-800"
              required
            >
              <option value="">Select</option>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>

          {/* Submit */}
          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md transition duration-200"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;