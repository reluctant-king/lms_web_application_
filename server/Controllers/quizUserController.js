const UserQuiz = require("../modals/userQuizAnswers");
const Quiz = require("../modals/quizes");

// Submit a quiz attempt
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({ success: false, message: "Missing quizId or answers" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q) => {
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      if (userAnswer && q.correctOption === userAnswer.selectedOption) {
        score++;
      }
    });

    const submission = await UserQuiz.create({ quizId, answers, score });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    console.error("Submit Quiz Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Admin: Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await UserQuiz.find()
      .populate("userId", "name email")
      .populate("quizId", "questions");
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get submissions for a single quiz
exports.getQuizSubmissions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const submissions = await UserQuiz.find({ quizId })
      .populate("userId", "name email")
      .populate("quizId", "questions");
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};