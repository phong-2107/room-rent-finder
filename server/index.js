require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import các routes mới
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/UserRoutes");
const phongTroRoutes = require("./routes/phongTro");
const diaDiemRoutes = require("./routes/DiaDiem");
// (Giữ lại nếu bạn vẫn muốn sử dụng route phongTro)

const app = express();

// ------------------- Middlewares -------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ------------------- Kết nối MongoDB -------------------
const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
    })
    .catch((err) => console.error(`❌ Lỗi kết nối MongoDB: ${err}`));

// ------------------- Sử dụng routes -------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", phongTroRoutes);
app.use("/api/diadiem", diaDiemRoutes);
module.exports = app; 
