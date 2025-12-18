const Quiz = require("../modals/quizes");
const submitanswer = require("../modals/quizAnswerSubmiters")

// // Create quiz
// exports.createQuiz = async (req, res) => {
//   try {
//     const { title, questions } = req.body;
//     if (!title || !questions.length)
//       return res.status(400).json({ success: false, message: "Title and questions required" });

//     const quiz = await Quiz.create({ title, questions });
//     res.status(201).json({ success: true, data: quiz });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all quizzes
// exports.getAllQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.status(200).json({ success: true, data: quizzes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get quiz by ID
// exports.getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
//     res.status(200).json({ success: true, data: quiz });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


exports.addQuizz = async (req, res) => {
  try {
    const { question, options, rightAnswer } = req.body

    if (!question || !options || !rightAnswer) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    if (!["A", "B", "C"].includes(rightAnswer)) {
      return res.status(400).json({
        success: false,
        message: "rightAnswer must be one of 'A', 'B', or 'C'",
      });
    }

    const quizz = await Quiz.create({
      question,
      options,
      rightAnswer,
    });

    res.status(200).json({
      success: true,
      message: "Quiz added successfully",
      quizz,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getAllQuizz = async (req, res) => {
  try {
    const quizz = await Quiz.find();

    if (!quizz) {
      return res.status(400).json({
        success: false,
        message: "Faild to fetch quiz"
      })
    }

    res.status(200).json({
      success: true,
      quizz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.userSubmitAnswer = async (req, res) => {
  try {
    const { userName, email, quizName, score, totalQuestions, answers } = req.body;
    if (!userName || !email || score === undefined || !totalQuestions || !answers || !answers.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSubmission = await submitanswer.create({
      userName,
      email,
      quizName,
      score,
      totalQuestions,
      answers
    });

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getAllSubmittedQuizz = async (req, res) => {
  try {
    const submitQuizz = await submitanswer.find();
    if (!submitQuizz) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch users submitted quiz",
      });
    }
    res.status(200).json({
      success: true,
      submitQuizz,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get quizzes for an instructor
exports.getInstructorQuizzes = async (req, res) => {
  try {    
    const quizzes = await Quiz.find();
    const submissions = await submitanswer.find();
    const merged = quizzes.map((quiz) => {
      const relatedSubmissions = submissions.filter(
        (sub) => sub.quizName === quiz.question   
      );
      return {
        ...quiz._doc,
        quizName: quiz.question,         
        questions: [quiz],               
        submissions: relatedSubmissions, 
      };
    });

    res.status(200).json({
      success: true,
      data: merged,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    const submissions = await submitanswer.find({
      quizName: quiz.question
    });

    res.status(200).json({
      success: true,
      data: {
        quizName: quiz.question,
        questions: [quiz],
        submissions: submissions,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getSubmissionsByQuizId = async (req, res) => {
  try {
    const submissions = await submitanswer.find();
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await submitanswer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};