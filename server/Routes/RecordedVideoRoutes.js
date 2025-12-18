const express = require("express");
const { addRecordVideo, getAllRecordedVideos, getrecordedVideo, upDatedRecordedVideo } = require("../Controllers/RecordedVideoController");
const router = express.Router();

router.post("/upload_recorded_video", addRecordVideo)
router.get("/get_all_records", getAllRecordedVideos)
router.route("/get_recoeded_video/:id").get(getrecordedVideo).put(upDatedRecordedVideo)

module.exports = router