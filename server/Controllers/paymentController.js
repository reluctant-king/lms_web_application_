const Payment = require("../modals/paymentModel");
const User = require("../modals/users");
const Course = require("../modals/courses");
const razorpay = require("../Utils/razorpay")
const crypto = require("crypto");
const { sendMailToStudentEmail } = require("../Utils/sendMailOfCourseBuyed");


exports.createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed"
    });
  }
};

exports.savePayment = async (req, res) => {
  try {
    const { razorpay_payment_id, amount, razorpay_order_id, userEmail, courseId } = req.body;
    let paymentData = { ...req.body };

    const isAlreadyExist = await Payment.findOne({
      userEmail,
      courseId,
      status: "success"
    })

    if (isAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course"
      });
    }

    const isFree = !amount || amount === 0 || razorpay_order_id?.startsWith("FREE_COURSE_");
    if (!isFree && razorpay_payment_id && razorpay_payment_id.startsWith("pay_")) {
      try {
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

        paymentData.paymentMethod = paymentDetails.method || req.body.paymentMethod || null;
        paymentData.bank = paymentDetails.bank || req.body.bank || null;
        paymentData.wallet = paymentDetails.wallet || req.body.wallet || null;
        paymentData.vpa = paymentDetails.vpa || req.body.vpa || null;

      } catch (error) {
        console.error("Razorpay fetch failed:", error);
        return res.status(400).json({
          success: false,
          message: "Invalid Razorpay payment ID",
        });
      }
    } else {
      paymentData.paymentMethod = "Free Enrollment";
      paymentData.bank = null;
      paymentData.wallet = null;
      paymentData.vpa = null;
      paymentData.status = "success";
    }

    const payment = new Payment(paymentData);
    await payment.save();


    try {
      await sendMailToStudentEmail(
        paymentData.userEmail,
        paymentData.courseName,
        paymentData.studentName
      )
      console.log("Payment confirmation email sent");
    } catch (error) {
      console.error("Failed to send payment email:", error);
    }

    res.status(200).json({
      success: true,
      message: isFree ? "Free course saved successfully" : "Payment saved successfully",
      payment
    });

  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save payment"
    });
  }
};


exports.checkEnrollment = async (req, res) => {
  try {
    const { userEmail, courseId } = req.body;

    if (!userEmail || !courseId) {
      return res.status(400).json({
        success: false,
        message: "userEmail and courseId are required",
      });
    }

    const ifExist = await Payment.findOne({
      userEmail,
      courseId,
      status: "success"
    })
    res.status(200).json({
      success: true,
      enrolled: !!ifExist
    });
  } catch (error) {
    res.status(500).json({ enrolled: false, message: "Error checking enrollment" });
  }
}




exports.getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RazireKeyId
  })
}

exports.paymentVerification = async (req, res) => {

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, } = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignatore = crypto.createHmac("sha256", process.env.RazoreKeySecret).update(body.toString()).digest("hex")

  const isAuthenticate = razorpay_signature === expectedSignatore

  if (isAuthenticate) {

    // return res.redirect(`http://localhost:5174/payment_success?reference=${razorpay_payment_id}`)

  } else {
    res.status(400).json({

      success: false
    })
  }


  res.status(200).json({

    success: true
  })

}

exports.getAllPaymentDetails = async (req, res) => {

  try {
    const { studentName, status } = req.query

    if (status && !['all', 'pending', 'overdue', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status filter. Must be 'all', 'pending', 'overdue', or 'completed'"
      });
    }

    let query = {}
    if (studentName) {
      query.studentName = { $regex: studentName, $options: "i" }
    }
    const paymentDetails = await Payment.find(query)

    if (!paymentDetails) {
      return res.status(400).json({
        success: false,
        message: "Payment details not founf"
      })
    }

    let filteredPayments = paymentDetails;

    if (status && status !== 'all') {
      const currentDate = new Date();

      filteredPayments = paymentDetails.filter(payment => {

        const [month, day, year] = payment.date.split("/").map(Number);
        const paymentDate = new Date(year, month - 1, day);
        const dueDate = new Date(paymentDate);
        dueDate.setMonth(dueDate.getMonth() + 1);

        if (status === 'completed') {

          return !payment.hasMonthlyPayment;
        } else if (status === 'pending') {

          return payment.hasMonthlyPayment && currentDate <= dueDate;
        } else if (status === 'overdue') {

          return payment.hasMonthlyPayment && currentDate > dueDate;
        }

        return false;
      });
    }

    res.status(200).json({
      success: true,
      paymentDetails: filteredPayments,
      total: filteredPayments.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}




