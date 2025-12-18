import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaPhoneAlt,
} from "react-icons/fa";
import "./About.css";

const images = [
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/college-student-YCNL3GU-1.png",
    alt: "Student 1",
  },
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/students-and-teacher-RVRHBBJ-1.png",
    alt: "Students and Teacher",
  },
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/girl-in-college-MGZDENU-1.png",
    alt: "Student 2",
  },
];

const statsData = [
  { icon: <FaUserGraduate />, value: 10200, label: "Students" },
  { icon: <FaChalkboardTeacher />, value: 50, label: "Instructors" },
  { icon: <FaBookOpen />, value: 10, label: "Courses" },
  { icon: <FaPhoneAlt />, value: 24, label: "Support (hrs)" },
];

const About = () => {
  const [counts, setCounts] = useState(
    statsData.map(() => 0) // initial zero for all stats
  );

  useEffect(() => {
    const duration = 2000; // animation duration in ms
    const frameRate = 30; // updates per second
    const totalFrames = Math.round((duration / 1000) * frameRate);

    statsData.forEach((stat, index) => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.floor(stat.value * progress);
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = currentValue;
          return newCounts;
        });
        if (frame === totalFrames) clearInterval(counter);
      }, duration / totalFrames);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <h2 className="text-center text-5xl font-extrabold text-gray-900">
        About
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="bg-blue-100 rounded-lg overflow-hidden shadow-lg w-72 h-96"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold">
          Little Somebodies Are What We Do
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          delectus, modi ducimus dicta aliquid molestias explicabo
          necessitatibus quae fugiat, eligendi, aliquam quibusdam. Maiores nihil
          ad officiis consequatur neque tempore pariatur?
        </p>
      </div>

      <section className="space-y-12">
        <h2 className="text-center text-5xl font-extrabold text-gray-900">
          Our Story
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="flex-1 space-y-12">
            <div>
              <h3 className="text-4xl font-semibold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 max-w-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.!
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-gray-800 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 max-w-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.!
              </p>
            </div>
          </div>

          <div className="flex-1 shadow-lg rounded-lg overflow-hidden bg-blue-50">
            <img
              src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/cheerful-bearded-senior-european-man-smiles-gladfu-BSUDYSL-1.png"
              alt="Our Story"
              className="object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-3">
          Explore Our Impressive Stats
        </h2>
        <p className="text-gray-400 text-center text-lg max-w-xl mb-14">
          We take pride in our commitment to excellence and our dedication to
          your success.
        </p>

        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center flex-1 min-w-[200px]"
            >
              <div className="text-4xl text-gray-700 mb-4">{stat.icon}</div>
              <span className="text-4xl font-bold text-gray-800 mb-1">
                {counts[idx].toLocaleString()}
                {stat.label === "Support (hrs)" ? "+" : ""}
              </span>
              <span className="text-gray-500 text-lg">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-24 px-6 flex justify-center bg-white">
        <div className="flex flex-col md:flex-row max-w-6xl gap-12 items-center">
          <div className="relative w-full md:w-1/2 h-96">
            <div className="absolute top-0 left-0 w-72 h-72 rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                alt="Student learning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-24 left-32 w-72 h-72 rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                alt="Group study session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <span className="uppercase font-semibold text-purple-600 text-sm">
              Enhance Your Skills
            </span>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              Learn Anything You Want Today
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Learn from the best instructors online and advance your skills in
              a flexible and effective way. Join thousands of students achieving
              their goals every day.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

