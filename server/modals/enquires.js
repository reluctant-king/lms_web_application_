const mongoose = require("mongoose")

const enquiryScheme = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const userModal = mongoose.model("enquieies", enquiryScheme)

module.exports = userModal
