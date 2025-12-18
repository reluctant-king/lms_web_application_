import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';

const ModuleQuizAnswerDetails = ({ results, setClickDetails, courseName, email }) => {

    const userSubmission = results && results.filter((r) => r.email === email && r.courseName === courseName)
    console.log(userSubmission)

    if (userSubmission.length === 0) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-2xl w-96 text-center shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4">No Submissions Found</h2>
                    <button
                        onClick={() => setClickDetails(false)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">

                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center px-6 py-4 rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-white">
                        {userSubmission[0].userName} — {courseName}
                    </h2>
                    <button
                        onClick={() => setClickDetails(false)}
                        className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
                    >
                        <FaArrowLeft /> Close
                    </button>
                </div>


                <div className="p-6 space-y-8">
                    {userSubmission.map((submission, i) => (
                        <div key={i} className="border rounded-2xl p-5 shadow-sm bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-indigo-700">
                                    Module: {submission.moduleName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Score:{" "}
                                    <span className="font-semibold text-gray-800">
                                        {submission.score}
                                    </span>{" "}
                                    / {submission.answer.length}
                                </p>
                            </div>

                            <table className="w-full text-sm border-collapse border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-3 py-2 text-left">No</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Question</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Your Answer</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left">Correct Answer</th>
                                        <th className="border border-gray-300 px-3 py-2 text-center">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submission.answer.map((ans, idx) => (
                                        <tr key={idx} className="hover:bg-white transition">
                                            <td className="border border-gray-300 px-3 py-2">{idx + 1}</td>
                                            <td className="border border-gray-300 px-3 py-2">{ans.question}</td>
                                            <td className="border border-gray-300 px-3 py-2">{ans.selectedOption}</td>
                                            <td className="border border-gray-300 px-3 py-2">{ans.rightAnswer}</td>
                                            <td
                                                className={`border border-gray-300 px-3 py-2 font-semibold text-center ${ans.selectedOption === ans.rightAnswer
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                                    }`}
                                            >
                                                {ans.selectedOption === ans.rightAnswer
                                                    ? " Correct"
                                                    : " Wrong"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModuleQuizAnswerDetails