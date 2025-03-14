const connectDB = require("./models/database");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Role } = require("./models/Role");
const { Permission } = require("./models/Permission");
const { User } = require("./models/User");

const seedData = async () => {
    try {
        await connectDB();

        console.log("🔹 Xóa dữ liệu cũ...");
        await Permission.deleteMany({});
        await Role.deleteMany({});
        await User.deleteMany({});
        console.log("✅ Dữ liệu cũ đã được xóa!");

        // **Tạo quyền**
        console.log("🔹 Tạo quyền mới...");
        const xemPhongTro = await Permission.create({ tenQuyen: "XEM_PHONG_TRO", moTa: "Xem danh sách phòng trọ" });
        const quanLyPhongTro = await Permission.create({ tenQuyen: "QUAN_LY_PHONG_TRO", moTa: "Thêm/sửa/xóa phòng trọ" });
        const quanLyNguoiDung = await Permission.create({ tenQuyen: "QUAN_LY_NGUOI_DUNG", moTa: "Quản lý khách hàng và nhân viên" });

        // **Tạo role**
        console.log("🔹 Tạo vai trò...");
        const adminRole = await Role.create({ tenRole: "Admin", permissions: [xemPhongTro._id, quanLyPhongTro._id, quanLyNguoiDung._id] });
        const nhanVienRole = await Role.create({ tenRole: "Nhân viên", permissions: [xemPhongTro._id, quanLyPhongTro._id] });
        const khachHangRole = await Role.create({ tenRole: "Khách hàng", permissions: [xemPhongTro._id] });

        // **Tạo danh sách số điện thoại khác nhau để tránh lỗi trùng lặp**
        console.log("🔹 Tạo người dùng...");
        // const hashedPassword = await bcrypt.hash("123", 10);
        const hashedPassword = "123";
        await User.create({
            hoTen: "Admin",
            email: "AD@gmail.com",
            taiKhoan: "admin",
            matKhau: hashedPassword,
            loaiUser: "Admin",
            role: adminRole._id,
            gioiTinh: "Nam",
            soDienThoai: "0900000001"
        });

        await User.create({
            hoTen: "Nhân Viên 1",
            email: "NV@gmail.com",
            taiKhoan: "nhanvien1",
            matKhau: hashedPassword,
            loaiUser: "NhanVien",
            role: nhanVienRole._id,
            gioiTinh: "Nữ",
            soDienThoai: "0900000002"
        });

        await User.create({
            hoTen: "Khách Hàng 1",
            email: "KH@gmail.com",
            taiKhoan: "khachhang1",
            matKhau: hashedPassword,
            loaiUser: "KhachHang",
            role: khachHangRole._id,
            gioiTinh: "Nam",
            soDienThoai: "0900000003"
        });

        console.log("✅ Seed dữ liệu thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi seed dữ liệu:", error);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Kết nối MongoDB đã đóng.");
    }
};

seedData();
