import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../utils/api";
import { 
  FaArrowLeft, 
  FaUsers, 
  FaTrophy, 
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaEye,
  FaSearch
} from "react-icons/fa";


// const API_BASE = "https://lms-web-application-backend-ymjf.onrender.com/api/v1";

const QuizSubmissions = () => {
  const { quizId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, [quizId]);

  const fetchSubmissions = async () => {
    try {
      // Fetch quiz info
      const quizRes = await api.get(`/get_quiz/${quizId}`);
      setQuizTitle(quizRes.data.quizName || "Quiz");

      // Fetch submissions
      const subRes = await api.get(`/get_all_user_quiz_answer/${quizId}`);
      setSubmissions(subRes.data || []);
    } catch (err) {
      console.error("Error fetching quiz submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  // Calculate stats
  const totalSubmissions = submissions.length;
  const avgScore = submissions.length > 0
    ? (submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length).toFixed(1)
    : 0;
  const passRate = submissions.length > 0
    ? ((submissions.filter(s => (s.score / s.totalQuestions) >= 0.6).length / submissions.length) * 100).toFixed(0)
    : 0;

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getScoreBadgeColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 'bg-green-100 text-green-700 border-green-200';
    if (percentage >= 70) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-orange-100 text-orange-700 border-orange-200';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 60) return <FaCheckCircle className="text-green-500" />;
    return <FaTimesCircle className="text-red-500" />;
  };

  // Filter submissions based on search
  const filteredSubmissions = submissions.filter(submission =>
    submission.userName?.toLowerCase().includes(search.toLowerCase()) ||
    submission.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {showModal && selectedResult && (
        <AnswerDetails 
          getScoreColor={getScoreColor}
          setShowModal={setShowModal}
          selectedResult={selectedResult}
        />
      )}

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link
          to="/instructor_quiz_manager"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition font-medium"
        >
          <FaArrowLeft /> Back to Quizzes
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaClipboardList className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Submissions</h1>
            <p className="text-gray-600">
              <span className="font-semibold text-blue-600">{quizTitle}</span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Submissions</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {totalSubmissions}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <FaUsers className="text-white text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Average Score</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {avgScore}
                  <span className="text-lg text-gray-500 ml-1">
                    / {submissions[0]?.totalQuestions || 0}
                  </span>
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <FaTrophy className="text-white text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pass Rate (≥60%)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {passRate}%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <FaChartLine className="text-white text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              placeholder="Search by name or email..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Submissions</h3>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {search ? 'No results found' : 'No Submissions Yet'}
                </h3>
                <p className="text-gray-600">
                  {search ? 'Try adjusting your search' : "Students haven't attempted this quiz yet"}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission, index) => {
                    const dateObj = new Date(submission.submittedAt);
                    const percentage = ((submission.score / submission.totalQuestions) * 100).toFixed(0);

                    return (
                      <tr 
                        key={submission._id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 shadow-md">
                              {submission.userName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 capitalize">
                                {submission.userName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{submission.email}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full border ${getScoreBadgeColor(submission.score, submission.totalQuestions)}`}>
                              {submission.score} / {submission.totalQuestions}
                            </span>
                            <span className={`text-xs font-semibold ${getScoreColor(submission.score, submission.totalQuestions)}`}>
                              ({percentage}%)
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {dateObj.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {dateObj.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleViewDetails(submission)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition font-medium text-sm"
                          >
                            <FaEye />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredSubmissions.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Showing {filteredSubmissions.length} of {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSubmissions;
