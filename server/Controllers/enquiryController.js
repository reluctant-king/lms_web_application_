const enquiryModal = require("../modals/enquires")

exports.UserEnquiryie = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const data = await enquiryModal.create(req.body);
        res.status(200).json({
            message: "We will touch you",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAllEnquiry = async (req, res) => {
  try {
    let { page = 1, limit = 5, name } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; 
    }

    const totalItems = await enquiryModal.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await enquiryModal
      .find(query)
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data,
      totalItems,
      totalPages,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

