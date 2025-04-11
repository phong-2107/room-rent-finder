const express = require("express");
const { User } = require("../../models/User");
const { PhongTro } = require("../../models/PhongTro");

const router = express.Router();

/**
 * 📊 API: Lấy tổng số liệu cho Admin Dashboard
 */
router.get("/dashboard-summary", async (req, res) => {
    try {
        // Lấy tổng số liệu từ cơ sở dữ liệu
        const [totalRooms, totalUsers, totalAccounts] = await Promise.all([
            PhongTro.countDocuments(), // Tổng số tin phòng
            User.countDocuments({ loaiUser: "Customer" }), // Tổng số người dùng (Khách hàng)
            User.countDocuments(), // Tổng số tài khoản (Admin, Staff, Customer)
        ]);

        res.status(200).json({
            totalRooms,
            totalUsers,
            totalAccounts,
        });
    } catch (error) {
        console.error("Lỗi khi lấy số liệu tổng quan:", error.message);
        res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau." });
    }
});

module.exports = router;