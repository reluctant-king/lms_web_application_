import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';

const EditCoursePage = () => {
  const [course, setCourse] = useState({
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js',
    price: 99.99,
    category: 'Web Development',
    image: '',
    modules: [
      { id: 1, title: 'Introduction to HTML', duration: '2 hours' },
      { id: 2, title: 'CSS Fundamentals', duration: '3 hours' },
      { id: 3, title: 'JavaScript Basics', duration: '4 hours' }
    ]
  });

  const [newModule, setNewModule] = useState({ title: '', duration: '' });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const addModule = () => {
    if (newModule.title && newModule.duration) {
      setCourse({
        ...course,
        modules: [...course.modules, { ...newModule, id: Date.now() }]
      });
      setNewModule({ title: '', duration: '' });
    }
  };

  const removeModule = (id) => {
    setCourse({
      ...course,
      modules: course.modules.filter(m => m.id !== id)
    });
  };

  const handleSave = () => {
    alert('Course updated successfully!');
    console.log('Saved course:', course);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    
      console.log('Image uploaded:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Course</h1>
        
        {/* Basic Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={course.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Data Science</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Image
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {course.image || 'No file selected'}
              </span>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Course Modules</h2>
          
          <div className="space-y-2 mb-4">
            {course.modules.map((module, index) => (
              <div
                key={module.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition"
              >
                <div>
                  <span className="font-semibold text-gray-700">
                    {index + 1}. {module.title}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">
                    {module.duration}
                  </span>
                </div>
                <button
                  onClick={() => removeModule(module.id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Module title"
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2 hours)"
              value={newModule.duration}
              onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
              className="md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={addModule}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Add Module
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-bold text-lg shadow-md hover:shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCoursePage;