import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative h-screen w-full bg-[url('./images/Hoprr.png')] bg-cover bg-center text-black">
      {/* Logo */}
      <div className="p-4">
        <img 
          src="./Logo/Hoprrr.png" 
          alt="Hoprrr Logo" 
          className="w-24"
        />
      </div>

      {/* Bottom Card */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="bg-white rounded-t-3xl shadow-lg px-4 py-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold tracking-wide mb-3 text-center">
            Get Started with <span className="text-black font-bold">Hoprr</span>
          </h2>
          <button className="bg-black cursor-pointer text-white text-sm font-medium py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-200">
            <NavLink to="/loginUser">Continue</NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
