import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCheckCircle, FaArrowLeft, FaQuestionCircle, FaListAlt, FaLightbulb } from "react-icons/fa";

const InstructorAddQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    question: "",
    options: { A: "", B: "", C: "" },
    rightAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["A", "B", "C"].includes(name)) {
      setQuiz((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
    } else {
      setQuiz((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddQuizz = async () => {
    // Validation
    if (!quiz.question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (!quiz.options.A.trim() || !quiz.options.B.trim() || !quiz.options.C.trim()) {
      toast.error("Please fill all options");
      return;
    }

    if (!["A", "B", "C"].includes(quiz.rightAnswer)) {
      toast.error("Please select the correct answer");
      return;
    }

    try {
      const payload = {
        question: quiz.question,
        options: quiz.options,
        rightAnswer: quiz.rightAnswer,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create_quiz`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Quiz question added successfully!");
        
        // Reset form
        setQuiz({
          question: "",
          options: { A: "", B: "", C: "" },
          rightAnswer: "",
        });
      } else {
        toast.error(res.data.message || "Failed to add quiz");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const optionColors = {
    A: "from-blue-500 to-cyan-500",
    B: "from-purple-500 to-pink-500",
    C: "from-orange-500 to-red-500",
  };

  const optionBgColors = {
    A: "bg-blue-50 border-blue-200",
    B: "bg-purple-50 border-purple-200",
    C: "bg-orange-50 border-orange-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition font-medium"
        >
          <FaArrowLeft /> Back to Quizzes
        </button>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <FaQuestionCircle className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add Quiz Question
            </h1>
            <p className="text-gray-600 text-lg mt-1">Create a new multiple choice question</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8 mb-6">
          
          {/* Question Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FaQuestionCircle className="text-white text-sm" />
              </div>
              <label className="text-lg font-bold text-gray-900">
                Question *
              </label>
            </div>
            <textarea
              name="question"
              value={quiz.question}
              onChange={handleChange}
              rows="4"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none text-gray-900 placeholder-gray-400 shadow-sm"
              placeholder="Enter your question here..."
            />
          </div>

          {/* Options Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <FaListAlt className="text-white text-sm" />
              </div>
              <label className="text-lg font-bold text-gray-900">
                Answer Options *
              </label>
            </div>
            <div className="space-y-4">
              {["A", "B", "C"].map((opt) => (
                <div key={opt} className="group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${optionColors[opt]} rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      {opt}
                    </div>
                    <input
                      type="text"
                      name={opt}
                      value={quiz.options[opt]}
                      onChange={handleChange}
                      className="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 placeholder-gray-400 shadow-sm"
                      placeholder={`Enter option ${opt}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <label className="text-lg font-bold text-gray-900">
                Correct Answer *
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["A", "B", "C"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setQuiz({ ...quiz, rightAnswer: opt })}
                  className={`group relative p-5 rounded-xl border-2 font-bold transition-all duration-200 ${
                    quiz.rightAnswer === opt
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 shadow-lg scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${optionColors[opt]} flex items-center justify-center text-white font-bold shadow-md`}>
                      {opt}
                    </div>
                    <span className="text-sm">Option {opt}</span>
                    {quiz.rightAnswer === opt && (
                      <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-xl animate-bounce" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddQuizz}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <FaPlus className="text-xl" /> Add Question
          </button>
        </div>

        {/* Help Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <FaLightbulb className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Make sure your question is clear and concise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Ensure all options are distinct and relevant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Select the correct answer before submitting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Review your question for any typos or errors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAddQuiz;