"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var multer = require("multer");

var _require = require("../models/User"),
    User = _require.User;

var _require2 = require("../models/Role"),
    Role = _require2.Role;

var router = express.Router();
/*  Cấu hình Multer để upload ảnh đại diện */

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
/* API Đăng ký Người Dùng */

router.post("/register", upload.single("profileImage"), function _callee(req, res) {
  var _req$body, hoTen, email, password, loaiUser, profileImage, existingUser, salt, hashedPassword, role, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, hoTen = _req$body.hoTen, email = _req$body.email, password = _req$body.password, loaiUser = _req$body.loaiUser;
          profileImage = req.file ? req.file.path : ""; // Kiểm tra xem người dùng đã tồn tại chưa

          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: "Email đã được sử dụng!"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 13:
          hashedPassword = _context.sent;

          if (!(loaiUser === "Admin")) {
            _context.next = 20;
            break;
          }

          _context.next = 17;
          return regeneratorRuntime.awrap(Role.findOne({
            tenRole: "Admin"
          }));

        case 17:
          role = _context.sent;
          _context.next = 29;
          break;

        case 20:
          if (!(loaiUser === "NhanVien")) {
            _context.next = 26;
            break;
          }

          _context.next = 23;
          return regeneratorRuntime.awrap(Role.findOne({
            tenRole: "Nhân viên"
          }));

        case 23:
          role = _context.sent;
          _context.next = 29;
          break;

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(Role.findOne({
            tenRole: "Khách hàng"
          }));

        case 28:
          role = _context.sent;

        case 29:
          if (role) {
            _context.next = 31;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Loại người dùng không hợp lệ!"
          }));

        case 31:
          // Tạo người dùng mới
          newUser = new User({
            hoTen: hoTen,
            email: email,
            matKhau: hashedPassword,
            anhDaiDien: profileImage,
            loaiUser: loaiUser,
            role: role._id
          }); // Lưu người dùng vào database

          _context.next = 34;
          return regeneratorRuntime.awrap(newUser.save());

        case 34:
          res.status(201).json({
            message: "Đăng ký thành công!",
            user: newUser
          });
          _context.next = 40;
          break;

        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Lỗi đăng ký!",
            error: _context.t0.message
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 37]]);
});
/*  API Đăng nhập */

router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, token, userResponse;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Kiểm tra xem người dùng có tồn tại không

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).populate("role"));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Email hoặc mật khẩu không đúng!"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.kiemTraMatKhau(password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          console.log("❌ Mật khẩu không đúng!");
          console.log("pass nhập: ", password);
          console.log("matKhau user: ", user.matKhau);
          return _context2.abrupt("return", res.status(400).json({
            message: "Email hoặc mật khẩu không đúng!"
          }));

        case 15:
          console.log("✅ Mật khẩu đúng!"); // Tạo token JWT

          _context2.prev = 16;
          token = jwt.sign({
            id: user._id,
            role: user.role.tenRole
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          });
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](16);
          console.error("❌ Lỗi khi tạo JWT Token:", _context2.t0.message);
          return _context2.abrupt("return", res.status(500).json({
            message: "Lỗi hệ thống khi tạo token!"
          }));

        case 24:
          // Không gửi mật khẩu về client
          userResponse = _objectSpread({}, user.toObject(), {
            matKhau: undefined
          });
          console.log("✅ Đăng nhập thành công! Trả về token.");
          res.status(200).json({
            token: token,
            user: userResponse
          });
          _context2.next = 33;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t1 = _context2["catch"](0);
          console.error("❌ Lỗi trong quá trình đăng nhập:", _context2.t1.message);
          res.status(500).json({
            message: "Lỗi đăng nhập!",
            error: _context2.t1.message
          });

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 29], [16, 20]]);
});
/*  API Lấy Thông Tin Người Dùng */

router.get("/me", function _callee3(req, res) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.header("Authorization");

          if (token) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            message: "Không có token, từ chối truy cập!"
          }));

        case 4:
          // Giải mã token
          decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findById(decoded.id).populate("role"));

        case 7:
          user = _context3.sent;

          if (user) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Người dùng không tồn tại!"
          }));

        case 10:
          res.json({
            user: user
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(401).json({
            message: "Token không hợp lệ!"
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;