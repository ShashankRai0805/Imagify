import React, { useState } from 'react';
import GenerateImage from './GenerateImage';

const Hero = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <>
      <section className="text-center py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        {/* Badge */}
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
          <span className="text-sm text-gray-600">Best text to image generator</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Turn text to{' '}
          <span className="text-blue-600">image</span>, in seconds.
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Unleash your creativity with AI. Turn your imagination into visual art in 
          seconds – just type, and watch the magic happen.
        </p>

        {/* CTA Button */}
        <button 
          onClick={() => setShowGenerator(true)}
          className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition mb-12"
        >
          Generate Images
        </button>

        {/* Sample Images */}
        <div className="flex justify-center space-x-2 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
              <img 
                src={`https://picsum.photos/64/64?random=${index}`} 
                alt={`Sample ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Generate Image Modal */}
      {showGenerator && <GenerateImage onClose={() => setShowGenerator(false)} />}
    </>
  );
};

export default Hero;
