const express = require("express");
const { xacThucNguoiDung } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/user/me - Lấy thông tin người dùng hiện tại
router.get("/me", xacThucNguoiDung, (req, res) => {
    try {
        // Vì middleware đã tìm và populate user, nên dùng trực tiếp req.user
        const userResponse = req.user.toObject();
        // Ẩn trường mật khẩu trước khi gửi về client
        delete userResponse.matKhau;
        res.json({ user: userResponse });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
});

module.exports = router;
