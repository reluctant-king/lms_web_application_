const mongoose = require("mongoose")

const recordVideoSchema = new mongoose.Schema({
    video:[String],
    title:String,
    description:String,
    image:[String]
})

const userModal = mongoose.model("recorded_videos", recordVideoSchema)

module.exports = userModal
