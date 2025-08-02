import React, { useState } from 'react';
import GenerateImage from './GenerateImage';

const CallToAction = () => {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <>
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            See the magic. Try now
          </h2>
          
          <button 
            onClick={() => setShowGenerator(true)}
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition"
          >
            Start creating for free
          </button>
        </div>
      </section>

      {/* Generate Image Modal */}
      {showGenerator && <GenerateImage onClose={() => setShowGenerator(false)} />}
    </>
  );
};

export default CallToAction;
