import React from 'react';
import logo from '../../public/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-gray-200 flex items-center w-full h-16 fixed top-0 left-0 z-50 border-b-2 border-pink-500 px-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-14" 
          />
          <h1 className="hidden md:block text-black font-bold text-xl md:text-2xl lg:text-2xl">
            KIMIMI FABRICS AND ACCESSORIES
          </h1>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
