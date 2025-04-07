const mongoose = require("mongoose");
const { User } = require("./User");

const NhanVienSchema = new mongoose.Schema({
    chucVu: { type: String, enum: ["Quản lý", "Nhân viên bán hàng", "Nhân viên hỗ trợ"], required: true },
});

const NhanVien = User.discriminator("NhanVien", NhanVienSchema);
module.exports = { NhanVien };
