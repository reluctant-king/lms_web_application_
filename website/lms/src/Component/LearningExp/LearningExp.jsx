import React from 'react';
import { FaBookOpen, FaGraduationCap, FaAward, FaVideo, FaPlay } from "react-icons/fa";
const LearningExperience = () => {
  const features = [
    {
      icon: <FaBookOpen className="w-8 h-8" />,
      title: "Top Quality Content",
      desc: "Learn from industry professionals with real-world experience and cutting-edge knowledge",
      color: "bg-blue-500"
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Expert Instructors",
      desc: "Comprehensive curriculum taught by skilled educators covering modern technologies",
      color: "bg-pink-500"
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Interactive Learning",
      desc: "World-class quizzes and assessments to reinforce your understanding and track progress",
      color: "bg-orange-500"
    },
    {
      icon: <FaVideo className="w-8 h-8" />,
      title: "Get Certified",
      desc: "Earn recognized certificates and showcase your achievements to advance your career",
      color: "bg-cyan-500"
    }
  ];

  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left Column - Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Premium Learning Experience
            </h1>

            <div className="space-y-6 text-gray-600 mb-10">
              <p className="leading-relaxed">
                Transform your career with our comprehensive LMS platform. Access world-class courses designed by industry experts to accelerate your professional growth and unlock new opportunities.
              </p>
              <p className="leading-relaxed">
                Join thousands of successful learners who have achieved their goals through our interactive learning experience. Our platform combines cutting-edge technology with proven teaching methods to deliver measurable results and career advancement.
              </p>
            </div>

            {/* Video Card */}
            <div className="inline-flex items-center gap-4 bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
                  alt="Study video"
                  className="w-28 h-20 object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <FaPlay className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">
                  Discover how our LMS works,
                </p>
                <p className="text-gray-600 text-sm">Watch intro video</p>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center text-white mb-6 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningExperience;
