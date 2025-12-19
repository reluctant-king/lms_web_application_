import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";


const Mentors = () => {
  const MentorCard = ({ instructor }) => (
    <div className="min-w-[300px] bg-white rounded-2xl p-6 shadow-lg border border-purple-100 text-center flex-shrink-0 hover:shadow-xl transition-all duration-300">
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-100 shadow mx-auto mb-4">
        <img
          src={
            instructor.image ||
            instructor.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&size=256&background=7c3aed&color=fff`
          }
          alt={instructor.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&size=256&background=7c3aed&color=fff`;
          }}
        />
      </div>
      <p className="text-purple-600 font-semibold uppercase tracking-wider text-sm mb-1">
        {instructor.title || instructor.role || 'Instructor'}
      </p>
      <h3 className="text-lg font-bold text-gray-900 mb-4">{instructor.name}</h3>
      <div className="flex justify-center gap-3">
        <a
          href={instructor.social?.facebook || '#'}
          className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition"
          aria-label="Facebook"
        >
          <FaFacebook className="w-4 h-4" />
        </a>
        <a
          href={instructor.social?.twitter || '#'}
          className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition"
          aria-label="Twitter"
        >
          <FaTwitter className="w-4 h-4" />
        </a>
        <a
          href={instructor.social?.linkedin || '#'}
          className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

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

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get(`/api/v1/view_instructor`, { params: { page: 1, limit: 1000 } });
        setInstructors(res.data.data || []);
      } catch {
        setInstructors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  if (loading) return <div className="py-20 px-6 text-center">Loading...</div>;
  if (!instructors.length) return <div className="py-20 px-6 text-center">No instructors found.</div>;

  const instructorsForScroll = [...instructors, ...instructors];

  const scrollAnimationStyle = {
    animationName: 'scrollLeft',
    animationDuration: '30s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  return (
    <>
      <style>{styleSheet}</style>
      <div className="bg-gradient-to-br from-slate-50 to-purple-50 py-20 px-6 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-1xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Learn from industry professionals with years of experience in their respective fields.
          </p>
        </div>
        <div
          className="flex gap-6 w-max"
          style={scrollAnimationStyle}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {instructorsForScroll.map((instructor, index) => (
            <MentorCard key={index + (instructor.id || instructor.name)} instructor={instructor} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
            View All Instructors
          </button>
        </div>
      </div>
    </>
  );
};

export default Mentors;

