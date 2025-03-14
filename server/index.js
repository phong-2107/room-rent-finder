const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import routes
const authRoutes = require("./routes/auth");
// const khachHangRoutes = require("./routes/khachHang");
// const nhanVienRoutes = require("./routes/nhanVien");
const phongTroRoutes = require("./routes/phongTro");

// Kết nối MongoDB
const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server đang chạy trên cổng ${PORT}`));
    })
    .catch((err) => console.log(`❌ Lỗi kết nối MongoDB: ${err}`));

// Sử dụng routes
app.use("/auth", authRoutes);
// app.use("/khachhang", khachHangRoutes);
// app.use("/nhanvien", nhanVienRoutes);
app.use("/phongtro", phongTroRoutes);
