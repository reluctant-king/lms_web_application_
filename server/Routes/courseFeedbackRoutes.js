const express = require("express");
const { sendCourseFeedback, getAllCourseFeedBack } = require("../Controllers/coursefeedbackController");
const router = express.Router();

router.post("/send_feedback", sendCourseFeedback)
router.get("/get_all_feedback", getAllCourseFeedBack)

module.exports = router