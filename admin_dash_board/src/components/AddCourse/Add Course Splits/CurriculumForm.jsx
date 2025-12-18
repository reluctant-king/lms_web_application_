import React, { useState } from "react";

const CurriculumForm = ({ data, updateData }) => {
  const [newModule, setNewModule] = useState({ name: "", lessons: [] });
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: "Video",
    resource: "",
    duration: "",
    accessType: "Paid",
  });

  const addModule = () => {
    if (!newModule.name) return;
    updateData("modules", [...data.modules, newModule]);
    setNewModule({ name: "", lessons: [] });
  };

  const addLesson = (i) => {
    if (!newLesson.title) return;
    const modulesCopy = [...data.modules];
    modulesCopy[i].lessons.push(newLesson);
    updateData("modules", modulesCopy);
    setNewLesson({
      title: "",
      type: "Video",
      resource: "",
      duration: "",
      accessType: "Paid",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Section Title */}
      <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        B. Curriculum / Syllabus
      </h3>

      {/* Add Module */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Module Name"
          value={newModule.name}
          onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={addModule}
          className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow transition"
        >
          Add Module
        </button>
      </div>

      {/* Existing Modules */}
      {data.modules.map((m, i) => (
        <div key={i} className="border border-gray-300 rounded-2xl p-4 mb-4 bg-white shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2">{m.name}</h4>

          {/* Lessons */}
          {m.lessons.map((l, j) => (
            <p key={j} className="ml-4 text-sm text-gray-700">
              • {l.title} ({l.type})
            </p>
          ))}

          {/* Add Lesson */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <input
              type="text"
              placeholder="Lesson Title"
              value={newLesson.title}
              onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newLesson.type}
              onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Video</option>
              <option>Document</option>
              <option>Live</option>
              <option>Quiz</option>
            </select>
            <button
              type="button"
              onClick={() => addLesson(i)}
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow transition"
            >
              Add Lesson
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurriculumForm;

