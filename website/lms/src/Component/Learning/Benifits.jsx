import React, { useState, useEffect } from 'react';
import api from "../../../Utils/api";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomCourses = async () => {
      try {
        const resp = await api.get(`/api/v1/get_all_courses?page=1&limit=100`);
        const data = resp.data;

        if (data?.data && data.data.length > 0) {
          const shuffled = [...data.data].sort(() => 0.5 - Math.random());
          const randomCourses = shuffled.slice(0, 4);
          const eventsData = randomCourses.map(course => ({
            id: course._id,
            title: course.title || "Web Development Event",
            description: course.description || "Discover the latest trends and innovations shaping the future of web development.",
            image: course.thumbnail || `https://images.unsplash.com/photo-${getRandomImage()}?w=800&q=80`,
            buttonText: course.price === 0 ? "REGISTER FOR FREE" : "GET TICKET",
            isFree: course.price === 0,
          }));
          setEvents(eventsData);
        } else {
          setEvents(getDemoEvents());
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setEvents(getDemoEvents());
      } finally {
        setLoading(false);
      }
    };

    fetchRandomCourses();
  }, []);

  const getRandomImage = () => {
    const images = [
      '1498050108023-c5249f4df085',
      '1487058792252-fa8eac87a087',
      '1526374965328-7f61d4dc18c5',
      '1555066931-4365d14bab8c'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const getDemoEvents = () => [
    {
      id: 1,
      title: 'Future of Web Development: Trends and Innovations',
      description: 'Discover the latest trends and innovations shaping the future of web development.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      buttonText: 'REGISTER FOR FREE',
      isFree: true
    },
    {
      id: 2,
      title: 'WebDev Pro Code-a-Thon: Build a Responsive Website',
      description: 'Participants will have 48 hours to create a responsive website from scratch using HTML, CSS, and JavaScript.',
      image: 'https://images.unsplash.com/photo-1487058792252-fa8eac87a087?w=800&q=80',
      buttonText: 'REGISTER FOR FREE',
      isFree: true
    },
    {
      id: 3,
      title: 'Ask the Experts: Frontend Web Development',
      description: 'Join our live Q&A session with our experienced instructors. Get answers to your queries, insights into best practices.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      buttonText: 'GET TICKET',
      isFree: false
    },
    {
      id: 4,
      title: 'Web Accessibility: Building Inclusive Websites',
      description: 'Industry experts will discuss the importance of inclusive design and share strategies for creating websites.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      buttonText: 'GET TICKET',
      isFree: false
    }
  ];

  if (loading) {
    return (
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded-2xl"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Join our web development events designed to share insights, trends,
            and real-world experiences.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[4rem]">
                  {event.description}
                </p>

                {/* Button */}
                <button className="w-full bg-gray-900 text-white font-bold text-xs py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wider">
                  {event.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
