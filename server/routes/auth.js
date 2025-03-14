const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { User } = require("../models/User");
const { Role } = require("../models/Role");

const router = express.Router();

/* 📌 Cấu hình Multer để upload ảnh đại diện */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

/* 📌 API Đăng ký Người Dùng */
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        const { hoTen, email, password, loaiUser } = req.body;
        const profileImage = req.file ? req.file.path : "";

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email đã được sử dụng!" });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Xác định role mặc định
        let role;
        if (loaiUser === "Admin") {
            role = await Role.findOne({ tenRole: "Admin" });
        } else if (loaiUser === "NhanVien") {
            role = await Role.findOne({ tenRole: "Nhân viên" });
        } else {
            role = await Role.findOne({ tenRole: "Khách hàng" });
        }

        if (!role) {
            return res.status(400).json({ message: "Loại người dùng không hợp lệ!" });
        }

        // Tạo người dùng mới
        const newUser = new User({
            hoTen,
            email,
            matKhau: hashedPassword,
            anhDaiDien: profileImage,
            loaiUser,
            role: role._id,
        });

        // Lưu người dùng vào database
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng ký!", error: error.message });
    }
});

/* 📌 API Đăng nhập */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ email }).populate("role");
        if (!user) {
            return res.status(404).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        // So sánh mật khẩu bằng phương thức `kiemTraMatKhau()`
        const isMatch = await user.kiemTraMatKhau(password);
        if (!isMatch) {
            console.log("❌ Mật khẩu không đúng!");
            console.log("pass nhập: ", password);
            console.log("matKhau user: ", user.matKhau);
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        console.log("✅ Mật khẩu đúng!");

        // Tạo token JWT (Bắt lỗi nếu có)
        let token;
        try {
            token = jwt.sign(
                { id: user._id, role: user.role.tenRole },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
        } catch (jwtError) {
            console.error("❌ Lỗi khi tạo JWT Token:", jwtError.message);
            return res.status(500).json({ message: "Lỗi hệ thống khi tạo token!" });
        }

        // Không gửi mật khẩu về client
        const userResponse = { ...user.toObject(), matKhau: undefined };

        console.log("✅ Đăng nhập thành công! Trả về token.");
        res.status(200).json({ token, user: userResponse });
    } catch (error) {
        console.error("❌ Lỗi trong quá trình đăng nhập:", error.message);
        res.status(500).json({ message: "Lỗi đăng nhập!", error: error.message });
    }
});
/* 📌 API Lấy Thông Tin Người Dùng */
router.get("/me", async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Không có token, từ chối truy cập!" });
        }

        // Giải mã token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).populate("role");

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        res.json({ user });
    } catch (error) {
        res.status(401).json({ message: "Token không hợp lệ!" });
    }
});

module.exports = router;
