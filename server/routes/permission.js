const express = require("express");
const router = express.Router();
const { Permission } = require("../models/Permission");

// Tạo mới một quyền
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

// Lấy danh sách quyền
router.get("/", async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách quyền", error: error.message });
    }
});

module.exports = router;
