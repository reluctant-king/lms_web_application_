const batchmodals = require("../modals/batches"); 

exports.createBatch = async (req, res) => {
    try {
        const {
            batchName,
            batchCode,
            course,
            instructor,
            mode,
            maxSeats,
            status,
            startDate,
            endDate,
            duration,
            daysOfWeek,
            classStart,
            classEnd,
            timeZone,
            venue,
            address,
            mapsLink,
            description,
            notes,
            banner
        } = req.body;

        if (!batchName || !batchCode || !course || !instructor) {
            return res.status(400).json({
                message: "Batch Name, Batch Code, Course, and Instructor are required",
            });
        }

        const batch = await batchmodals.create(req.body);

        res.status(200).json({
            success: true,
            message: "Batch created successfully",
            data: batch,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.viewAllBatches = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const batchName = req.query.batchName || "";
        const status = req.query.status || "";

        let query = {};
        if (batchName) query.batchName = { $regex: batchName, $options: "i" };
        if (status) query.status = status;

        const totalItems = await batchmodals.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        const batches = await batchmodals.find(query)
            .populate("course", "title")
            .populate("instructor", "name")
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: batches,
            page,
            totalPages,
            totalItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllBatches = async (req, res) => {
  try {
    const batches = await batchmodals
      .find()
      .populate("course", "title")
      .populate("instructor", "name");

    res.status(200).json({ success: true, data: batches });
  } catch (error) {
    console.error("Error in getAllBatches:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};