const mongoose = require("mongoose")

const quizAnswerSubmit = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
 
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answers: [], 
  submittedAt: {
    type: Date,
    default: Date.now
  }

})

const quizSubmitModal = mongoose.model("quizz_subiters", quizAnswerSubmit)

module.exports = quizSubmitModal
