"use strict";

// index.js (hoặc app.js)
require("dotenv").config(); // Đọc biến môi trường từ .env


var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors"); // Import các routes mới


var authRoutes = require("./routes/auth");

var userRoutes = require("./routes/UserRoutes");

var phongTroRoutes = require("./routes/phongTro"); // (Giữ lại nếu bạn vẫn muốn sử dụng route phongTro)


var app = express(); // ------------------- Middlewares -------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]("public")); // ------------------- Kết nối MongoDB -------------------

var PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  app.listen(PORT, function () {
    return console.log("Server \u0111ang ch\u1EA1y tr\xEAn c\u1ED5ng ".concat(PORT));
  });
})["catch"](function (err) {
  return console.error("\u274C L\u1ED7i k\u1EBFt n\u1ED1i MongoDB: ".concat(err));
}); // ------------------- Sử dụng routes -------------------

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/phongtro", phongTroRoutes);
module.exports = app; // Nếu cần import app ở file khác