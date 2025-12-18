const Lessions = require("../modals/lesonsModal")
const moduleQuizZ = require("../modals/moduleQuizz")
const userSubmitModal = require("../modals/userSubmitModuleQuiz")
const courseCompleters = require("../modals/CourseCompleters")
const { sendCertificatetoStudent } = require("../Utils/sendCertificateMail")

exports.createLesson = async (req, res) => {
    const { course,
        courseId,
        lessons,
    } = req.body

    try {
        if (!course || !courseId || !lessons) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const lessions = await Lessions.create({
            course,
            courseId,
            lessons
        })

        res.status(200).json({
            success: true,
            message: "Lession added successfully",
            lessions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getLessonByCourseid = async (req, res) => {
    const { courseId } = req.params;

    try {
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        const lessons = await Lessions.find({ courseId })

        if (!lessons) {
            return res.status(404).json({
                success: false,
                message: "No lessons found for this course",
            });
        }

        return res.status(200).json({
            success: true,
            lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}

exports.createModuleQuizz = async (req, res) => {
    const { course,
        courseId,
        moduleQuizz } = req.body

    try {
        if (!course || !courseId || !moduleQuizz) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const moduleQuizzes = await moduleQuizZ.create({
            course,
            courseId,
            moduleQuizz
        })
        res.status(200).json({
            success: true,
            message: "Module quizz added successfully",
            moduleQuizzes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllQuizzes = async (req, res) => {
    try {
        // const { firstname } = req.query
        // let query = {};
        // if (firstname) {
        //     query.firstname = { $regex: firstname, $options: "i" };
        // }

        const quizes = await moduleQuizZ.find()
        if (!quizes) {
            return res.status(400).json({
                success: false,
                messsage: "Quiz not found",

            });
        }

        res.status(200).json({
            success: true,
            quizes,

        });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getModuleQuiz = async (req, res) => {
    const { id } = req.params
    try {
        const moduleQuiz = await moduleQuizZ.findById(id)
        if (!moduleQuiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        res.status(200).json({
            success: true,
            moduleQuiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateModuleQuizz = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    try {
        const quiz = await moduleQuizZ.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            })
        }

        res.status(200).json({
            success: true,
            quiz,
            message: "Quiz updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.submitModuleQuiz = async (req, res) => {
    try {
        const { userName, email, courseName, moduleName, moduleId, quizId, answer, score, } = req.body;

        if (!userName || !email || !moduleName || !courseName || !moduleId || !quizId || !answer || !score) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const existingSubmission = await userSubmitModal.findOne({ email, moduleId })

        let submitAnswers

        if (existingSubmission) {
            existingSubmission.answer = answer;
            existingSubmission.score = score;
            existingSubmission.moduleName = moduleName;
            existingSubmission.courseName = courseName;
            existingSubmission.userName = userName;
            existingSubmission.submittedAt = new Date();

            submitAnswers = await existingSubmission.save()
        } else {
            submitAnswers = await userSubmitModal.create({
                userName,
                email,
                courseName,
                moduleName,
                moduleId,
                quizId,
                answer,
                score
            })
        }
        res.status(200).json({
            success: true,
            message: "Quiz submitted successfully",
            submitAnswers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllSubmitAnswers = async (req, res) => {
    try {
        const userSubmitedQquiz = await userSubmitModal.find()
        if (!userSubmitedQquiz) {
            return res.status(400).json({
                success: false,
                messsage: "Quiz not found",

            });
        }

        res.status(200).json({
            success: true,
            userSubmitedQquiz,

        });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.handleCourseCompetion = async (req, res) => {
    const { email, courseName, studentName } = req.body;
    try {
        await sendCertificatetoStudent(email, courseName, studentName)
        res.json({
            success: true,
            message: "Certificate sent to your email!"
        });
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to send certificate"
        });
    } catch (error) {

    }
}


exports.createCourseCompleters = async (req, res) => {
    try {
        const { username, userId, userEmail, coursename } = req.body

        if (!username || !userId || !userEmail || !coursename) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            })
        }

        const allCompleted = await courseCompleters.create({
            username, userId, userEmail, coursename
        })

        res.status(200).json({
            success: true,
            allCompleted,
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllCompleters = async (req, res) => {
    try {
        const allCourseCompleters = await courseCompleters.find()

         if (!allCourseCompleters) {
            return res.status(400).json({
                success: false,
                messsage: "not found",

            });
        }

          res.status(200).json({
            success: true,
            allCourseCompleters,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}