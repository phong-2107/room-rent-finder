const express = require("express");
const router = express.Router();
const { Role } = require("../models/Role");
const { Permission } = require("../models/Permission");

// Tạo vai trò mới
router.post("/", async (req, res) => {
    try {
        const { tenRole, permissionIds } = req.body; // permissionIds: mảng các _id của quyền
        const role = new Role({ tenRole, permissions: permissionIds });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Lỗi tạo vai trò", error: error.message });
    }
});

// Lấy danh sách role (kèm permission)
router.get("/", async (req, res) => {
    try {
        const roles = await Role.find().populate("permissions");
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy vai trò", error: error.message });
    }
});

// Gán thêm quyền cho một vai trò
router.put("/:id/permissions", async (req, res) => {
    try {
        const { permissionIds } = req.body;
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { permissions: { $each: permissionIds } } }, // tránh trùng
            { new: true }
        ).populate("permissions");

        if (!role) return res.status(404).json({ message: "Vai trò không tồn tại" });

        res.json(role);
    } catch (error) {
        res.status(500).json({ message: "Lỗi gán quyền cho vai trò", error: error.message });
    }
});

module.exports = router;
