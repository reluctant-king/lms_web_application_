const Attendance = require("../modals/Attendence");
const Student = require("../modals/students");
const Batch = require("../modals/batches"); // your batch model
const Course = require("../modals/courses"); // your course model

// helper: convert date string to start & end of day for exact match
function dayRange(dateStr) {
  const d = new Date(dateStr);
  const start = new Date(d.setHours(0, 0, 0, 0));
  const end = new Date(d.setHours(23, 59, 59, 999));
  return { start, end };
}

// Create or get attendance session
exports.createAttendanceSession = async (req, res) => {
  try {
    const { batchId, date, session, subject, room } = req.body;
    if (!batchId || !date || !session) {
      return res.status(400).json({ success: false, message: "batchId, date and session are required" });
    }

    const { start, end } = dayRange(date);
    let attendance = await Attendance.findOne({
      batch: batchId,
      date: { $gte: start, $lte: end },
      session,
    }).populate("records.studentId", "name email phone rollNo batch");

    if (attendance) {
      return res.status(200).json({ success: true, message: "Attendance already exists", data: attendance });
    }

    // Fetch all active students
    const allStudents = await Student.find({ status: "Active" });

    // Filter students for this batch
    const batchStudents = allStudents.filter((s) => String(s.batch) === String(batchId));

    const records = batchStudents.map((s) => ({
      studentId: s._id,
      status: "unmarked",
      markedTime: null,
    }));

    attendance = await Attendance.create({
      batch: batchId,
      date: new Date(date),
      session,
      subject,
      room,
      records,
    });

    const populated = await Attendance.findById(attendance._id).populate(
      "records.studentId",
      "name email phone rollNo batch"
    );

    res.status(201).json({ success: true, message: "Attendance session created", data: populated });
  } catch (error) {
    console.error("createAttendanceSession error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch attendance by batch
exports.getAttendanceByBatch = async (req, res) => {
  try {
    const { batchId, date, session } = req.query;
    if (!batchId || !date || !session) {
      return res.status(400).json({ success: false, message: "batchId, date and session query params required" });
    }

    const { start, end } = dayRange(date);

    const attendance = await Attendance.findOne({
      batch: batchId,
      date: { $gte: start, $lte: end },
      session,
    }).populate("records.studentId", "name email phone rollNo batch");

    if (!attendance) return res.status(404).json({ success: false, message: "Attendance not found" });

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    console.error("getAttendanceByBatch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark attendance (individual)
exports.markAttendance = async (req, res) => {
  try {
    const { attendanceId, studentId, status } = req.body;
    if (!attendanceId || !studentId || !status)
      return res.status(400).json({ success: false, message: "attendanceId, studentId, status required" });

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ success: false, message: "Attendance not found" });

    const record = attendance.records.find((r) => String(r.studentId) === String(studentId));
    if (!record) return res.status(404).json({ success: false, message: "Student not in this attendance session" });

    record.status = status;
    record.markedTime = status !== "unmarked" ? new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" }) : null;

    await attendance.save();

    const updated = await Attendance.findById(attendanceId).populate("records.studentId", "name email phone rollNo batch");

    res.status(200).json({ success: true, message: "Attendance marked", data: updated });
  } catch (error) {
    console.error("markAttendance error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk mark attendance
exports.markBulkAttendance = async (req, res) => {
  try {
    const { attendanceId, status } = req.body;
    if (!attendanceId || typeof status === "undefined")
      return res.status(400).json({ success: false, message: "attendanceId and status required" });

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ success: false, message: "Attendance not found" });

    const time = new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" });

    attendance.records.forEach((r) => {
      r.status = status;
      r.markedTime = status !== "unmarked" ? time : null;
    });

    await attendance.save();

    const updated = await Attendance.findById(attendanceId).populate("records.studentId", "name email phone rollNo batch");

    res.status(200).json({ success: true, message: "Bulk attendance marked", data: updated });
  } catch (error) {
    console.error("markBulkAttendance error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// In your attendanceController.js

exports.getAttendanceReports = async (req, res) => {
  try {
    const { from, to, batchId, status, search } = req.query;

    if (!from || !to)
      return res.status(400).json({ success: false, message: "from and to required" });

    const startDate = new Date(from);
    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);

    let query = { date: { $gte: startDate, $lte: endDate } };
    if (batchId && batchId !== "all") query.batch = batchId;

    let attendances = await Attendance.find(query)
      .populate("records.studentId", "name rollNo batch")
      .sort({ date: -1 });

    // Initialize stats
    const stats = { present: 0, absent: 0, late: 0, excused: 0, total: 0 };

    // Filter records for status & search, and compute stats
    attendances = attendances.map((att) => {
      let filteredRecords = att.records;

      if (status && status !== "all") {
        filteredRecords = filteredRecords.filter((r) => r.status === status);
      }

      if (search) {
        filteredRecords = filteredRecords.filter(
          (r) =>
            r.studentId?.name.toLowerCase().includes(search.toLowerCase()) ||
            r.studentId?.rollNo.toString().includes(search)
        );
      }

      // Update stats only for filtered records
      filteredRecords.forEach((r) => {
        stats.total++;
        if (r.status === "present") stats.present++;
        else if (r.status === "absent") stats.absent++;
        else if (r.status === "late") stats.late++;
        else if (r.status === "excused") stats.excused++;
      });

      return { ...att.toObject(), records: filteredRecords };
    });

    stats.averageAttendance = stats.total
      ? ((stats.present / stats.total) * 100).toFixed(1)
      : 0;

    res.status(200).json({ success: true, data: attendances, stats });
  } catch (error) {
    console.error("getAttendanceReports error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find({});
    res.status(200).json({ success: true, data: batches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📄 In attendanceController.js
exports.getAttendanceStats = async (req, res) => {
  try {
    const { batchId } = req.params;
    if (!batchId) {
      return res.status(400).json({ success: false, message: "Batch ID is required" });
    }

    const allAttendances = await Attendance.find({ batch: batchId }).populate("records.studentId", "name email");

    if (!allAttendances.length)
      return res.status(404).json({ success: false, message: "No attendance records found" });

    // Create map: studentId -> { present, total }
    const stats = {};

    allAttendances.forEach(att => {
      att.records.forEach(rec => {
        const id = rec.studentId?._id?.toString();
        if (!id) return;

        if (!stats[id]) {
          stats[id] = {
            student: rec.studentId,
            present: 0,
            total: 0
          };
        }

        if (rec.status !== "unmarked") stats[id].total++;
        if (rec.status === "present") stats[id].present++;
      });
    });

    // Convert to array and sort by lowest percentage
    const result = Object.values(stats)
      .map(s => ({
        student: s.student,
        present: s.present,
        total: s.total,
        percentage: s.total ? ((s.present / s.total) * 100).toFixed(1) : "0.0"
      }))
      .sort((a, b) => a.percentage - b.percentage);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("getAttendanceStats error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
