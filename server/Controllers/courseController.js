const courseModal = require("../modals/courses");
const Instructor = require("../modals/instructor");
const Payment = require("../modals/paymentModel");
const User = require("../modals/users");

// Create Course
exports.createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags,
            courseModules,
            image,
            instructor, 
            instructoremail,
            hasMonthlyPayment,
            monthlyAmount,
        } = req.body;

        if (!title || !description || !duration || !instructor || !instructoremail || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const formattedTags = typeof tags === "string" ? tags.split(",").map(tag => tag.trim()) : tags;

        const course = await courseModal.create({
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags: formattedTags || [],
            image,
            courseModules,
            instructor, 
            instructoremail,
            hasMonthlyPayment,
            monthlyAmount,
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get All Courses
exports.getAllCourse = async (req, res) => {
  try {
    const {
      title = '',
      category = '',
      price = '',
      duration = '',
      page = 1,
      limit = 8,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {
      ...(title && { title: { $regex: title.trim(), $options: 'i' } }),
      ...(category && { category: { $regex: category.trim(), $options: 'i' } })
    };

    if (price) {
      const [min = 0, max = 999999] = price.split('-').map(p => parseInt(p.trim()));
      query.price = { $gte: min, $lte: max };
    }

    if (duration) {
      const durations = { Short: { $lt: 2 }, Medium: { $gte: 3, $lte: 4 }, Long: { $gte: 6, $lte: 12 } };
      query.durationMonths = durations[duration] || {};
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const allowedSortFields = ['createdAt', 'price', 'title', 'rating', 'updatedAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sort = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    const totalCourses = await courseModal.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limitNum) || 1;

    const courses = await courseModal.find(query).sort(sort).skip(skip).limit(limitNum).lean();

    res.status(200).json({
      success: true,
      courses: courses || [],
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCourses,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('getAllCourse Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      courses: [],
      pagination: { currentPage: 1, totalPages: 1, totalCourses: 0, hasNextPage: false, hasPrevPage: false, limit: 8 }
    });
  }
};

// Get Single Course
exports.getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModal.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// Delete Course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModal.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, message: "Course deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Courses for Logged-in Instructor
// Get Paginated Courses for Logged-in Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Pagination inputs
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Optional Filters
    const search = req.query.search || "";
    const status = req.query.status || "all";
    const sortBy = req.query.sortBy || "createdAt"; // createdAt, students, revenue
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const instructor = await Instructor.findOne({ userId });
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor profile not found",
      });
    }

    // ---------- Build Query ----------
    let query = { instructor: instructor._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (status !== "all") {
      query.status = status;
    }

    // Total items count
    const totalCourses = await courseModal.countDocuments(query);

    // ---------- Fetch Paginated Courses ----------
    let courses = await courseModal
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    // Add enrolled students count to each course
    const finalCourses = await Promise.all(
      courses.map(async (course) => {
        const enrolled = await Payment.countDocuments({
          courseId: course._id.toString(),
          status: "success",
        });

        return { ...course._doc, students_count: enrolled };
      })
    );

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      courses: finalCourses,
    });

  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



// Update Course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        const course = await courseModal.findById(id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (req.user.role === 'instructor') {

            const instructorProfile = await Instructor.findOne({ 
                userId: req.user._id 
            });
            
            if (!instructorProfile) {
                return res.status(403).json({
                    success: false,
                    message: "Instructor profile not found"
                });
            }
            
            if (!course.instructor || course.instructor.toString() !== instructorProfile._1d?.toString?.()) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to update this course"
                });
            }
        }
        
        if (req.body.tags && typeof req.body.tags === "string") {
            req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
        }

        const updatedCourse = await courseModal.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Create Course
exports.createInstructorCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags,
            courseModules,
            image,
            instructorName,
            instructorBio,
            hasMonthlyPayment,
            monthlyAmount,
        } = req.body;

        if (!title || !description || !duration || !category) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        const instructorProfile = await Instructor.findOne({ 
            userId: req.user._id 
        });
        
        if (!instructorProfile) {
            return res.status(400).json({ 
                success: false, 
                message: "Please complete your instructor profile first" 
            });
        }

        const formattedTags = typeof tags === "string" 
            ? tags.split(",").map(tag => tag.trim()) 
            : tags;

        const course = await courseModal.create({
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags: formattedTags || [],
            image,
            courseModules,
            instructor: instructorProfile._id,  
            instructorName: instructorName || instructorProfile.name,
            instructorBio: instructorBio || instructorProfile.bio,
            hasMonthlyPayment,
            monthlyAmount,
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    const payments = await Payment.find({
      courseId,
      status: "success",
    }).select("studentName userEmail date createdAt");

    const students = payments.map((p) => ({
      _id: p._id,
      name: p.studentName,
      email: p.userEmail,
      enrolledAt: p.date || p.createdAt,
    }));

    res.status(200).json({
      success: true,
      students,
    });

  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

