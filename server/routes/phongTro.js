const express = require("express");
const { xacThucNguoiDung, kiemTraQuyen } = require("../middleware/authMiddleware");
const { PhongTro } = require("../models/PhongTro");

const router = express.Router();

/**
 * 📌 Xem danh sách phòng trọ (Khách hàng, Nhân viên, Admin đều có quyền)
 */
router.get("/", xacThucNguoiDung, kiemTraQuyen("XEM_PHONG_TRO"), async (req, res) => {
    try {
        const danhSachPhong = await PhongTro.find().populate("nguoiDang", "hoTen email");
        res.json(danhSachPhong);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách phòng trọ", error: error.message });
    }
});

/**
 * 📌 Thêm phòng trọ (Chỉ Nhân viên và Admin có quyền)
 */
router.post("/", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_PHONG_TRO"), async (req, res) => {
    try {
        const { tieuDe, diaChi, gia, dienTich, moTa, hinhAnh } = req.body;

        if (!tieuDe || !diaChi || !gia || !dienTich) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin phòng trọ!" });
        }

        const phongMoi = new PhongTro({
            tieuDe,
            diaChi,
            gia,
            dienTich,
            moTa,
            hinhAnh,
            nguoiDang: req.user.id,
        });

        await phongMoi.save();
        res.status(201).json({ message: "Thêm phòng trọ thành công!", phongMoi });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm phòng trọ", error: error.message });
    }
});

/**
 * 📌 Sửa phòng trọ (Chỉ Nhân viên và Admin có quyền)
 */
router.put("/:id", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_PHONG_TRO"), async (req, res) => {
    try {
        const { id } = req.params;
        const phongCapNhat = await PhongTro.findByIdAndUpdate(id, req.body, { new: true });

        if (!phongCapNhat) {
            return res.status(404).json({ message: "Không tìm thấy phòng trọ" });
        }

        res.json({ message: "Chỉnh sửa phòng trọ thành công!", phongCapNhat });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi chỉnh sửa phòng trọ", error: error.message });
    }
});

/**
 * 📌 Xóa phòng trọ (Chỉ Admin có quyền)
 */
router.delete("/:id", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_NGUOI_DUNG"), async (req, res) => {
    try {
        const { id } = req.params;
        const phongXoa = await PhongTro.findByIdAndDelete(id);

        if (!phongXoa) {
            return res.status(404).json({ message: "Không tìm thấy phòng trọ" });
        }

        res.json({ message: "Xóa phòng trọ thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa phòng trọ", error: error.message });
    }
});

module.exports = router;
