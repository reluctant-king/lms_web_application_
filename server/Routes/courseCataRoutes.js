const express = require("express");
const { addCourseCatagory, viewAllCourseCatago , viewAllCourseCategories } = require("../Controllers/courseCatagoryController");
const router = express.Router();

router.post("/add_course_cateogry", addCourseCatagory)
router.get("/view_All_categories", viewAllCourseCatago)
 router.get("/view_All_course_categories", viewAllCourseCategories)


module.exports = router
