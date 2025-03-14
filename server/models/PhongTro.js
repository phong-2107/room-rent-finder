const mongoose = require("mongoose");

const PhongTroSchema = new mongoose.Schema(
    {
        tieuDe: { type: String, required: true },
        diaChi: { type: String, required: true },
        gia: { type: Number, required: true },
        dienTich: { type: Number, required: true },
        moTa: { type: String },
        hinhAnh: [{ type: String }],
        nguoiDang: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        trangThai: { type: String, enum: ["Còn trống", "Đã thuê"], default: "Còn trống" },
    },
    { timestamps: true }
);

const PhongTro = mongoose.model("PhongTro", PhongTroSchema);
module.exports = { PhongTro };
