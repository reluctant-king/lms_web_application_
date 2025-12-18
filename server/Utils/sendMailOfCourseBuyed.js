const nodMailer = require("nodemailer")

exports.sendMailToStudentEmail = async (email, courseName, studentName) => {
    try {
        const transporter = nodMailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.LMS_EMAIL,
                pass: process.env.LMS_PASSWORD
            },
        });

        const mailOptions = {
            from: `"LMS Learning" <${process.env.LMS_EMAIL}>`,
            to: email,
            subject: `🎉 Course Purchase Successful - ${courseName}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <h2>Hi ${studentName || "student"},</h2>
          <p>Congratulations! 🎉 You’ve successfully purchased the course:</p>
          <h3 style="color:#6d28d9;">${courseName}</h3>
          <p>You can now log in to your dashboard and start learning right away.</p>
          <hr />
          <p>Thanks for choosing <strong>LMS Learning</strong>.</p>
          <p>Happy Learning! 📘</p>
        </div>
      `,
        }

        await transporter.sendMail(mailOptions)
        console.log("✅ Mail sent successfully");
    } catch (error) {
        console.error("❌ Error sending mail:", error);

    }
}
