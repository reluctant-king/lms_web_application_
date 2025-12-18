import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AnswerDetails = ({ selectedResult, setShowModal, getScoreColor }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white">Quiz Attempt Details</h3>
                        <p className="text-blue-100 text-sm">{selectedResult.userName}</p>
                    </div>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Score Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Score</p>
                                <p className={`text-2xl font-bold ${getScoreColor(selectedResult.score, selectedResult.totalQuestions)}`}>
                                    {selectedResult.score} / {selectedResult.totalQuestions}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Percentage</p>
                                <p className={`text-2xl font-bold ${getScoreColor(selectedResult.score, selectedResult.totalQuestions)}`}>
                                    {Math.round((selectedResult.score / selectedResult.totalQuestions) * 100)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Correct</p>
                                <p className="text-2xl font-bold text-green-600">{selectedResult.score}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Incorrect</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {selectedResult.totalQuestions - selectedResult.score}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Answers List */}
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Answer Review</h4>
                    <div className="space-y-4">
                        {selectedResult.answers.map((answer, idx) => {
                            const isCorrect = answer.selectedAnswer === answer.correctAnswer;
                            return (
                                <div
                                    key={idx}
                                    className={`border-2 rounded-xl p-5 ${isCorrect
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-red-50 border-red-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {isCorrect ? (
                                                <FaCheckCircle className="text-green-600 text-xl" />
                                            ) : (
                                                <FaTimesCircle className="text-red-600 text-xl" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-500 mb-1">
                                                Question {idx + 1}
                                            </p>
                                            <p className="text-base font-semibold text-gray-900 mb-3">
                                                {answer.question}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="ml-11 space-y-2">
                                        <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                                            <p className="text-xs font-semibold text-gray-600 mb-1">Your Answer:</p>
                                            <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                {answer.selectedAnswer}
                                            </p>
                                        </div>

                                        {!isCorrect && (
                                            <div className="p-3 rounded-lg bg-green-100 border border-green-300">
                                                <p className="text-xs font-semibold text-gray-600 mb-1">Correct Answer:</p>
                                                <p className="text-sm font-medium text-green-700">
                                                    {answer.correctAnswer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AnswerDetails