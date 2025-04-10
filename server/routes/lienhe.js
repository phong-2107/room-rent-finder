const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

/**
 * 📌 Gửi thông tin liên hệ qua email
 */
router.post("/", async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || name.trim().length < 3) {
        return res.status(400).json({ message: "Họ tên phải có ít nhất 3 ký tự." });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Email không hợp lệ." });
    }
    if (!phone) {
        return res.status(400).json({ message: "Vui lòng nhập số điện thoại." });
    }
    if (!/^\d+$/.test(phone)) {
        return res.status(400).json({ message: "Số điện thoại chỉ được chứa chữ số." });
    }
    if (phone.length < 10 || phone.length > 11) {
        return res.status(400).json({ message: "Số điện thoại phải có 10 hoặc 11 chữ số." });
    }
    if (!/^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/.test(phone)) {
        return res.status(400).json({ message: "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ." });
    }
    if (!message || message.trim().length < 10) {
        return res.status(400).json({ message: "Nội dung phải có ít nhất 10 ký tự." });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // TLS
        auth: {
            user: process.env.SMTP_USER, // Your email
            pass: process.env.SMTP_PASS, // App password
        },
    });

    const mailOptions = {
        from: `"TimTro24h.com" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL, // Admin email
        replyTo: email,
        subject: `Liên hệ mới từ ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <!-- Header with Logo -->
            <div style="background-color: #0061df; color: #fff; padding: 20px; text-align: center;">
              <img src="https://example.com/logo.png" alt="TimTro24h Logo" style="max-width: 150px; margin-bottom: 10px;" />
              <h2 style="margin: 0;">Thông tin liên hệ mới</h2>
            </div>

            <!-- Content Section -->
            <div style="padding: 20px;">
              <p style="margin: 0 0 10px;"><strong>Họ tên:</strong> ${name}</p>
              <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 10px;"><strong>Số điện thoại:</strong> ${phone}</p>
              <p style="margin: 0 0 10px;"><strong>Nội dung:</strong></p>
              <p style="margin: 0 0 10px; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 4px;">${message}</p>
            </div>

            <!-- Footer Section -->
            <div style="background-color: #f1f1f1; color: #666; text-align: center; padding: 10px; font-size: 14px;">
              <p style="margin: 0;">Email này được gửi tự động từ hệ thống TimTro24h.com</p>
            </div>
          </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Gửi thông tin liên hệ thành công!" });
    } catch (error) {
        console.error("Lỗi gửi email:", error.message);
        res.status(500).json({ message: "Không thể gửi thông tin liên hệ, vui lòng thử lại sau!" });
    }
});

module.exports = router;