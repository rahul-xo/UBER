import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { captainDataContext } from "../Context/captainContext";
import { useNavigate } from "react-router-dom";

const RegisterCaptain = () => {
  const navigate=useNavigate();
  const [captain,setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      vehicleType: "",
      vehiclePlate: "",
      vehicleCapacity: "",
      vehicleColor: "",
    },
  });

  const {captainData,setCaptainData}=useContext(captainDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setCaptain((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value,
        },
      }));
    } else if (
      name === "vehicleType" ||
      name === "vehiclePlate" ||
      name === "vehicleCapacity" ||
      name === "vehicleColor"
    ) {
      setCaptain((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setCaptain((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const Captain={
      fullname: captain.fullname,
      email: captain.email,
      password: captain.password,
      vehicle:{
        vehicleType: captain.vehicle.vehicleType,
        plate: captain.vehicle.vehiclePlate,
        capacity: captain.vehicle.vehicleCapacity,
        color: captain.vehicle.vehicleColor,
      },
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,Captain);
    if(response.status===201){
      const data=response.data;
      setCaptainData(data.captain);
      localStorage.setItem("captainToken",data.token);
      navigate('/captainDashboard'); 
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <h1 className="text-3xl font-semibold text-gray-800 text-center tracking-tighter">
          Create a Captain Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-[15px] font-semibold text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="John"
                value={captain.fullname.firstname}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-[15px] font-semibold text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Doe"
                value={captain.fullname.lastname}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[15px] font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={captain.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[15px] font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={captain.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2 border-t pt-4">
              Vehicle Information
            </h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="vehicleType"
                    className="block text-[15px] font-semibold text-gray-700 mb-1"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={captain.vehicle.vehicleType}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="car">car</option>
                    <option value="motorcycle">bike</option>
                    <option value="auto">auto</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="vehiclePlate"
                    className="block text-[15px] font-semibold text-gray-700 mb-1"
                  >
                    Plate No.
                  </label>
                  <input
                    id="vehiclePlate"
                    name="vehiclePlate"
                    type="text"
                    placeholder="UP80XY1234"
                    value={captain.vehicle.vehiclePlate}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="vehicleCapacity"
                    className="block text-[15px] font-semibold text-gray-700 mb-1"
                  >
                    Capacity
                  </label>
                  <input
                    id="vehicleCapacity"
                    name="vehicleCapacity"
                    type="number"
                    placeholder="e.g., 4"
                    value={captain.vehicle.vehicleCapacity}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="vehicleColor"
                    className="block text-[15px] font-semibold text-gray-700 mb-1"
                  >
                    Color
                  </label>
                  <input
                    id="vehicleColor"
                    name="vehicleColor"
                    type="text"
                    placeholder="e.g., Black"
                    value={captain.vehicle.vehicleColor}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-2 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              Register as Captain
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/loginCaptain"
            className="font-medium text-indigo-600 hover:underline transition-colors duration-200"
          >
            Login
          </NavLink>
        </p>
      </div>

      <NavLink
        to="/loginUser"
        className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Sign in as User
      </NavLink>
    </div>
  );
};

export default RegisterCaptain;

