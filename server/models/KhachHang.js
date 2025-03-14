const mongoose = require("mongoose");
const { User } = require("./User");

const KhachHangSchema = new mongoose.Schema({
    danhSachYeuThich: [{ type: mongoose.Schema.Types.ObjectId, ref: "PhongTro" }],
});

const KhachHang = User.discriminator("KhachHang", KhachHangSchema);
module.exports = { KhachHang };
