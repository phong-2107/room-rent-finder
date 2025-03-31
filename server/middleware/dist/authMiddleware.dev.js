"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../models/User"),
    User = _require.User;
/**
 * Middleware xác thực người dùng
 */


var xacThucNguoiDung = function xacThucNguoiDung(req, res, next) {
  var authHeader, token, decoded, user;
  return regeneratorRuntime.async(function xacThucNguoiDung$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          authHeader = req.header("Authorization");

          if (authHeader) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Không có token, từ chối truy cập!"
          }));

        case 4:
          // Kiểm tra và loại bỏ "Bearer " nếu có
          token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader; // Xác minh token

          decoded = jwt.verify(token, process.env.JWT_SECRET); // Tìm user và populate role cùng permissions

          _context.next = 8;
          return regeneratorRuntime.awrap(User.findById(decoded.id).populate({
            path: "role",
            populate: {
              path: "permissions"
            }
          }));

        case 8:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "Người dùng không tồn tại!"
          }));

        case 11:
          req.user = user;
          next();
          _context.next = 20;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.name === "TokenExpiredError")) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Token đã hết hạn!"
          }));

        case 19:
          return _context.abrupt("return", res.status(401).json({
            message: "Token không hợp lệ!"
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};
/**
 * Middleware kiểm tra quyền
 */


var kiemTraQuyen = function kiemTraQuyen(tenQuyen) {
  return function _callee(req, res, next) {
    var coQuyen;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!req.user || !req.user.role || !req.user.role.permissions)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              message: "Bạn không có quyền truy cập!"
            }));

          case 3:
            // Kiểm tra xem user có quyền cần thiết hay không
            coQuyen = req.user.role.permissions.some(function (perm) {
              return perm.tenQuyen === tenQuyen;
            });

            if (coQuyen) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              message: "Bạn không có quyền thực hiện hành động này!"
            }));

          case 6:
            next();
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: "Lỗi hệ thống",
              error: _context2.t0.message
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

module.exports = {
  xacThucNguoiDung: xacThucNguoiDung,
  kiemTraQuyen: kiemTraQuyen
};