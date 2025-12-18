const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,

    default: "N/A",
  },
  razorpay_payment_id: {
    type: String,

    default: "N/A",
  },
  courseId: {
    type: String,
    ref: "Course",
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: "User",
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString("en-US")
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    required: true
  },
  hasMonthlyPayment: {
    type: Boolean,
    default: false
  },
  monthlyAmount: {
    type: Number,
    default: 0
  },
  billingDetails: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    country: String,
    address: String,
    apartment: String,
    city: String,
    state: String,
    zipCode: String,

  },
  paymentMethod: { type: String },
  bank: { type: String },
  wallet: { type: String },
  vpa: { type: String },
  receiptNo: {
    type: String,
    unique: true,
  },
});
paymentSchema.pre("save", async function (next) {
  if (!this.receiptNo) {
    const count = await mongoose.model("payment").countDocuments();
    this.receiptNo = `RCPT-${String(count + 1).padStart(5, "0")}`;

  }
  next();
});

module.exports = mongoose.model("payment", paymentSchema);
