const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

/**
 * Middleware xác thực người dùng
 */
const xacThucNguoiDung = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ message: "Không có token, từ chối truy cập!" });
        }

        // Kiểm tra và loại bỏ "Bearer " nếu có
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

        // Xác minh token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tìm user và populate role cùng permissions
        const user = await User.findById(decoded.id).populate({
            path: "role",
            populate: { path: "permissions" },
        });

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token đã hết hạn!" });
        }
        return res.status(401).json({ message: "Token không hợp lệ!" });
    }
};

/**
 * Middleware kiểm tra quyền
 */
const kiemTraQuyen = (tenQuyen) => async (req, res, next) => {
    try {
        // Kiểm tra xem thông tin user, role và permissions đã có hay chưa
        if (!req.user || !req.user.role || !req.user.role.permissions) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }

        // Kiểm tra xem user có quyền cần thiết hay không
        const coQuyen = req.user.role.permissions.some(
            (perm) => perm.tenQuyen === tenQuyen
        );

        if (!coQuyen) {
            return res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này!" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    }
};

module.exports = { xacThucNguoiDung, kiemTraQuyen };
