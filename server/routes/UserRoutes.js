const express = require("express");
const { xacThucNguoiDung } = require("../middleware/authMiddleware");
const { User } = require("../models/User");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Cấu hình Multer để upload ảnh đại diện
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

// API endpoint hiện tại - Lấy thông tin người dùng
router.get("/me", xacThucNguoiDung, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-matKhau")
      .populate("role");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    res.json({ user });
  } catch (error) {
    console.error("Lỗi server:", error.message);
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
});

// API cập nhật thông tin người dùng
router.put(
  "/update-profile",
  xacThucNguoiDung,
  upload.single("anhDaiDien"),
  [
    body("hoTen").notEmpty().withMessage("Họ tên không được để trống"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("soDienThoai")
      .notEmpty()
      .withMessage("Số điện thoại không được để trống")
      .isMobilePhone("vi-VN")
      .withMessage("Số điện thoại không hợp lệ"),
    body("diaChi").optional(),
    body("gioiTinh").optional().isIn(["Nam", "Nữ", "Khác"]).withMessage("Giới tính không hợp lệ"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { hoTen, email, soDienThoai, diaChi, gioiTinh } = req.body;
      const userId = req.user._id;

      // Kiểm tra email đã tồn tại chưa (nếu email thay đổi)
      if (email !== req.user.email) {
        const emailExists = await User.findOne({ email, _id: { $ne: userId } });
        if (emailExists) {
          return res.status(400).json({ message: "Email đã được sử dụng bởi tài khoản khác." });
        }
      }

      // Kiểm tra số điện thoại đã tồn tại chưa (nếu số điện thoại thay đổi)
      if (soDienThoai !== req.user.soDienThoai) {
        const phoneExists = await User.findOne({ soDienThoai, _id: { $ne: userId } });
        if (phoneExists) {
          return res.status(400).json({ message: "Số điện thoại đã được sử dụng bởi tài khoản khác." });
        }
      }

      // Cập nhật thông tin người dùng
      const updateData = {
        hoTen,
        email,
        soDienThoai,
        diaChi,
        gioiTinh,
      };

      // Nếu có upload ảnh mới
      if (req.file) {
        updateData.anhDaiDien = req.file.path;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select("-matKhau").populate("role");

      res.json({
        message: "Cập nhật thông tin thành công!",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error.message);
      res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
  }
);

// API đổi mật khẩu
router.put(
  "/change-password",
  xacThucNguoiDung,
  [
    body("matKhauHienTai").notEmpty().withMessage("Mật khẩu hiện tại không được để trống"),
    body("matKhauMoi")
      .notEmpty()
      .withMessage("Mật khẩu mới không được để trống")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu mới phải có ít nhất 6 ký tự")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage("Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"),
    body("xacNhanMatKhau")
      .notEmpty()
      .withMessage("Xác nhận mật khẩu không được để trống")
      .custom((value, { req }) => {
        if (value !== req.body.matKhauMoi) {
          throw new Error("Xác nhận mật khẩu không khớp");
        }
        return true;
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { matKhauHienTai, matKhauMoi } = req.body;
      const userId = req.user._id;

      // Lấy thông tin người dùng (bao gồm mật khẩu đã hash)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng." });
      }

      // Kiểm tra mật khẩu hiện tại
      const isMatch = await user.kiemTraMatKhau(matKhauHienTai);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
      }

      // Kiểm tra nếu mật khẩu mới giống mật khẩu cũ
      const isSameAsOld = await user.kiemTraMatKhau(matKhauMoi);
      if (isSameAsOld) {
        return res.status(400).json({ message: "Mật khẩu mới không được giống mật khẩu cũ." });
      }

      // Cập nhật mật khẩu mới
      user.matKhau = matKhauMoi;
      await user.save();

      res.json({ message: "Đổi mật khẩu thành công!" });
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error.message);
      res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
  }
);

module.exports = router;