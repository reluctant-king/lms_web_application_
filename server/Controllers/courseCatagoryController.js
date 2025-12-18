const cateogry = require("../modals/cateogeries")

exports.addCourseCatagory = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const data = await cateogry.create(req.body);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.viewAllCourseCatago = async (req, res) => {
  try {
    const allCoursecategory = await cateogry.find()

    if (!allCoursecategory) {
      return res.status(401).json({
        success: false,
        message: "faild to fectch course category",
      });
    }
    res.status(200).json({
      success: true,
      allCoursecategory
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 };

exports.viewAllCourseCategories = async (req, res) => {
  try {
    const search = req.query.title || "";
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const data = await cateogry.find(query).lean();
    const totalItems = data.length;

    res.status(200).json({
      success: true,
      data,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
