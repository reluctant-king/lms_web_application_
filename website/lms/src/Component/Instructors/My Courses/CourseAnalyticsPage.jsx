import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign, FaUsers, FaEye, FaChartLine } from 'react-icons/fa';

const CourseAnalyticsPage = () => {

  const stats = {
    totalStudents: 417,
    totalRevenue: 41683,
    lifetimeViews: 12453,
    avgRating: 4.7
  };

  const monthlyEnrollments = [
    { month: 'Jan', students: 45 },
    { month: 'Feb', students: 52 },
    { month: 'Mar', students: 68 },
    { month: 'Apr', students: 73 },
    { month: 'May', students: 91 },
    { month: 'Jun', students: 88 }
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 4500 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 6800 },
    { month: 'Apr', revenue: 7300 },
    { month: 'May', revenue: 9100 },
    { month: 'Jun', revenue: 8800 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Course Analytics</h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <FaUsers className="w-8 h-8 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalStudents}</h3>
            <p className="text-blue-100 text-sm">Total Students</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <FaDollarSign className="w-8 h-8 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                +18%
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              ${stats.totalRevenue.toLocaleString()}
            </h3>
            <p className="text-green-100 text-sm">Total Revenue</p>
          </div>

          {/* Lifetime Views */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <FaEye className="w-8 h-8 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                +8%
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {stats.lifetimeViews.toLocaleString()}
            </h3>
            <p className="text-purple-100 text-sm">Lifetime Views</p>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="w-8 h-8 opacity-80" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                4.7/5
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.avgRating}</h3>
            <p className="text-orange-100 text-sm">Average Rating</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Enrollments Line Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Monthly Enrollments
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyEnrollments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Monthly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Performance Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-800">68%</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Avg. Time to Complete</p>
              <p className="text-2xl font-bold text-gray-800">6.2 weeks</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Student Satisfaction</p>
              <p className="text-2xl font-bold text-gray-800">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalyticsPage;
