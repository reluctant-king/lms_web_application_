const Assignments = require("../modals/assignmentModal")
const SubmitAssign = require("../modals/assignmentSubbmitingSchema")
const Notification = require("../modals/Notification")
const User = require("../modals/users")
const payment = require("../modals/paymentModel")
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose")






exports.uploadAssignment = async (req, res) => {
  try {
    const { instructorId, course, title, description, deadline, maxMarks, selectedStudents } = req.body

    if (!instructorId || !title || !course || !description || !deadline || !maxMarks) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const parseData = typeof course === 'string' ? JSON.parse(course) : course;
    const courseId = new mongoose.Types.ObjectId(parseData.id);;
    const courseName = parseData.name;

    const assignment = await Assignments.create({
      instructorId,
      title,
      course: {
        id: courseId,
        name: courseName
      },
      description,
      deadline,
      maxMarks,
      assignedStudents: selectedStudents || []
    })

    console.log("Assignment created:", assignment._id);

    let targetStudentIds;
    if (selectedStudents && selectedStudents.length > 0) {
      targetStudentIds = selectedStudents;
      console.log("selected students:", selectedStudents.length);
    } else {

      const payments = await payment.find({
        courseId: new mongoose.Types.ObjectId(courseId),
      }).select("userId")

      console.log("found payment:", payments.length);

      if (!payments.length) {
        return res.status(200).json({
          success: true,
          message: "Assignment created but no enrolled students found",
          assignment,
          notificationsSent: 0
        });
      }

      targetStudentIds = [
        ...new Set(payments.map(p => p.userId.toString()))
      ];
    }


    const students = await User.find({
      _id: { $in: targetStudentIds },
      role: "student"
    });

    console.log("Students:", students.length);

    if (!students.length) {
      return res.status(200).json({
        success: true,
        message: "Assignment created but no valid student accounts found",
        assignment,
        notificationsSent: 0
      });
    }

    const notificationss = students.map(student => ({
      userId: student._id,
      type: "assignment",
      title: `New Assignment: ${title}`,
      message: `New assignment "${title}" posted in ${courseName}. Due: ${new Date(deadline).toLocaleDateString()}`,
      data: {
        assignmentId: assignment._id,
        courseId,
        courseName,
        dueDate: deadline,
        maxMarks,
        instructorId
      },
      isRead: false
    }));

    const uniqueNotifications = [
      ...new Map(
        notificationss.map(n => [
          n.userId.toString() + "-" + n.data.assignmentId.toString(),
          n
        ])
      ).values()
    ];

    const insertedNotifications = await Notification.insertMany(uniqueNotifications);
    console.log("Notifications sent:", insertedNotifications.length);
    res.status(200).json({
      success: true,
      message: "Assignment created & notifications sent to enrolled students",
      assignment,
      // notificationsSent: insertedNotifications.length
    })


  } catch (error) {
    console.error("Error in uploadAssignment:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
}

exports.getAllAssignments = async (req, res) => {
  try {
    const assignment = await Assignments.find().populate("course", "title");

    if (!assignment) {
      return res.status(400).json({
        success: false,
        message: "Faild to fetch assignment"
      })
    }

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.submitingAssignment = async (req, res) => {
  try {
    const { assignmentName, comment, userId } = req.body;


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Assignment file is required"
      });
    }
    const assignmentFile = req.file.path


    if (!assignmentName || !userId) {
      return res.status(400).json({
        success: false,
        message: "Assignment file name and userId are required"
      })
    }

    let parseAssignmentname

    try {
      if (typeof assignmentName === "string" && assignmentName.trim().startsWith("{")) {
        parseAssignmentname = JSON.parse(assignmentName);
      } else {
        parseAssignmentname = assignmentName
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignmentName format"
      });
    }

    const {instructorId: parsedInstructorId, title } = parseAssignmentname;


    const submiting = await SubmitAssign.create({
      assignmentName: title,
      instructorId:parsedInstructorId,
      comment,
      userId,
      assignmentFile
    })

    const instructors = await User.findOne({
      _id: parsedInstructorId,
      role: "instructor",
      isApproved: true
    });

    // console.log(instructors)

    if (instructors) {
      await Notification.create({
        userId: instructors._id,
        instructorId: instructors._id,
        type: "submitting assignment",
        title: "New Assignment Submitted",
        message: `A student submitted the assignment: ${title}`,
        data: {
          assignmentId: submiting._id,
          studentId: userId
        }
      })
    }

    res.status(200).json({
      success: true,
      message: "Successfully submited assignment",
      submiting
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getAllUserSubmittedAssignment = async (req, res) => {
  try {
    const userAssignment = await SubmitAssign.find();

    if (!userAssignment) {
      return res.status(400).json({
        success: false,
        message: "Faild to fetch user assignment"
      })
    }

    res.status(200).json({
      success: true,
      userAssignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.downliadfile = async (req, res) => {
  try {
    const fileName = req.params.fileName
    const filePath = path.join(__dirname, "../Flies/Assignment", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }

    res.setHeader("X-Success-Message", "Download started successfully")
    res.download(filePath);
  } catch (error) {
    console.error("Server error:", error);
  }
}

exports.getsubmittedAssignment = (req, res) => {

}


exports.updateSubmitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;
    if (!score) {
      return res.status(400).json({
        success: false,
        message: "Score is required"
      });
    }

    const scores = await SubmitAssign.findByIdAndUpdate(
      id,
      {
        $set: {
          isChecked: true,
          "score.0.score": score,
          "score.0.comment": comment
        }
      },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: "Grade submitted successfully",
      scores
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
