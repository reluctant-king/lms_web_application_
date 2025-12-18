const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    moduleQuizz: [
        {
            module: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true
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
                D: {
                    type: String,
                    required: true
                }
            },
            rightAnswer: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("module_quizzes", quizSchema);

