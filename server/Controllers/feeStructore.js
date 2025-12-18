const feeStructoreModal = require("../modals/feeStructore")
const User = require("../modals/users");
const Course = require("../modals/courses");


exports.createFeeSteuctore = async (req, res) => {
    try {
        const { name, batch, year, totalFee, feeBreakDown, installment } = req.body;

        if (!name || !batch || !year || !totalFee || !installment) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const feeStructore = await feeStructoreModal.create({
            name,
            batch,
            year,
            totalFee,
            feeBreakDown,
            installment
        })

        if (!feeStructore) {
            return res.status(404).json({
                success: false,
                mesage: "Fee structure creating faild"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fee structure created successfully",
            feeStructore
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllFeeStructore = async (req, res) => {
    try {
        const { name } = req.query

        let query = {}
        if (name) {
            query.name = { $regex: name, $options: "i" }
        }
        const feeStructore = await feeStructoreModal.find(query)

        if (!feeStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            feeStructore,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const fiiStructore = await feeStructoreModal.findById(id)

        if (!fiiStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            fiiStructore,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteFeestructore = async (req, res) => {
    const { id } = req.params
    try {
        const deleteStructore = await feeStructoreModal.findByIdAndDelete(id)

        if (!deleteStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fee structore successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getEnrollments = async (req, res) => {
  try {
    const payments = await FeeStructure.find()
      .populate("userId", "firstname lastname email") // if user is referenced
      .populate("courseId", "title category price"); // if course is referenced

    const enrollments = payments.map(payment => ({
      enrollmentId: payment._id,
      course: payment.courseId?.title || "N/A",
      student: payment.userId ? `${payment.userId.firstname} ${payment.userId.lastname}` : "N/A",
      email: payment.userId?.email || "N/A",
      date: payment.createdAt.toLocaleDateString("en-US"),
      status: payment.status || "success",
    }));

    res.json({ success: true, data: enrollments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
