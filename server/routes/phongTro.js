const express = require("express");
const { xacThucNguoiDung, kiemTraQuyen } = require("../middleware/authMiddleware");
const { PhongTro } = require("../models/PhongTro");
const { DiaDiem } = require("../models/DiaDiem");

const router = express.Router();

/**
 * 📌 Xem danh sách phòng trọ (Khách hàng, Nhân viên, Admin đều có quyền)
 */
router.get("/", async (req, res) => {
    try {
        const danhSachPhong = await PhongTro.find()
            .populate("nguoiDang", "hoTen email")
            .populate("diaDiem"); // Thêm populate địa điểm

        res.json(danhSachPhong);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách phòng trọ", error: error.message });
    }
});

/**
 * 📌 Thêm phòng trọ (Chỉ Nhân viên và Admin có quyền)
 */
router.post("/", async (req, res) => {
    try {
        const { tieuDe, diaChiCuThe, gia, dienTich, moTa, hinhAnh, diaDiemId } = req.body;

        if (!tieuDe || !diaChiCuThe || !gia || !dienTich || !diaDiemId) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin phòng trọ!" });
        }

        // Kiểm tra diaDiem có tồn tại không
        const diaDiem = await DiaDiem.findById(diaDiemId);
        if (!diaDiem) {
            return res.status(400).json({ message: "Địa điểm không hợp lệ!" });
        }

        const phongMoi = new PhongTro({
            tieuDe,
            diaChiCuThe,
            gia,
            dienTich,
            moTa,
            hinhAnh,
            nguoiDang: req.user.id,
            diaDiem: diaDiemId,
        });

        await phongMoi.save();
        res.status(201).json({ message: "Thêm phòng trọ thành công!", phongMoi });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm phòng trọ", error: error.message });
    }
});

/**
 * Sửa phòng trọ (Chỉ Nhân viên và Admin có quyền)
 */
router.put("/:id", xacThucNguoiDung, kiemTraQuyen("QUAN_LY_PHONG_TRO"), async (req, res) => {
    try {
        const { id } = req.params;

        // Nếu cập nhật diaDiem, kiểm tra xem nó tồn tại không
        if (req.body.diaDiem) {
            const diaDiem = await DiaDiem.findById(req.body.diaDiem);
            if (!diaDiem) {
                return res.status(400).json({ message: "Địa điểm không hợp lệ!" });
            }
        }

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
 * Xóa phòng trọ (Chỉ Admin có quyền)
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

router.get("/by-location/:diaDiemId", async (req, res) => {
    try {
        const { diaDiemId } = req.params;

        // Kiểm tra địa điểm có tồn tại không
        const diaDiem = await DiaDiem.findById(diaDiemId);
        if (!diaDiem) {
            return res.status(404).json({ message: "Địa điểm không tồn tại!" });
        }

        // Tìm các phòng trọ thuộc địa điểm này
        const danhSachPhong = await PhongTro.find({ diaDiem: diaDiemId })
            .populate("diaDiem")
            .populate("nguoiDang", "hoTen email");

        res.json(danhSachPhong);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tìm phòng theo địa điểm", error: error.message });
    }
});

module.exports = router;
