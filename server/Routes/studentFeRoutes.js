const express = require("express");
const { createStudentFee, getAllFeeStructore, getStudentFeeStructore, deleteFeeStructore } = require("../Controllers/StudentFeeController");
const router = express.Router();

router.post("/add_student_fee_structore", createStudentFee)
router.get("/get_all_student_fee", getAllFeeStructore)
router.route("/get_student_fee_structore/:id").get(getStudentFeeStructore).delete(deleteFeeStructore)
module.exports = router;