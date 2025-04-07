const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    tenQuyen: { type: String, required: true, unique: true }, // VD: "XEM_PHONG_TRO"
    moTa: { type: String }, // Mô tả quyền
});

const Permission = mongoose.model("Permission", PermissionSchema);
module.exports = { Permission };
