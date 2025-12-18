const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.LMS_EMAIL,
    pass: process.env.LMS_PASSWORD,
  },
});

const sendPasswordResetEmail = async (to, resetUrl, firstname) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; background:#f9f9f9;">
        <h2 style="color:#4B0082;">Password Reset Request</h2>
        <p>Hi <strong>${firstname}</strong>,</p>
        <p>You requested a password reset. Click the button below to set a new password. This link is valid for 15 minutes.</p>
        <p style="text-align:center; margin:30px 0;">
          <a href="${resetUrl}" 
            style="display:inline-block; padding:10px 20px; background:#4B0082; color:white; text-decoration:none; border-radius:5px; margin-top:20px;">
            Reset Password
          </a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>🚀 Happy Learning!<br/><strong>Your LMS Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Your LMS" <${process.env.LMS_EMAIL}>`,
      to,
      subject: "Password Reset",
      html,
    });

    console.log("✅ Password reset email sent to", to);
  } catch (error) {
    console.error(" Error sending password reset email:", error);
  }
};

module.exports = sendPasswordResetEmail;
