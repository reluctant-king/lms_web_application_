const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

    course: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    lessons: [
        {
            module: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],


});

module.exports = mongoose.model("Lessons", lessonSchema);

