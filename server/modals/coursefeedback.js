const mongoose = require("mongoose");

const courseFeedbackSchema = new mongoose.Schema({
    courseId: {
        type: String,
        ref: "courses",
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const courseFeedbackModel = mongoose.model("courseFeedbacks", courseFeedbackSchema);

module.exports = courseFeedbackModel;