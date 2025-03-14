const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    tenRole: { type: String, required: true, unique: true }, // VD: "Admin", "Khách hàng", "Nhân viên"
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Danh sách quyền
});

const Role = mongoose.model("Role", RoleSchema);
module.exports = { Role };
