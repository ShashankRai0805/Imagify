import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Login from './Login';

const Header = () => {
  const { user, logout, credits } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">I</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">imagify</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-800">How it works</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-800">Testimonials</a>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hello {user.name}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Credits: {credits}
                </span>
              </div>
              <button 
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setShowLogin(true)}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
