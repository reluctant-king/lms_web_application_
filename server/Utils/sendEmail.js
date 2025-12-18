// sendEmail.js
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.LMS_EMAIL,
    pass: process.env.LMS_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("Mailer setup error:", err);

});

// Generate professional PDF invoice
const generateInvoiceBuffer = ({ studentName, paymentId, date, items }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc.fontSize(20).text("Your LMS", { align: "center" }).moveDown();
    doc.fontSize(16).text("Invoice", { align: "center" }).moveDown();

    // Student info
    doc.fontSize(12)
      .text(`Student: ${studentName}`)
      .text(`Payment ID: ${paymentId}`)
      .text(`Date: ${date.toLocaleDateString()}`)
      .moveDown();

    // Table
    const tableTop = doc.y;
    doc.text("Course Details:", { underline: true }).moveDown(0.5);

    // Table header
    doc.text("Description", 50, doc.y);
    doc.text("Qty", 300, doc.y);
    doc.text("Price (₹)", 400, doc.y);
    doc.text("Total (₹)", 500, doc.y);
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    let y = doc.y + 5;
    let grandTotal = 0;

    items.forEach(item => {
      const total = item.quantity * item.price;
      grandTotal += total;

      doc.text(item.description, 50, y);
      doc.text(item.quantity, 300, y);
      doc.text(item.price.toFixed(2), 400, y);
      doc.text(total.toFixed(2), 500, y);
      y += 20;
    });

    // Grand total
    doc.moveTo(50, y).lineTo(550, y).stroke();
    doc.fontSize(14).text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 400, y + 10);

    // Footer
    doc.moveDown(4);
    doc.fontSize(10).fillColor("gray")
      .text("Thank you for learning with Your LMS! Enjoy your course.", { align: "center" });

    doc.end();
  });
};

// Send payment confirmation email
const sendPaymentConfirmationEmail = async (to, order) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; background:#f9f9f9; padding:20px; border-radius:8px;">
        <h2 style="color:#4B0082; text-align:center;">🎉 Payment Successful!</h2>
        <p>Hi <strong>${order.studentName}</strong>,</p>
        <p>Thank you for purchasing the following course(s):</p>
        <table style="width:100%; border-collapse:collapse;">
          <tr style="background:#eee;">
            <th style="padding:8px; border:1px solid #ddd;">Course</th>
            <th style="padding:8px; border:1px solid #ddd;">Qty</th>
            <th style="padding:8px; border:1px solid #ddd;">Price (₹)</th>
          </tr>
          ${order.items.map(item => `
            <tr>
              <td style="padding:8px; border:1px solid #ddd;">${item.description}</td>
              <td style="padding:8px; border:1px solid #ddd;">${item.quantity}</td>
              <td style="padding:8px; border:1px solid #ddd;">${item.price.toFixed(2)}</td>
            </tr>`).join('')}
        </table>
        <p><strong>Payment ID:</strong> ${order.paymentId}</p>
        <p><strong>Date:</strong> ${order.date.toLocaleDateString()}</p>
        <p>The invoice is attached for your records.</p>
        <p style="text-align:center;">🚀 Enjoy learning with <strong>Your LMS</strong>!</p>
      </div>
    `;

    const pdfBuffer = await generateInvoiceBuffer(order);

    await transporter.sendMail({
      from: `"Your LMS" <${process.env.LMS_EMAIL}>`,
      to,
      subject: `Course Purchase Confirmation`,
      html,
      attachments: [{
        filename: `Invoice-${order.paymentId}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf"
      }]
    });

    console.log("✅ Payment confirmation email sent to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendPaymentConfirmationEmail;

