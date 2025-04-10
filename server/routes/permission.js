const express = require("express");
const router = express.Router();
const { Permission } = require("../models/Permission");

// ✅ Tạo mới quyền
router.post("/", async (req, res) => {
    try {
        const { tenQuyen, moTa } = req.body;
        const newPermission = new Permission({ tenQuyen, moTa });
        await newPermission.save();
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: "Lỗi tạo quyền", error: error.message });
    }
});

// ✅ Lấy tất cả quyền
router.get("/", async (req, res) => {
    try {
        const permissions = await Permission.find().sort({ tenQuyen: 1 });
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách quyền", error: error.message });
    }
});

// ✅ Lấy chi tiết quyền theo ID
router.get("/:id", async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id);
        if (!permission) return res.status(404).json({ message: "Không tìm thấy quyền" });
        res.json(permission);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy quyền", error: error.message });
    }
});

// ✅ Cập nhật quyền theo ID
router.put("/:id", async (req, res) => {
    try {
        const { tenQuyen, moTa } = req.body;
        const updated = await Permission.findByIdAndUpdate(
            req.params.id,
            { tenQuyen, moTa },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Không tìm thấy quyền" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật quyền", error: error.message });
    }
});

// ✅ Xoá quyền theo ID
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Permission.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy quyền" });
        res.json({ message: "Đã xoá quyền thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xoá quyền", error: error.message });
    }
});

module.exports = router;
