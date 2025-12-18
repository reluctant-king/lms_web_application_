const express = require("express");
const { createLesson, getLessonByCourseid, createModuleQuizz, getAllQuizzes, getModuleQuiz, updateModuleQuizz, submitModuleQuiz, getAllSubmitAnswers, handleCourseCompetion, createCourseCompleters , getAllCompleters} = require("../Controllers/lessonsController");
const router = express.Router();

router.post("/create_lession", createLesson);
router.route("/get_lesson/:courseId").get(getLessonByCourseid)

router.post("/create_module_quizz", createModuleQuizz);
router.get("/get_all_module_quizz", getAllQuizzes);
router.route("/get_module_quiz/:id").get(getModuleQuiz).put(updateModuleQuizz)

router.post("/submiting_quiz", submitModuleQuiz);
router.get("/get_all_userSubmited_answer", getAllSubmitAnswers);

router.post("/course_completation_certificate", handleCourseCompetion);

router.post("/course_completers", createCourseCompleters);

router.get("/get_all_completers", getAllCompleters);


// 690c6c9661e384c3a7f51979


module.exports = router;
