import React, { useState } from 'react';

const testimonials = [
  {
    name: 'Maya Santos',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Jake Paulin',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Nick Adelman',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Maya Santos',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Jake Paulin',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Nick Adelman',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
];

const styleSheet = `
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
`;

const scrollAnimationStyle = {
  animation: 'scrollLeft 8s linear infinite',
};

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const testimonialsForScroll = [...testimonials, ...testimonials];

  const scrollAnimationStyle = {
    animation: 'scrollLeft 8s linear infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    willChange: 'transform',
  };

  return (
    <>
      <style>{styleSheet}</style>
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">
          What Our Students Say
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-12 text-center mb-8">
          Ut eget metus lacus, sit amet accumsan erat. Integer suscipit justo vel laoreet sollicitudin. Nam vel porta augue. Proin vulputate leo magna, vel tincidunt magna laoreet eu.
        </p>

        <div className="overflow-hidden mx-auto max-w-full mb-3">
          <div
            className="flex flex-nowrap gap-8"
            style={scrollAnimationStyle}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {testimonialsForScroll.map((student, index) => (
              <div
                key={index + student.name}
                className="bg-white shadow-md rounded-lg p-6 text-left flex-shrink-0 w-72 hover:shadow-xl transition-shadow duration-300 mb-3 "
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-20 w-20 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="italic text-gray-700 text-center mb-4">"{student.quote}"</p>
                <div className="mt-2 text-center">
                  <p className="font-bold text-purple-700">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
