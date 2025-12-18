const express = require("express");
const {
  createAttendanceSession,
  getAttendanceByBatch,
  markAttendance,
  markBulkAttendance,
  getAttendanceReports,
  getAllBatches,
  getAllCourses,
  getAttendanceStats
} = require("../Controllers/attendanceController");

const router = express.Router();

router.post("/create_session", createAttendanceSession);
router.get("/get_attendance", getAttendanceByBatch);
router.put("/mark_attendance", markAttendance);
router.put("/mark_bulk", markBulkAttendance);
router.get("/get_attendance_reports", getAttendanceReports);
router.get("/view_all_batches", getAllBatches);
router.get("/get_all_courses", getAllCourses);
router.get("/stats/:batchId", getAttendanceStats);


module.exports = router;

