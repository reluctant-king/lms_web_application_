import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, BarChart, Star, BookOpen } from 'lucide-react';

const CourseCard = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.length > 0 ? (
        courses.map((c) => (
          <Link
            to={`/detailpage/${c._id}`}
            key={c._id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={c.image?.[0] || "/placeholder_course.jpg"}
                alt={c.title}
                onError={(e) => (e.target.src = "/placeholder_course.jpg")}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Category Badge */}
              {c.category && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {c.category}
                </span>
              )}
              
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                {c.price ? `₹${c.price.toLocaleString()}` : 'Free'}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                {c.title}
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <User size={14} className="text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">
                  {c.instructorDetails?.name || "Expert Instructor"}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <BarChart size={14} className="text-purple-500" />
                  <span>{c.level || 'All Levels'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-purple-500" />
                  <span>{c.duration || 'Self-paced'}</span>
                </div>
                {c.lessonsCount && (
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} className="text-purple-500" />
                    <span>{c.lessonsCount} lessons</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {c.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{c.rating}</span>
                  <span className="text-xs text-gray-400">({c.reviewsCount || 0} reviews)</span>
                </div>
              )}

              {/* Tags */}
              {c.tags && c.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {c.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-50 text-purple-600 rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {c.tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{c.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                {c.description}
              </p>

              {/* Action Button */}
              <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                <BookOpen size={16} />
                View Course
              </button>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={40} className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Found</h3>
          <p className="text-gray-500 text-center max-w-md">
            We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;