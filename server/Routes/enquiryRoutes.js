const express = require("express");
const { UserEnquiryie, getAllEnquiry } = require("../Controllers/enquiryController");
const router = express.Router();


router.post("/user_enquiries", UserEnquiryie)
router.get("/getAll_enquiry", getAllEnquiry)

module.exports = router