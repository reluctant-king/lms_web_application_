const recordedVideoModal = require("../modals/recordedVideos")

exports.addRecordVideo = async (req, res) => {
  try {
    const { video, title, image } = req.body;

    if (!video || !title || !image) {
      return res.status(400).json({
        message: "Faild to upload video",
      });
    }

    const data = await recordedVideoModal.create(req.body);
    res.status(200).json({
      message: "Successfully uploaded",
      data,
    });
  } catch (error) {

  }
}

exports.getAllRecordedVideos = async (req, res) => {
  try {

    const totalItems = await recordedVideoModal.find();

    if (!totalItems) {
      return res.status(400).json({
        success: false,
        message: "Faild to fetch recorded video",
      });
    }

    if (totalItems) {
      res.status(200).json({
        success: true,
        totalItems,

      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getrecordedVideo = async (req, res) => {
  const { id } = req.params

  try {
    const item = await recordedVideoModal.findById(id)

    if (!item) {
      return res.status(404).json({
        success: true,
        message: "Recorded video not found"
      })
    }

    res.status(200).json({
      successs: true,
      item,

    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.upDatedRecordedVideo = async (req, res) => {
  try {
    const { id } = req.params
    const recordedVideo = await recordedVideoModal.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    if (!recordedVideo) {
      return res.status(404).json({
        success: false,
        message: "Recorded video not found"
      })
    }

    res.status(200).json({
      success: true,
      recordedVideo,
      message: "Recorded video updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
