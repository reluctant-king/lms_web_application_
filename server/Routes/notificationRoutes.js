const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/jwtAuth");

const {
  createAnnouncement,
  sendLowAttendance,
  getLowAttendanceStudents,
 
  // getUserNotifications,
  deleteAnnouncement,
  updateAnnouncement,
  markNotificationAsRead,
  
  getAllNotification,
  deleteNotification,
  getNotification,
} = require("../Controllers/notificationController");

router.post("/announcementscreate", createAnnouncement);
router.post("/low-attendance", sendLowAttendance);
router.post("/low-attendance-list", getLowAttendanceStudents);
router.get("/all_notification", getAllNotification);
router.delete("/announcements/:id", deleteAnnouncement);
router.delete("/delete_notification/:id", deleteNotification);
router.get("/get_notification/:userId", getNotification);
router.put("/announcements/:id", updateAnnouncement);
// router.get("/usernotifications", authToken, getUserNotifications);
router.patch("/notifications/:id/read", authToken, markNotificationAsRead);
// router.delete("/notifications/:id", authToken, deleteUserNotification);

module.exports = router;
