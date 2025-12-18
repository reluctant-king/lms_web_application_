const instructorModel = require("../modals/instructor");

// Generate Instructor ID
const generateInstructorId = async () => {
  const lastInstructor = await instructorModel.findOne({}).sort({ _id: -1 });
  if (!lastInstructor || !lastInstructor.instructorId) return "INS001";

  const lastNum = parseInt(lastInstructor.instructorId.replace("INS", ""));
  const newNum = lastNum + 1;
  return "INS" + newNum.toString().padStart(3, "0");
};

// ADMIN: Add Instructor
exports.addInstructor = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      bio,
      image,
      specialization,
      experience,
      qualification,
      linkedin,
      github,
      website,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !bio ||
      !phone ||
      !image ||
      !specialization ||
      !experience ||
      !qualification
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const data = await instructorModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Instructor added successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.viewInstructors = async (req, res) => {
  try {
    const { page = 1, limit = 1000, search } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await instructorModel.countDocuments(query);
    const data = await instructorModel
      .find(query)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.addInstructorDetails = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      bio,
      image,
      specialization,
      experience,
      qualification,
      linkedin,
      github,
      website,
    } = req.body;

    if (!name || !email || !bio) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Bio are required",
      });
    }

    // Authentication check
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // check duplicate using userId
    const existingInstructor = await instructorModel.findOne({
      userId: req.user._id,
    });

    if (existingInstructor) {
      return res.status(400).json({
        success: false,
        message: "Instructor profile already exists.",
      });
    }

  
    const instructorId = await generateInstructorId();

   
    const instructor = await instructorModel.create({
      userId: req.user._id, // Save userId for proper linking
      instructorId,
      name,
      email,
      phone,
      accountRegisteredEmail: req.user.email, // Save account registered email for proper linking
      bio,
      image,
      specialization,
      experience,
      qualification,
      linkedin,
      github,
      website,
    });

    res.status(200).json({
      success: true,
      message: "Instructor details added successfully",
      data: instructor,
    });
  } catch (error) {
    console.error("Error creating instructor profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getInstructorDetails = async (req, res) => {
  try {
   
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

   
    const instructorDetails = await instructorModel.findOne({
      userId: req.user._id,
    });

    if (!instructorDetails) {
      return res.json({
        success: true,
        instructorDetails: null,
        message: "No instructor details found",
      });
    }

    res.status(200).json({
      success: true,
      instructorDetails,
    });
  } catch (error) {
    console.error("Error fetching instructor details:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateInstructorDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await instructorModel.findById(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

  
    if (req.user && req.user.role === "instructor") {
      const isOwner =
        instructor.userId &&
        instructor.userId.toString() === req.user._id.toString();

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this profile",
        });
      }
    }

    const updatedInstructor = await instructorModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Instructor updated successfully!",
      data: updatedInstructor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteInstructorDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await instructorModel.findByIdAndDelete(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Instructor deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
