const express = require("express");
const { createBatch, viewAllBatches , getAllBatches } = require("../Controllers/batchesController");
const router = express.Router();

router.post("/create_batch", createBatch);
router.get("/view_all_batches", viewAllBatches);
router.get("/get_all_batches", getAllBatches);

module.exports = router;

