const express = require("express");
const path = require("path")
const upload = require("../Multer/fileUpload")
const { uploadAssignment, getAllAssignments, submitingAssignment, getAllUserSubmittedAssignment, downliadfile, updateSubmitAssignment } = require("../Controllers/uploadAssignments");
const router = express.Router();

router.post("/create_assignment", uploadAssignment)
router.get("/get_all_assignments", getAllAssignments)
router.post("/submit_assignment", (req, res, next)=>{
    req.uploadPath = path.join(__dirname, "../Flies/Assignment")
    next()
}, upload.single("file"), submitingAssignment)

router.get("/get_all_user_submitted_assignment", getAllUserSubmittedAssignment)
router.get("/download_assignment/:fileName", downliadfile)
router.put("/update_score/:id", updateSubmitAssignment)

module.exports = router
