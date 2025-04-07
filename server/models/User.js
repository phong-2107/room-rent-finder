const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        hoTen: { type: String, required: true },
        soDienThoai: { type: String, required: true, unique: true, index: true },
        email: { type: String, required: true, unique: true, index: true },
        diaChi: { type: String },
        gioiTinh: { type: String, enum: ["Nam", "Nữ", "Khác"] },
        anhDaiDien: { type: String, default: "" },
        taiKhoan: { type: String, required: true, unique: true },
        matKhau: { type: String, required: true },
        loaiUser: { type: String, enum: ["Admin", "KhachHang", "NhanVien"], required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    },
    { timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu vào database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("matKhau")) return next();  // Đảm bảo chỉ hash mật khẩu khi cần
    this.matKhau = await bcrypt.hash(this.matKhau, 10);
    next();
});

// Kiểm tra mật khẩu 
UserSchema.methods.kiemTraMatKhau = async function (nhapMatKhau) {
    matKhauhash = await bcrypt.hash(nhapMatKhau, 10);
    // console.log("matKhauhash: ", matKhauhash);
    return await bcrypt.compare(nhapMatKhau, this.matKhau);
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
