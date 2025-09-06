import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 

const LoginUser = () => {
  // State for email and password fields
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: user.email,
      password: user.password,
    };
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center tracking-tight">
          Login as User
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-[15px] font-semibold text-gray-700 mb-1"
            >
              What's your email?
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>

          {/* Password Input */}
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
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full mt-2 p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              Login
            </button>
          </div>
        </form>
        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <NavLink
            to="/registerUser"
            className="font-medium text-indigo-600 hover:underline transition-colors duration-200"
          >
            Create an account
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

export default LoginUser;

