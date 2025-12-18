const mongoose = require("mongoose")

const courseModuleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

});

const courseModal = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: [String],
    default: null
  },
  courseModules: {
    type: [courseModuleSchema],
    default: [],
  },
  instructor: {
    type: String,
    required: true
  },
  instructoremail: {
    type: String,
    required: true
  },

  hasMonthlyPayment: {
    type: Boolean,
    default: false
  },
  monthlyAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },

})

const coursesModal = mongoose.model("courses", courseModal)

module.exports = coursesModal