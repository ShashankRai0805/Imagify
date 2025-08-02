import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: '💭',
      title: 'Describe Your Vision',
      description: 'Write a text description of the image you want to create.'
    },
    {
      icon: '✨',
      title: 'Watch the Magic',
      description: 'Our AI processes your text and creates the image in seconds.'
    },
    {
      icon: '⬇️',
      title: 'Download & Share',
      description: 'Download your generated image and share it with the world.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How it works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
