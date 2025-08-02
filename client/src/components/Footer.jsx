import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">I</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">imagify</span>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-600 mb-4 md:mb-0">
          Copyright @imagify.com | All right reserved.
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <span className="text-gray-600">f</span>
          </a>
          <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <span className="text-gray-600">t</span>
          </a>
          <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <span className="text-gray-600">in</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
