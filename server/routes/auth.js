const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
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
                matKhau: password, // Sẽ được hash trong hook pre("save")
                anhDaiDien: profileImage,
                role: role._id,
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
        body("email").isEmail().withMessage("Email không hợp lệ"),
        body("password").notEmpty().withMessage("Password không được để trống"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;

            // 1. Tìm user
            const user = await User.findOne({ email }).populate("role");
            if (!user) {
                return res.status(404).json({ message: "Email hoặc mật khẩu không đúng!" });
            }

            // 3. Kiểm tra mật khẩu
            const isMatch = await user.kiemTraMatKhau(password);
            if (!isMatch) {
                // Mật khẩu sai
                user.loginAttempts += 1;

                // Sau 5 lần sai liên tiếp, lock 30 phút (chẳng hạn)
                if (user.loginAttempts >= 5) {
                    user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 phút
                }

                await user.save();
                return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
            }

            // 4. Đúng password => reset loginAttempts, lockUntil
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();

            // 5. Tạo token
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role?.tenRole || "User",
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // 6. Không gửi mật khẩu về client
            const userResponse = { ...user.toObject() };
            delete userResponse.matKhau;

            res.status(200).json({ token, user: userResponse });
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error.message);
            res.status(500).json({ message: "Lỗi đăng nhập!", error: error.message });
        }
    }
);

router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Đăng xuất thành công" });
});

module.exports = router;
