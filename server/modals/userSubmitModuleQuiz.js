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
    courseName:{
        type: String,
        required: true
    },
    moduleName: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true
    },
     quizId: {
        type: String,
        required: true
    },
    
    
    answer: [
        {
            question: {
                type: String,
                required: true
            },
            selectedOption: {
                type: String,
                required: true
            },
            rightAnswer: {
                type: String,
                required: true
            }
        }
    ],

    score: {
        type: Number,
        required: true
    },


    submittedAt: {
        type: Date,
        default: Date.now
    }

})

const quizSubmitModal = mongoose.model("module_quizz_subiters", quizAnswerSubmit)

module.exports = quizSubmitModal