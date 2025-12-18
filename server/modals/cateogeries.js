const mongoose = require("mongoose")

const cateogrySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: [String],

});

const cateogry = mongoose.model("cateogry", cateogrySchema)

module.exports = cateogry
