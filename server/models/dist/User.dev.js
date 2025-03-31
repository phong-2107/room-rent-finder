"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  hoTen: {
    type: String,
    required: true
  },
  soDienThoai: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  diaChi: {
    type: String
  },
  gioiTinh: {
    type: String,
    "enum": ["Nam", "Nữ", "Khác"]
  },
  anhDaiDien: {
    type: String,
    "default": ""
  },
  taiKhoan: {
    type: String,
    required: true,
    unique: true
  },
  matKhau: {
    type: String,
    required: true
  },
  loaiUser: {
    type: String,
    "enum": ["Admin", "KhachHang", "NhanVien"],
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }
}, {
  timestamps: true
}); // Mã hóa mật khẩu trước khi lưu vào database

UserSchema.pre("save", function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified("matKhau")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.matKhau, 10));

        case 4:
          this.matKhau = _context.sent;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // Kiểm tra mật khẩu 

UserSchema.methods.kiemTraMatKhau = function _callee2(nhapMatKhau) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(nhapMatKhau, 10));

        case 2:
          matKhauhash = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(nhapMatKhau, this.matKhau));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = mongoose.model("User", UserSchema);
module.exports = {
  User: User
};