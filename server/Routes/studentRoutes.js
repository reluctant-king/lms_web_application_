const express = require("express");
const {
  addStudent,
  getAllStudent,
  assignStudentToBatch,
  getStudentsByBatch,
  getStudent,
  deleteStudent,
  updateStudent
} = require("../Controllers/studentController");

const router = express.Router();

router.post("/add_student", addStudent);
router.get("/view_students", getAllStudent);
router.route("/get_student/:id").get(getStudent).delete(deleteStudent).put(updateStudent)

// 🔹 New routes
router.post("/assign_student_batch", assignStudentToBatch);
router.get("/students_by_batch/:batchId", getStudentsByBatch);

module.exports = router;
