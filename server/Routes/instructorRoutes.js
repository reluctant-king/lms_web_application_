const express = require("express");
const {  addInstructor, 
  viewInstructors,
  addInstructorDetails,
  getInstructorDetails,
  updateInstructorDetails,
  deleteInstructorDetails  } = require("../Controllers/instructorController");
// const { authToken } = require("../middleware/jwtAuth");
const router = express.Router();

router.post("/add_instructor", addInstructor)
router.post("/add_instructor_details", addInstructorDetails)
router.get("/get_instructor_details", getInstructorDetails) 
router.put("/update_instructor_details", updateInstructorDetails)
router.delete("/delete_instructor_details/:id", deleteInstructorDetails)

router.get("/view_instructor", viewInstructors)
// router.route("/get_instructor/:id").get(getInstructer).delete(deleteInstructor)

module.exports = router

