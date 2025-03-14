const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

/**
 * 📌 Middleware xác thực người dùng
 */
const xacThucNguoiDung = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Không có token, từ chối truy cập!" });

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).populate("role");

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token không hợp lệ!" });
    }
};

/**
 * 📌 Middleware kiểm tra quyền
 */
const kiemTraQuyen = (tenQuyen) => async (req, res, next) => {
    try {
        if (!req.user || !req.user.role || !req.user.role.permissions) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }

        const coQuyen = req.user.role.permissions.some((perm) => perm.tenQuyen === tenQuyen);

        if (!coQuyen) {
            return res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này!" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    }
};

module.exports = { xacThucNguoiDung, kiemTraQuyen };
