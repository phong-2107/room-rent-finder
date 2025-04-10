require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
// Import các routes mới
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/UserRoutes");
const phongTroRoutes = require("./routes/phongTro");
const diaDiemRoutes = require("./routes/DiaDiem");
const contactRoutes = require("./routes/lienhe");
const khachHangRoutes = require("./routes/khachhang");

const permissionsRoutes = require("./routes/permission");
const rolesRoutes = require("./routes/role");


const adminRoom = require("./routes/admin/adminRoom.routes");

const app = express();

// ------------------- Middlewares -------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/images', express.static(path.join(__dirname, 'images')));
// ------------------- Kết nối MongoDB -------------------
// ------------------- Kết nối MongoDB -------------------
const PORT = process.env.PORT || 3001;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Kết nối MongoDB thành công");
        app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
    })
    .catch((err) => {
        console.error(`❌ Lỗi kết nối MongoDB: ${err}`);
        process.exit(1); // Dừng server nếu không kết nối được DB
    });

// ------------------- Sử dụng routes -------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", phongTroRoutes);
app.use("/api/diadiem", diaDiemRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/khachhang", khachHangRoutes);

app.use("/api/permissions", permissionsRoutes);
app.use("/api/roles", rolesRoutes);


app.use("/api/admin/rooms", adminRoom);


module.exports = app; 
