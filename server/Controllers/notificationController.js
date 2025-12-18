const Notification = require("../modals/Notification");
const Student = require("../modals/students");
const Instructor = require("../modals/instructor");
const Attendance = require("../modals/Attendence");
const jwt = require("jsonwebtoken");
const userModal = require("../modals/users");


exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, recipients } = req.body;

    // Determine recipients
    let users = [];
    if (recipients === "students") users = await Student.find({}, "email");
    else if (recipients === "instructors") users = await Instructor.find({}, "email");
    else users = [
      ...(await Student.find({}, "email")),
      ...(await Instructor.find({}, "email")),
    ];

    const emails = users.map(u => u.email);

    // Save to DB
    const notification = await Notification.create({
      type: "announcement",
      title,
      message,
      recipients: emails,
    });


    res.json({ success: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllNotification = async (req, res) => {
  try {

    const notification = await Notification.find().sort({ createdAt: -1 })

    if (!notification) {
      return res.status(401).json({
        success: fasle,
        message: "Faild to fetch notification"
      })
    }

    res.status(200).json({
      success: true,
      notification
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params

    const deltNotification = await Notification.findByIdAndDelete(id)

    if (!deltNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      // deltNotification
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting notification",
    });
  }
}

exports.getNotification = async (req, res) => {
  try {
    let { userId } = req.params

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Show students below attendance threshold
exports.getLowAttendanceStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const threshold = parseFloat(req.query.threshold) || 75;

    // 1️⃣ Fetch all attendance docs
    const attendances = await Attendance.find().populate("records.studentId", "name email");

    const studentStats = {};

    // 2️⃣ Build attendance stats
    attendances.forEach((att) => {
      att.records.forEach((rec) => {
        const sid = rec.studentId?._id?.toString();
        if (!sid) return;
        if (!studentStats[sid]) studentStats[sid] = { student: rec.studentId, present: 0, total: 0 };
        if (rec.status !== "unmarked") studentStats[sid].total++;
        if (rec.status === "present") studentStats[sid].present++;
      });
    });

    // 3️⃣ Calculate percentages
    const results = Object.values(studentStats).map((s) => ({
      name: s.student.name,
      email: s.student.email,
      percentage: s.total ? ((s.present / s.total) * 100).toFixed(1) : "0.0",
    }));

    // 4️⃣ Filter low attendance
    const lowStudents = results.filter((s) => parseFloat(s.percentage) < threshold);

    // 5️⃣ Pagination slice
    const totalItems = lowStudents.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginated = lowStudents.slice((page - 1) * limit, page * limit);

    res.status(200).json({
      success: true,
      count: totalItems,
      data: paginated,
      page,
      totalPages,
      totalItems,
    });
  } catch (err) {
    console.error("getLowAttendanceStudents error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Send Low Attendance Notifications
exports.sendLowAttendance = async (req, res) => {
  try {
    const { message, threshold } = req.body;

    // Fetch all students
    const students = await Student.find({});

    const lowAttendanceStudents = [];

    for (let student of students) {
      // Fetch attendance for this student
      const records = await Attendance.find({ studentId: student._id });
      const total = records.length;
      const presentCount = records.filter(r => r.present).length;
      const percentage = total ? (presentCount / total) * 100 : 0;

      if (percentage < threshold) {
        lowAttendanceStudents.push(student.email); // or student ID if you prefer
      }
    }

    if (!lowAttendanceStudents.length) {
      return res.json({ success: false, message: "No students below threshold" });
    }

    // Save notification to DB
    const notification = await Notification.create({
      type: "low_attendance",
      title: "Low Attendance Alert", // add a default title
      message,
      recipients: lowAttendanceStudents,
    });


    res.json({ success: true, notification, recipients: lowAttendanceStudents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// notificationsController.js

// exports.getUserNotifications = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userType = req.user.role;

//     // Fetch notifications where the user is a recipient
//     const announcements = await Notification.find({
//       recipients: { $in: [req.user.email, userType] }
//     });


//     const notifications = announcements.map(n => ({
//       id: n._id,
//       type: n.type === "low_attendance" ? "info" : "success",
//       title: n.title,
//       message: n.message,
//       read: n.readBy.includes(userId),
//       timestamp: n.createdAt.toLocaleDateString(),
//     }));

//     if (userType === "student") {
//       const announcements = await Notification.find({
//         recipients: { $in: [req.user.email, req.user.role] }
//       });
//       notifications = announcements.map(n => ({
//         id: n._id,
//         type: n.type === "low_attendance" ? "info" : "success",
//         title: n.title,
//         message: n.message,
//         read: n.readBy.includes(userId),
//         timestamp: n.createdAt.toLocaleDateString(),
//       }));
//     }


//     res.json({ success: true, notifications });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ EDIT Announcement (Admin)
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { title, message },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    res.json({ success: true, message: "Announcement updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ MARK Notification As Read (Student/Instructor)
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    if (!notification.readBy.includes(userId)) {
      notification.readBy.push(userId);
      await notification.save();
    }

    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// // ✅ DELETE Notification (Student/Instructor)
// exports.deleteUserNotification = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userEmail = req.user.email;

//     const notification = await Notification.findById(id);
//     if (!notification) {
//       return res.status(404).json({ success: false, message: "Notification not found" });
//     }

//     // Remove this user from recipients array (soft delete)
//     notification.recipients = notification.recipients.filter(r => r !== userEmail);
//     await notification.save();

//     res.json({ success: true, message: "Notification removed for this user" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };