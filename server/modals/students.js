const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  isExist: {
    type: Boolean,
    default: false
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
  accoutRegisterdEmail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  courseEnrolled: {
    type: String,
  },
  address: {
    type: String,
  },
  profileImage: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    default: null,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
