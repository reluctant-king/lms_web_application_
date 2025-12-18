const express = require("express");
const { createFeeSteuctore, getAllFeeStructore, getFeeStructore, deleteFeestructore ,getEnrollments} = require("../Controllers/feeStructore");
const router = express.Router();

router.post("/create_fee_structore", createFeeSteuctore)
router.get("/get_all_fee_structorre", getAllFeeStructore)
router.route("/get_fee_structore/:id").get(getFeeStructore).delete(deleteFeestructore)
router.get("/enrollments", getEnrollments);

module.exports = router