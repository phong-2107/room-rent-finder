const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { PhongTro } = require("../../models/PhongTro");
const { xacThucNguoiDung, kiemTraQuyen } = require("../../middleware/authMiddleware");

// ✅ Đường dẫn đến thư mục ảnh trong client
const clientImagePath = path.resolve(__dirname, "../../../client/public/assets/images");

// ✅ Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(clientImagePath)) {
    fs.mkdirSync(clientImagePath, { recursive: true });
}

// ✅ Cấu hình multer để lưu vào client/public/assets/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, clientImagePath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// ✅ Route: Đăng tin phòng trọ (Admin)
router.post(
    "/post",
    xacThucNguoiDung,
    kiemTraQuyen("DANG_TIN_PHONG_TRO"),
    upload.array("hinhAnh", 5), // Tối đa 5 hình
    async (req, res) => {
        try {
            const {
                tieuDe,
                diaChiCuThe,
                diaDiem,
                gia,
                dienTich,
                moTa,
                trangThai = "Còn trống",
            } = req.body;

            // ✅ Tạo đường dẫn ảnh cho frontend
            const hinhAnhPaths = req.files.map(file => `/assets/images/${file.filename}`);

            const newRoom = new PhongTro({
                tieuDe,
                diaChiCuThe,
                diaDiem,
                gia,
                dienTich,
                moTa,
                hinhAnh: hinhAnhPaths,
                nguoiDang: req.user._id,
                trangThai,
            });

            await newRoom.save();

            res.status(201).json({
                message: "Đăng tin phòng trọ thành công!",
                data: newRoom,
            });
        } catch (error) {
            console.error("❌ Lỗi khi đăng tin phòng:", error.message);
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }
);

// ✅ Xem tất cả phòng trọ đã đăng
router.get(
    "/",
    xacThucNguoiDung,
    kiemTraQuyen("QUAN_LY_PHONG_TRO"),
    async (req, res) => {
        try {
            const rooms = await PhongTro.find()
                .populate("diaDiem")
                .populate("nguoiDang")
                .sort({ createdAt: -1 });

            res.json(rooms);
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách phòng:", error.message);
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }
);

// ✅ Xem chi tiết phòng trọ theo ID
router.get(
    "/:id",
    xacThucNguoiDung,
    kiemTraQuyen("QUAN_LY_PHONG_TRO"),
    async (req, res) => {
        try {
            const room = await PhongTro.findById(req.params.id)
                .populate("diaDiem")
                .populate("nguoiDang");

            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng trọ" });
            }

            res.json(room);
        } catch (error) {
            console.error("❌ Lỗi khi lấy chi tiết phòng:", error.message);
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }
);

// ✅ Xóa phòng trọ theo ID
router.delete(
    "/:id",
    xacThucNguoiDung,
    kiemTraQuyen("QUAN_LY_PHONG_TRO"),
    async (req, res) => {
        try {
            const deleted = await PhongTro.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: "Phòng trọ không tồn tại" });
            }

            res.json({ message: "Xoá phòng trọ thành công!" });
        } catch (error) {
            console.error("❌ Lỗi khi xoá phòng:", error.message);
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }
);

module.exports = router;
