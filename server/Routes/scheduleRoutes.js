const express = require("express");
const { addSchedule, getAllSchedules } = require("../Controllers/courseScheduleController");
const router = express.Router();

router.post("/add_schedule", addSchedule)
router.get("/get_all_schedule", getAllSchedules)

module.exports = router