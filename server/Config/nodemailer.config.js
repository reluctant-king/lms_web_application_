import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.LMS_EMAIL,
    pass: process.env.LMS_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer setup error:", err);
  } else {
    console.log("✅ Mailer ready to send emails");
  }
});

export default transporter;
