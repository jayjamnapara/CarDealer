import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const [editCar, setEditCar] = useState({
    name: '',
    model: '',
    brand: '',
    type: '',
    ratings: '',
    price: '',
    year: '',
    milage: '',
    color: '',
    fuelType: '',
    transmission: '',
    availability: '', // replaces description
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3030/CarDetails/${id}`)
      .then((res) => setEditCar(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCar({ ...editCar, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/CarDetails/${id}`, editCar)
      .then(() => {
        alert('Car updated successfully!');
        navigate('/dashboard/carsshow');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen rounded-lg flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">✏️ Edit Car</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Input */}
          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-1">Car Image</label>
            <input
              type="file"
              disabled
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
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
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={editCar[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
                required
              />
            </div>
          ))}

          {/* Fuel Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Fuel Type</label>
            <select
              name="fuelType"
              value={editCar.fuelType}
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
            <label className="block text-gray-700 font-medium mb-1">Transmission</label>
            <select
              name="transmission"
              value={editCar.transmission}
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
            <label className="block text-gray-700 font-medium mb-1">Availability</label>
            <select
              name="availability"
              value={editCar.availability}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
              required
            >
              <option value="">Select</option>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md transition duration-200"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;