const connectDB = require("./models/database");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Role } = require("./models/Role");
const { Permission } = require("./models/Permission");
const { User } = require("./models/User");
const { DiaDiem } = require("./models/DiaDiem");
const { PhongTro } = require("./models/PhongTro");

const seedData = async () => {
    try {
        await connectDB();

        console.log("🔹 Xóa dữ liệu cũ...");
        await Permission.deleteMany({});
        await Role.deleteMany({});
        await User.deleteMany({});
        await DiaDiem.deleteMany({});
        await PhongTro.deleteMany({});
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

        // **Tạo người dùng**
        console.log("🔹 Tạo người dùng...");
        const hashedPassword = "123"; // Đã xử lý hash từ middleware pre-save
        const admin = await User.create({
            hoTen: "Admin",
            email: "AD@gmail.com",
            taiKhoan: "admin",
            matKhau: hashedPassword,
            loaiUser: "Admin",
            role: adminRole._id,
            gioiTinh: "Nam",
            soDienThoai: "0900000001"
        });

        const nhanVien = await User.create({
            hoTen: "Nhân Viên 1",
            email: "NV@gmail.com",
            taiKhoan: "nhanvien1",
            matKhau: hashedPassword,
            loaiUser: "Nhân viên",
            role: nhanVienRole._id,
            gioiTinh: "Nữ",
            soDienThoai: "0900000002"
        });

        await User.create({
            hoTen: "Khách Hàng 1",
            email: "KH@gmail.com",
            taiKhoan: "khachhang1",
            matKhau: hashedPassword,
            loaiUser: "Khách hàng",
            role: khachHangRole._id,
            gioiTinh: "Nam",
            soDienThoai: "0900000003"
        });

        // **Tạo địa điểm**
        console.log("🔹 Tạo địa điểm...");
        const diaDiem1 = await DiaDiem.create({
            tinhThanh: "Hà Nội",
            quanHuyen: "Cầu Giấy",
            phuongXa: "Dịch Vọng"
        });

        const diaDiem2 = await DiaDiem.create({
            tinhThanh: "TP. Hồ Chí Minh",
            quanHuyen: "Quận 1",
            phuongXa: "Bến Nghé"
        });

        // **Tạo phòng trọ**
        console.log("🔹 Tạo phòng trọ...");
        await PhongTro.create({
            tieuDe: "Phòng trọ trung tâm Cầu Giấy",
            diaChiCuThe: "Số 3, ngõ 15 Duy Tân",
            gia: 2500000,
            dienTich: 20,
            moTa: "Phòng sạch sẽ, có điều hoà, gần công viên",
            hinhAnh: [
                "/assets/Listing1/1.jpg",
                "/assets/Listing1/2.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem1._id
        });

        await PhongTro.create({
            tieuDe: "Phòng mini Quận 1, tiện nghi",
            diaChiCuThe: "42 Nguyễn Huệ",
            gia: 4500000,
            dienTich: 25,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/3.jpeg",
                "/assets/Listing1/2.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });
        await PhongTro.create({
            tieuDe: "Phòng mini Quận 9",
            diaChiCuThe: "42 Nguyễn Huệ",
            gia: 5000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/2.jpg",
                "/assets/Listing1/4.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });
        await PhongTro.create({
            tieuDe: "Phòng mini Quận 7",
            diaChiCuThe: "42 Nguyễn hoang",
            gia: 5000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/5.jpg",
                "/assets/Listing1/6.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });

        await PhongTro.create({
            tieuDe: "Phòng mini Quận 2",
            diaChiCuThe: "124, Nguyễn hoang",
            gia: 5000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/7.jpg",
                "/assets/Listing1/6.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });

        await PhongTro.create({
            tieuDe: "Phòng Quận 2",
            diaChiCuThe: "124, Nguyễn hoang",
            gia: 5000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/4.jpg",
                "/assets/Listing1/5.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });

        await PhongTro.create({
            tieuDe: "Phòng Quận 10",
            diaChiCuThe: "124, Nguyễn hoang",
            gia: 8000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/8.jpg",
                "/assets/Listing1/7.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
        });

        await PhongTro.create({
            tieuDe: "Phòng tro gia re",
            diaChiCuThe: "124, Nguyễn hoang",
            gia: 33000000,
            dienTich: 60,
            moTa: "Ngay trung tâm, gần chợ Bến Thành, view đẹp",
            hinhAnh: [
                "/assets/Listing1/5.jpg",
                "/assets/Listing1/6.jpg"
            ],
            nguoiDang: nhanVien._id,
            diaDiem: diaDiem2._id
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
