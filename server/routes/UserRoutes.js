const express = require("express");
const { xacThucNguoiDung } = require("../middleware/authMiddleware");
const { User } = require("../models/User");

const router = express.Router();

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
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
});

module.exports = router;
