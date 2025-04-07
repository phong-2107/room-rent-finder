const express = require("express");
const { DiaDiem } = require("../models/DiaDiem");
const { xacThucNguoiDung, kiemTraQuyen } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Thêm địa điểm (chỉ Admin)
 */
router.post("/", async (req, res) => {
    try {
        const { tinhThanh, quanHuyen, phuongXa } = req.body;

        if (!tinhThanh || !quanHuyen) {
            return res.status(400).json({ message: "Thiếu thông tin tỉnh/thành hoặc quận/huyện" });
        }

        const diaDiem = new DiaDiem({ tinhThanh, quanHuyen, phuongXa });
        await diaDiem.save();

        res.status(201).json({ message: "Thêm địa điểm thành công!", diaDiem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm địa điểm", error: error.message });
    }
});

/**
 *  Lấy danh sách địa điểm (tất cả người dùng)
 */
router.get("/", async (req, res) => {
    try {
        const ds = await DiaDiem.find().sort({ tinhThanh: 1, quanHuyen: 1 });
        res.json(ds);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách địa điểm", error: error.message });
    }
});
/**
 * Lấy địa điểm theo ID
 */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(" ID được truyền:", id);

        const diaDiem = await DiaDiem.findById(id);
        console.log("Địa điểm tìm được:", diaDiem);

        if (!diaDiem) {
            return res.status(404).json({ message: "Không tìm thấy địa điểm" });
        }

        res.json(diaDiem);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy địa điểm", error: error.message });
    }
});
/**
 * Cập nhật địa điểm (Admin)
 */
router.put("/:id", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_PHONG_TRO"), async (req, res) => {
    try {
        const { id } = req.params;
        const diaDiem = await DiaDiem.findByIdAndUpdate(id, req.body, { new: true });

        if (!diaDiem) {
            return res.status(404).json({ message: "Không tìm thấy địa điểm" });
        }

        res.json({ message: "Cập nhật địa điểm thành công!", diaDiem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật", error: error.message });
    }
});

/**
 * Xoá địa điểm (Admin)
 */
router.delete("/:id", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_PHONG_TRO"), async (req, res) => {
    try {
        const { id } = req.params;
        const diaDiem = await DiaDiem.findByIdAndDelete(id);

        if (!diaDiem) {
            return res.status(404).json({ message: "Không tìm thấy địa điểm" });
        }

        res.json({ message: "Xoá địa điểm thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xoá địa điểm", error: error.message });
    }
});

module.exports = router;
