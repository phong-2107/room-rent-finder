const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const { User } = require("../models/User");
const { Role } = require("../models/Role");

const router = express.Router();

// ------------------ Cấu hình Multer upload ảnh đại diện ------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
    fileFilter: (req, file, cb) => {
        // Chỉ cho phép jpg, png
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("File không hợp lệ! Chỉ chấp nhận JPG, JPEG hoặc PNG."));
        }
    },
});


router.get("/Customer/count", async (req, res) => {
    try {
        const khachHangCount = await User.countDocuments().populate("role").where("role.tenRole").equals("Customer");

        res.status(200).json({ count: khachHangCount });
    } catch (err) {
        console.error("Lỗi khi đếm khách hàng:", err.message);
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
});

// ------------------ API Đăng ký ------------------
router.post(
    "/register",
    upload.single("profileImage"),
    // Validation dữ liệu đầu vào
    [
        body("hoTen").notEmpty().withMessage("Họ tên không được để trống"),
        body("email").isEmail().withMessage("Email không hợp lệ"),
        body("password").isLength({ min: 6 }).withMessage("Mật khẩu phải >= 6 ký tự"),
        body("roleName").notEmpty().withMessage("RoleName không được để trống"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { hoTen, email, password, roleName, soDienThoai } = req.body;
            const profileImage = req.file ? req.file.path : "";

            // 1. Kiểm tra user tồn tại qua email
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "Email đã được sử dụng!" });
            }

            // 2. Tìm role
            //    - roleName có thể là "Admin", "KhachHang", "NhanVien" hoặc bất kỳ tên nào bạn định nghĩa
            const role = await Role.findOne({ tenRole: roleName });
            if (!role) {
                return res.status(400).json({ message: `Role '${roleName}' không hợp lệ!` });
            }

            // 3. Tạo user mới
            const newUser = new User({
                hoTen,
                email,
                soDienThoai,
                matKhau: password,
                anhDaiDien: profileImage,
                role: role._id,
                taiKhoan: hoTen,
                loaiUser: roleName,
            });


            // 4. Lưu user vào DB
            await newUser.save();

            res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error.message);
            res.status(500).json({ message: "Lỗi đăng ký!", error: error.message });
        }
    }
);

// ------------------ API Đăng nhập ------------------

router.post(
    "/login",
    [
        body("taiKhoan").notEmpty().withMessage("Tài khoản không được để trống"),
        body("password").notEmpty().withMessage("Mật khẩu không được để trống"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { taiKhoan, password } = req.body;

            // Tìm người dùng theo tài khoản
            const user = await User.findOne({ taiKhoan }).populate("role");
            if (!user) {
                return res.status(404).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
            }

            // Kiểm tra nếu đang bị khóa
            if (user.lockUntil && user.lockUntil > Date.now()) {
                const remaining = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
                return res.status(403).json({
                    message: `Tài khoản bị khóa. Vui lòng thử lại sau ${remaining} phút.`,
                });
            }

            // Kiểm tra mật khẩu
            const isMatch = await user.kiemTraMatKhau(password);
            if (!isMatch) {
                user.loginAttempts = (user.loginAttempts || 0) + 1;
                if (user.loginAttempts >= 5) {
                    user.lockUntil = Date.now() + 30 * 60 * 1000; // khóa 30 phút
                }
                await user.save();
                return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
            }

            // Đăng nhập thành công
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();

            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role?.tenRole || "User",
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            const userResponse = { ...user.toObject() };
            delete userResponse.matKhau;
            delete userResponse.loginAttempts;
            delete userResponse.lockUntil;

            // Xác định đường dẫn điều hướng
            res.status(200).json({
                token,
                user: userResponse,
                role: user.role?.tenRole || "Customer",
            });
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.message);
            res.status(500).json({ message: "Lỗi máy chủ!", error: error.message });
        }
    }
);

/**
  API Quên mật khẩu
 */
  router.post(
    "/forgot-password",
    [
      body("email").isEmail().withMessage("Email không hợp lệ."),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { email } = req.body;
  
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "Email không tồn tại trong hệ thống." });
        }
  
        // Generate a new password
        const newPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password
  
        // Save the new password to the database (pre('save') will handle hashing)
        user.matKhau = newPassword; // Assign plain text password
        await user.save(); // The pre('save') hook will hash the password
  
        // Configure the email transport
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // TLS
          auth: {
            user: process.env.SMTP_USER, // Your email
            pass: process.env.SMTP_PASS, // App password
          },
        });
  
        // Email content
        const mailOptions = {
          from: `"Hệ thống TimTro24h" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Khôi phục mật khẩu",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2>Khôi phục mật khẩu</h2>
              <p>Mật khẩu mới của bạn là:</p>
              <p style="font-size: 18px; font-weight: bold; color: #0061df;">${newPassword}</p>
              <p>Vui lòng đăng nhập và thay đổi mật khẩu để bảo mật tài khoản.</p>
            </div>
          `,
        };
  
        // Send the email
        await transporter.sendMail(mailOptions);
  
        res.status(200).json({ message: "Mật khẩu mới đã được gửi đến email của bạn." });
      } catch (error) {
        console.error("Lỗi quên mật khẩu:", error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau." });
      }
    }
  );


router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Đăng xuất thành công" });
});

module.exports = router;
