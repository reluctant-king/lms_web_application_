const express = require("express");
const { createCourse, getAllCourse, getCourse, deleteCourse ,getInstructorCourses, createInstructorCourse, updateCourse ,getCourseStudents} = require("../Controllers/courseController");
const { authToken } = require("../middleware/jwtAuth");
const router = express.Router();


router.post("/create_course", createCourse)
// router.get("/get_all_courses", authToken, getAllCourse)
router.route("/get_all_courses").get(getAllCourse)
router.route("/get_course/:id").get(getCourse).delete(deleteCourse)

router.get('/my-courses', authToken, getInstructorCourses); 
router.post('/create-course', authToken, createInstructorCourse); 
router.put('/update-course/:id', authToken, updateCourse); 
router.get("/course_students/:id", getCourseStudents);

module.exports = router

    
    
    