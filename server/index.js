const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
// const path = require("path")



dotenv.config({ path: "./Config/config.env" })



const authRoutes = require("./Routes/authRoutes");
const recordedVideoRoutes = require("./Routes/RecordedVideoRoutes");
const enquiryRoutes = require("./Routes/enquiryRoutes");
const courseRoutes = require("./Routes/courseRoutes");
const instituteRoutes = require("./Routes/institutionRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const courseCataRoutes = require("./Routes/courseCataRoutes");
const instructorRoutes = require("./Routes/instructorRoutes");
const quizroutres = require("./Routes/QuizRoutes")
const Attendence = require("./Routes/attendanceRoutes")
const feeStructoreRoutes = require("./Routes/feeStructoreRoutes");
const batchRoutes = require("./Routes/batchesRoutes");
const scheduleRoutes = require("./Routes/scheduleRoutes")
const studentFeeRoutes = require("./Routes/studentFeRoutes")
const paymentRoutes = require("./Routes/paymentRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");
const ticketRoutes = require("./Routes/ticketRoutes");
const courseFeedbackRoutes = require("./Routes/courseFeedbackRoutes");
const lessionRoutes = require("./Routes/lessionRoute");
const assignmentRoutes = require("./Routes/assignmentRoutes");



const app = express()
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api/v1", authRoutes)
app.use("/api/v1", recordedVideoRoutes)
app.use("/api/v1", enquiryRoutes)
app.use("/api/v1", courseRoutes)
app.use("/api/v1", instituteRoutes)
app.use("/api/v1", studentRoutes)
app.use("/api/v1", courseCataRoutes)
app.use("/api/v1", instructorRoutes)
app.use("/api/v1", batchRoutes);
app.use("/api/v1", quizroutres)
app.use("/api/v1", Attendence)
app.use("/api/v1", scheduleRoutes);
app.use("/api/v1", feeStructoreRoutes);
app.use("/api/v1", studentFeeRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1/", ticketRoutes);
app.use("/api/v1", courseFeedbackRoutes);
app.use("/api/v1", lessionRoutes);
app.use("/api/v1", assignmentRoutes);



mongoose.connect(process.env.DATA_BASE_URL)



app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

});




