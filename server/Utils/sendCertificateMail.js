const nodeMailer = require("nodemailer")
const pdfDocument = require("pdfkit")
const { Readable } = require("stream")


exports.sendCertificatetoStudent = async (email, courseName, studentName) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.LMS_EMAIL,
        pass: process.env.LMS_PASSWORD
      }
    })

    const doc = new pdfDocument({ size: "A4", margin: 50 })
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));

    
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      const mailOptions = {
        from: `"LMS Learning" <${process.env.LMS_EMAIL}>`,
        to: email,
        subject: `Course Certificate - ${courseName}`,
        html: `
          <div style="font-family: Arial, sans-serif; color:#333;">
            <h2>Congratulations ${studentName || "Student"} 🎉</h2>
            <p>You’ve successfully completed the course:</p>
            <h3 style="color:#6d28d9;">${courseName}</h3>
            <p>Your course completion certificate is attached as a PDF.</p>
            <p>Keep learning and growing! 🚀</p>
            <hr />
            <p><strong>LMS Learning</strong></p>
          </div>
        `,
        attachments: [
          {
            filename: `${studentName}_Certificate.pdf`,
            content: pdfData,
            contentType: "application/pdf",
          },
        ]
      }

      await transporter.sendMail(mailOptions)
      console.log("✅ Certificate email sent successfully");
    })

    const pageWidth = doc.page.width;   // 841.89 for A4 landscape
    const pageHeight = doc.page.height; // 595.28 for A4 landscape

    // Background
    doc.rect(0, 0, pageWidth, pageHeight).fill("#ffffff");

    // Elegant border frame
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60)
       .lineWidth(3)
       .strokeColor("#c5a75b")
       .stroke();
    
    doc.rect(36, 36, pageWidth - 72, pageHeight - 72)
       .lineWidth(1)
       .strokeColor("#c5a75b")
       .stroke();

    // Decorative top corners
    const drawCorner = (x, y, flip) => {
        const m = flip ? -1 : 1;
        doc.save()
           .moveTo(x, y)
           .lineTo(x + (m * 30), y)
           .lineTo(x, y + 30)
           .closePath()
           .fillColor("#c5a75b")
           .fillOpacity(0.3)
           .fill()
           .restore();
    };
    
    drawCorner(50, 50, false);
    drawCorner(pageWidth - 50, 50, true);
    drawCorner(50, pageHeight - 50, false);
    drawCorner(pageWidth - 50, pageHeight - 50, true);

    // Title
    doc.fontSize(48)
       .fillColor("#000000")
       .font("Helvetica-Bold")
       .text("CERTIFICATE", 0, 80, { align: "center" });

    doc.fontSize(18)
       .fillColor("#c5a75b")
       .font("Helvetica-Bold")
       .text("OF INTERNSHIP", 0, 140, { align: "center" });

    // Decorative divider
    doc.moveTo(pageWidth / 2 - 100, 175)
       .lineTo(pageWidth / 2 + 100, 175)
       .strokeColor("#c5a75b")
       .lineWidth(2)
       .stroke();
    
    // Decorative elements
    doc.circle(pageWidth / 2 - 110, 175, 3).fillColor("#c5a75b").fill();
    doc.circle(pageWidth / 2 + 110, 175, 3).fillColor("#c5a75b").fill();

    // Certify text
    doc.fontSize(13)
       .fillColor("#555")
       .font("Helvetica")
       .text("This is to certify that", 0, 205, { align: "center" });

    // Student name
    doc.fontSize(32)
       .fillColor("#c5a75b")
       .font("Helvetica-Bold")
       .text(studentName || "Student Name", 0, 235, { align: "center" });
    
    doc.moveTo(pageWidth / 2 - 180, 280)
       .lineTo(pageWidth / 2 + 180, 280)
       .strokeColor("#c5a75b")
       .lineWidth(1)
       .stroke();

    // Description
    const desc = `has successfully completed the ${courseName} Internship Program organized by LMS Learning, comprising 4 months of structured training and project-based learning.`;

    doc.fontSize(12)
       .fillColor("#333")
       .font("Helvetica")
       .text(desc, 120, 305, {
           align: "center",
           width: pageWidth - 240,
           lineGap: 2,
       });

    // Date
    const issueDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    
    doc.fontSize(11)
       .fillColor("#555")
       .font("Helvetica-Bold")
       .text(`Date of Issue: ${issueDate}`, 0, 380, { align: "center" });

    // Signature
    const sigY = 430;
    
    doc.moveTo(pageWidth / 2 - 100, sigY)
       .lineTo(pageWidth / 2 + 100, sigY)
       .strokeColor("#000000")
       .lineWidth(1)
       .stroke();

    doc.fontSize(13)
       .fillColor("#000000")
       .font("Helvetica-Bold")
       .text("Muhammed Sajad KP", 0, sigY + 10, { align: "center" });

    doc.fontSize(10)
       .fillColor("#666")
       .font("Helvetica")
       .text("Head of Academic Affairs", 0, sigY + 28, { align: "center" });

    // Seal
    const sealX = pageWidth / 2 + 160;
    const sealY = sigY - 5;
    
    doc.circle(sealX, sealY, 35)
       .lineWidth(3)
       .strokeColor("#c5a75b")
       .stroke();
    
    doc.circle(sealX, sealY, 28)
       .lineWidth(1)
       .strokeColor("#c5a75b")
       .stroke();
    
    doc.fontSize(10)
       .fillColor("#c5a75b")
       .font("Helvetica-Bold")
       .text("LMS", sealX - 18, sealY - 12, { width: 36, align: "center" });
    
    doc.fontSize(8)
       .fillColor("#c5a75b")
       .font("Helvetica")
       .text("CERTIFIED", sealX - 22, sealY + 3, { width: 44, align: "center" });

    // Footer
    doc.moveTo(pageWidth / 2 - 120, 510)
       .lineTo(pageWidth / 2 + 120, 510)
       .strokeColor("#c5a75b")
       .lineWidth(1)
       .stroke();
    
    doc.fontSize(11)
       .fillColor("#000")
       .font("Helvetica-Bold")
       .text("LMS LEARNING", 0, 525, { align: "center" });
    
    doc.fontSize(9)
       .fillColor("#666")
       .font("Helvetica")
       .text("Excellence in Education", 0, 542, { align: "center" });

    // MUST call end() to finalize
    doc.end();
  } catch (error) {
    console.error("Error sending certificate email:", error);
  }
}




















