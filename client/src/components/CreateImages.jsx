import React from 'react';

const CreateImages = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Create AI Images
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img 
              src="https://picsum.photos/500/400?random=7" 
              alt="AI Generated cake"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm mb-4">
              New
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Introducing the AI-Powered Text to Image Generator
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Easily bring your ideas to life with our free AI image generator. 
              Whether you need stunning visuals or unique imagery, our tool 
              transforms your text into eye-catching images with just a few clicks. 
              Imagine it, describe it, and watch it come to life instantly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Simply type in a text prompt, and our cutting-edge AI will generate 
              high-quality images in seconds. From product visuals to creative concepts, 
              make your vision a reality effortlessly. Start creating today and 
              see the future of digital imagery in action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateImages;
