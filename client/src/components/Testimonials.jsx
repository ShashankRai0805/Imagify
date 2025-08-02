import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Donald Jackman',
      role: 'Content Creator',
      rating: 5,
      text: 'I\'ve been using imagify for nearly 2 years, primarily for Instagram, and it has been incredibly user-friendly, making my creative process much smoother.',
      avatar: 'https://picsum.photos/50/50?random=1'
    },
    {
      name: 'Richard Nelson',
      role: 'Content Creator', 
      rating: 5,
      text: 'I\'ve been using imagify for nearly 2 years, primarily for Instagram, and it has been incredibly user-friendly, making my creative process much smoother.',
      avatar: 'https://picsum.photos/50/50?random=2'
    },
    {
      name: 'James Washington',
      role: 'Content Creator',
      rating: 5, 
      text: 'I\'ve been using imagify for nearly 2 years, primarily for Instagram, and it has been incredibly user-friendly, making my creative process much smoother.',
      avatar: 'https://picsum.photos/50/50?random=3'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-400 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Customer testimonials
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              {/* Avatar and Info */}
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
