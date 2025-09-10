import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

const RegisterUser = () => {
  const {  setUserData } = useContext(UserDataContext);
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setUser((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,user);
      if(response.status===201){
        const data=response.data;
        setUserData(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home');
      }
    } catch (error) {
      
    }
    setUser({
      fullname: { firstname: "", lastname: "" },
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <h1 className="text-3xl font-semibold text-gray-800 text-center tracking-tight">
          Create an Account
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
                value={user.fullname.firstname}
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
                value={user.fullname.lastname}
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
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-2 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/loginUser"
            className="font-medium text-indigo-600 hover:underline transition-colors duration-200"
          >
            Login
          </NavLink>
        </p>
      </div>

      <NavLink
        to="/loginCaptain"
        className="mt-6 px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Sign in as Captain
      </NavLink>
    </div>
  );
};

export default RegisterUser;
