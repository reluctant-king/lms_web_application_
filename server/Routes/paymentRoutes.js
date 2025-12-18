const express = require("express");
const { createPayment, savePayment, getKey, paymentVerification, getAllPaymentDetails, checkEnrollment } = require("../Controllers/paymentController");
const router = express.Router();

router.post("/create_payment", createPayment);
router.post("/save_db", savePayment);
router.get("/get_key", getKey)
router.post("/order_success", paymentVerification)
router.get("/get_all_payment_details", getAllPaymentDetails)

router.post("/check_enrollment", checkEnrollment)


module.exports = router;
