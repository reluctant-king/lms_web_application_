const mongoose = require("mongoose");

const courseCompletersModal = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    coursename: {
        type: String,
        required: true,
    },

});

const courseCompletersModals = mongoose.model("course_completers", courseCompletersModal);
module.exports = courseCompletersModals;
