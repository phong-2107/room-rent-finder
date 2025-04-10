const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { Permission } = require("../models/Permission");

/**
 * Middleware xác thực người dùng
 */
const xacThucNguoiDung = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token không hợp lệ hoặc không được cung cấp." });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id)
      .populate({
        path: "role",
        populate: {
          path: "permissions",
          model: "Permission"
        }
      });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token đã hết hạn." });
    }
    console.error("❌ Middleware Error:", err.message);
    return res.status(401).json({ message: "Token không hợp lệ.", error: err.message });
  }
};

/**
 * Middleware kiểm tra quyền theo tên quyền
 */
const kiemTraQuyen = (tenQuyen) => async (req, res, next) => {
  try {
    if (!req.user || !req.user.role || !req.user.role.permissions) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    const coQuyen = req.user.role.permissions.some(
      (perm) => perm.tenQuyen === tenQuyen
    );

    if (!coQuyen) {
      return res.status(403).json({ message: `Bạn không có quyền: ${tenQuyen}` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

module.exports = { xacThucNguoiDung, kiemTraQuyen };
