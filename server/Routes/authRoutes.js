// routes/authRoutes.js (or whatever your file is named)

const express = require("express");
const { 
    signup, 
    login, 
    getAllUsers, 
    forgotPassword, 
    resetPAssword, 
    getUser, 
    deleteUser, 
    getMe, 
    logout, 
    updateUsers,
    getPendingInstructors,
    approveInstructor,
    rejectInstructor,
    getInstructorsByStatus,
    getAllApprovedInstrecters
} = require("../Controllers/authController");
const { authToken } = require("../middleware/jwtAuth");

const router = express.Router();


router.post("/sign_up", signup)
router.post("/login", login)
router.get("/get_all_user", getAllUsers)
router.route("/get_user/:id").get(getUser).delete(deleteUser).put(updateUsers)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password/:token", resetPAssword)
router.get("/me", authToken, getMe);
router.post("/logout", logout)


router.get("/pending_instructors", getPendingInstructors)
router.post("/approve_instructor", approveInstructor)
router.post("/reject_instructor", rejectInstructor)
router.get("/instructors_by_status", getInstructorsByStatus)
router.get("/get_all_approved_instrectors", getAllApprovedInstrecters)

module.exports = router