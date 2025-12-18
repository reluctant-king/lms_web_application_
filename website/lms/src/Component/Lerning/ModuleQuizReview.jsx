import React, { useContext } from "react";
import { AllCourseDetail } from "../AllCourseContext/Context";

const ModuleQuizReview = ({ currentReview, onBack }) => {

    // const { getQuizResults, score, setScore } = useContext(AllCourseDetail);
    if (!currentReview || currentReview.length === 0) return null;

    const review = currentReview[0];
    const totalQuestions = review.answer?.length || 0;


    const percentage = ((review.score / totalQuestions) * 100).toFixed(0);
    const isPassed = percentage >= 70;
    // setScore(isPassed)

    console.log(isPassed)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 relative animate-fadeIn border border-indigo-100">


                <button
                    onClick={() => onBack(false)}
                    className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 p-2 rounded-full transition-all"
                >
                    ✕
                </button>


                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700">
                        {review.moduleName} - Quiz Review
                    </h2>
                    <p className="text-slate-600 mt-2 text-lg font-medium">
                        by {review.userName}
                    </p>
                </div>


                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-2xl mb-6 border border-indigo-100 shadow-sm text-center">
                    <h3 className="text-xl font-semibold text-indigo-700">Your Score</h3>
                    <p className="text-5xl font-bold text-indigo-600 mt-2">
                        {review.score}{" "}
                        <span className="text-slate-400 text-2xl">/ {totalQuestions}</span>
                    </p>


                    <p className="text-lg text-slate-600 mt-2">
                        Percentage:{" "}
                        <span className="font-semibold text-indigo-700">{percentage}%</span>
                    </p>


                    <p
                        className={`mt-3 text-lg font-semibold ${isPassed ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {isPassed ? "✅ Passed" : "❌ Failed"}
                    </p>


                    <p className="text-slate-600 mt-2">
                        {review.score === totalQuestions
                            ? "🎉 Perfect Score!"
                            : isPassed
                                ? "👏 Great effort! You passed."
                                : "💪 Keep practicing and try again!"}
                    </p>
                </div>
                {/* Answer Review */}
                {/* <div className="max-h-[400px] overflow-y-auto space-y-4">
          {review.answer.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border-2 transition-all ${
                item.selectedOption === item.rightAnswer
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
            >
              <p className="font-semibold text-slate-800">
                Q{index + 1}. {item.question}
              </p>

              <div className="mt-2 text-sm space-y-1">
                <p>
                  <span className="font-semibold text-slate-700">
                    Your Answer:{" "}
                  </span>
                  <span
                    className={`${
                      item.selectedOption === item.rightAnswer
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {item.selectedOption}
                  </span>
                  {item.selectedOption === item.rightAnswer ? " ✓" : " ✗"}
                </p>
                {item.selectedOption !== item.rightAnswer && (
                  <p>
                    <span className="font-semibold text-slate-700">
                      Correct Answer:{" "}
                    </span>
                    <span className="text-green-700 font-semibold">
                      {item.rightAnswer}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div> */}


                <div className="text-center mt-6 text-xs text-slate-500">
                    Submitted on {new Date(review.submittedAt).toLocaleString()}
                </div>


                <div className="text-center mt-4">
                    <button
                        onClick={() => onBack()}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModuleQuizReview;

