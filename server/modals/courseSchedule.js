const mongoose = require("mongoose")

const courseSchedule = new mongoose.Schema({
    batch: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: false,
    },
    days: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "At least one day must be selected.",
        },
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    sessionType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const courseScheduleModal = mongoose.model("schedule", courseSchedule)

module.exports = courseScheduleModal
