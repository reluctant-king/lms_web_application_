const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  date: { type: Date, required: true },
  session: { type: String, required: true },
  subject: String,
  room: String,
  records: [{
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  status: { type: String, enum: ["present", "absent", "late", "unmarked"], default: "unmarked" },
  markedTime: String
}],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
