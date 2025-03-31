"use strict";

var mongoose = require("mongoose");

var RoleSchema = new mongoose.Schema({
  tenRole: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission"
  }] // Danh sách quyền

});
var Role = mongoose.model("Role", RoleSchema);
module.exports = {
  Role: Role
};