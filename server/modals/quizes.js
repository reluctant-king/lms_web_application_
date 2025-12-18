const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    A: {
      type: String,
      required: true
    },
    B: {
      type: String,
      required: true
    },
    C: {
      type: String,
      required: true
    },
  },
  rightAnswer: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
