const express = require("express");
const { KhachHang } = require("../models/KhachHang");
const { PhongTro } = require("../models/PhongTro");
const { xacThucNguoiDung } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * ✅ Thêm phòng trọ vào danh sách yêu thích
 */
router.post("/yeu-thich/:phongTroId", xacThucNguoiDung, async (req, res) => {
    try {
        const { phongTroId } = req.params;
        const userId = req.user.id;

        const phong = await PhongTro.findById(phongTroId);
        if (!phong) {
            return res.status(404).json({ message: "Phòng trọ không tồn tại" });
        }

        await KhachHang.findByIdAndUpdate(userId, {
            $addToSet: { danhSachYeuThich: phongTroId },
        });

        res.status(200).json({ message: "Đã thêm vào danh sách yêu thích" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm yêu thích", error: error.message });
    }
});

/**
 * ❌ Xoá phòng trọ khỏi danh sách yêu thích
 */
router.delete("/yeu-thich/:phongTroId", xacThucNguoiDung, async (req, res) => {
    try {
        const { phongTroId } = req.params;
        const userId = req.user.id;

        await KhachHang.findByIdAndUpdate(userId, {
            $pull: { danhSachYeuThich: phongTroId },
        });

        res.status(200).json({ message: "Đã xoá khỏi danh sách yêu thích" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xoá yêu thích", error: error.message });
    }
});

/**
 * 📄 Lấy danh sách yêu thích của người dùng (có populate thông tin phòng)
 */
router.get("/yeu-thich", xacThucNguoiDung, async (req, res) => {
    try {
        const khachHang = await KhachHang.findById(req.user.id).populate("danhSachYeuThich");
        res.json(khachHang.danhSachYeuThich);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách yêu thích", error: error.message });
    }
});

module.exports = router;
