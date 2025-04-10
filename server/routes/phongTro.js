const express = require("express");
const mongoose = require("mongoose");
const { xacThucNguoiDung, kiemTraQuyen } = require("../middleware/authMiddleware");
const { PhongTro } = require("../models/PhongTro");
const { DiaDiem } = require("../models/DiaDiem");
const { getLatLngFromAddress } = require("../utils/geocode");
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


// Lọc danh sách phòng trọ
router.get("/filter", async (req, res) => {
    try {
        const { area, location, price } = req.query;
        const filter = {};

        // Lọc theo diện tích nếu hợp lệ
        const parsedArea = parseInt(area);
        if (!isNaN(parsedArea)) {
            filter.dienTich = { $gte: parsedArea };
        }

        // Lọc theo địa điểm nếu là ObjectId hợp lệ
        if (
            location &&
            typeof location === "string" &&
            location.trim().length === 24 &&
            /^[a-fA-F0-9]{24}$/.test(location.trim())
        ) {
            filter.diaDiem = new mongoose.Types.ObjectId(location.trim());
        }

        // Lọc theo mức giá nếu có
        if (price && typeof price === "string") {
            switch (price) {
                case "duoi1tr":
                    filter.gia = { $lt: 1000000 };
                    break;
                case "1-3tr":
                    filter.gia = { $gte: 1000000, $lte: 3000000 };
                    break;
                case "3-5tr":
                    filter.gia = { $gte: 3000000, $lte: 5000000 };
                    break;
                case "tren5tr":
                    filter.gia = { $gt: 5000000 };
                    break;
                default:
                    break;
            }
        }
        const danhSachPhong = await PhongTro.find(filter)
            .populate("nguoiDang", "hoTen email")
            .populate("diaDiem");
        if (!danhSachPhong || danhSachPhong.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(danhSachPhong);
    } catch (error) {
        console.error("❌ Lỗi khi lọc phòng trọ:", error.stack);
        res.status(500).json({
            message: "Lỗi khi lọc danh sách phòng trọ",
            error: error.message,
        });
    }
});

router.get("/count", async (req, res) => {
    try {
        const count = await PhongTro.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Lỗi khi đếm phòng trọ:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
});

/**
 * Lấy tất cả địa chỉ cụ thể
 */
router.get("/diachi", async (req, res) => {
    try {
        const danhSach = await PhongTro.find({}, "diaChiCuThe"); // chỉ lấy trường diaChiCuThe
        res.json(danhSach);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách địa chỉ", error: error.message });
    }
});

router.get("/vi-tri", async (req, res) => {
    try {
        const danhSach = await PhongTro.find({}, "tieuDe diaChiCuThe");

        const viTriList = danhSach.map((item) => {
            const [lat, lng] = item.diaChiCuThe.split(",").map(parseFloat);
            return {
                lat,
                lng,
                ten_dia_diem: item.tieuDe
            };
        });

        res.json(viTriList);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xử lý vị trí", error: error.message });
    }
});


router.get("/geocode", async (req, res) => {
    try {
        const { address } = req.query;

        if (!address || address.trim() === "") {
            return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ hợp lệ." });
        }

        const result = await getLatLngFromAddress(address);

        if (!result) {
            return res.status(500).json({ message: "Không thể lấy tọa độ từ địa chỉ." });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi xử lý yêu cầu.",
            error: error.message,
        });
    }
});

/**
 * 📌 Lấy thông tin chi tiết phòng trọ theo ID
 */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const phong = await PhongTro.findById(id)
            .populate("nguoiDang", "hoTen email")
            .populate("diaDiem");

        if (!phong) {
            return res.status(404).json({ message: "Không tìm thấy phòng trọ!" });
        }

        res.json(phong);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy chi tiết phòng trọ", error: error.message });
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






/**
 * Lấy địa chỉ cụ thể theo ID phòng trọ
 */
router.get("/diachi/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const phong = await PhongTro.findById(id, "diaChiCuThe");

        if (!phong) {
            return res.status(404).json({ message: "Không tìm thấy phòng trọ!" });
        }

        res.json(phong);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy địa chỉ theo ID", error: error.message });
    }
});


module.exports = router;
