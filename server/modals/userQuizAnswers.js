const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedOption: { type: Number, required: true },
    },
  ],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const UserQuiz = mongoose.model("UserQuiz", userQuizSchema);
module.exports = UserQuiz;
