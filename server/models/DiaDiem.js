const mongoose = require("mongoose");

const DiaDiemSchema = new mongoose.Schema({
    tinhThanh: { type: String, required: true },
    quanHuyen: { type: String, required: true },
    phuongXa: { type: String },
}, { timestamps: true });

const DiaDiem = mongoose.model("DiaDiem", DiaDiemSchema);
module.exports = { DiaDiem };
