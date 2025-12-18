const studentFeeModal = require("../modals/studentFee")


exports.createStudentFee = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        courseId,
        courseName,
        userId,
        studentName,
        studentId,
        username,
        userEmail,
        amount,
        date,
        status,
        hasMonthlyPayment,
        monthlyAmount,
        billingDetails,
        paymentMethod,
        bank,
        wallet,
        vpa
    } = req.body;

    try {

        if (!studentName || !courseName || !amount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: studentName, courseName, or amount"
            });
        }


        const defaultBilling = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            address: "",
            apartment: "",
            city: "",
            state: "",
            zipCode: ""
        };

        const studentFee = await studentFeeModal.create({
            razorpay_order_id: razorpay_order_id || "N/A",
            razorpay_payment_id: razorpay_payment_id || "N/A",
            courseId,
            courseName,
            userId,
            studentName,
            studentId,
            username,
            userEmail,
            amount,
            date: date || new Date().toLocaleDateString("en-US"),
            status: status || "success",
            hasMonthlyPayment: hasMonthlyPayment || false,
            monthlyAmount: monthlyAmount || 0,
            billingDetails: { ...defaultBilling, ...billingDetails },
            paymentMethod: paymentMethod || "",
            bank: bank || "",
            wallet: wallet || "",
            vpa: vpa || ""
        });

        return res.status(201).json({
            success: true,
            message: "Successfully created student fee structure",
            studentFee
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getAllStudentFees = async (req, res) => {
    try {
      
        const studentFees = await studentFeeModal.find();

        if (!studentFees || studentFees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No student fees found"
            });
        }

        return res.status(200).json({
            success: true,
            studentFees
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.getAllFeeStructore = async (req, res) => {
    try {
        const { username  } = req.query

        let query = {}
        if (username ) {
            query.username  = { $regex: username , $options: "i" }
        }
        const feeStructore = await studentFeeModal.find(query)

        if (!feeStructore) {
            return res.status(400).json({ success: false, message: "Faild to fetch student fee structore" })
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

exports.getStudentFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const stufeeStructore = await studentFeeModal.findById(id)

        if (!stufeeStructore) {
            return res.status(400).json({ success: false, message: "fee structore not found" })

        }
        if (stufeeStructore) {
            res.status(200).json({
                success: true,
                stufeeStructore,
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const deleteFeeStructore = await studentFeeModal.findByIdAndDelete(id)
        if (!deleteFeeStructore) {
            return res.status(400).json({ success: false, message: "fee structore not found" })

        }
        if (deleteFeeStructore) {
            res.status(200).json({
                success: true,
                message: "Fee structore deleted successfuly",
            })
        }
    } catch (error) {

    }
}
