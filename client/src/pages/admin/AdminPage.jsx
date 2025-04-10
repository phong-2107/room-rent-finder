import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import '../../styles/admin/dashboard.scss';
import RoomListingsTable from '../../admin/components/RoomListingsTable ';
import { fetchRooms, fetchRoomCount } from "../../features/roomApi";
import { fetchKhachHangCount } from "../../features/auth/userApi";
const AdminPage = () => {
  const [formattedRooms, setFormattedRooms] = useState([]);
  const [khachHangCount, setKhachHangCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const allRooms = await fetchRooms();

        const transformed = allRooms.map((room, index) => ({
          id: room._id,
          title: room.tieuDe,
          code: `${room._id.slice(-4)}/${room.nguoiDang?._id.slice(-4)}`,
          price: `${room.gia.toLocaleString()} đ`,
          type: "Phòng trọ",
          status: room.trangThai === "Còn trống" ? "Hiện" : "Ẩn",
          date: format(new Date(room.createdAt), "dd/MM/yyyy"),
          image: room.hinhAnh?.[0] || "/assets/images/no-image.jpg",
        }));

        setFormattedRooms(transformed);
      } catch (error) {
        console.error("Lỗi khi lấy phòng:", error);
      }
    };
    const loadUserCount = async () => {
      try {
        const count = await fetchKhachHangCount();
        setKhachHangCount(count);
      } catch (err) {
        console.error("Lỗi khi lấy số lượng khách hàng:", err);
      }
    };
    const loadCounts = async () => {
      try {
        const [userCount, totalRoomCount] = await Promise.all([
          fetchKhachHangCount(),
          fetchRoomCount(),
        ]);
        setKhachHangCount(userCount);
        setRoomCount(totalRoomCount);
      } catch (err) {
        console.error("Lỗi khi lấy số liệu:", err);
      }
    };


    loadRooms();
    loadUserCount();
    loadCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Summary Cards Section */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <h3>Tin Phòng</h3>
            <span className="period">THIS MONTH</span>
          </div>
          <div className="card-value">{roomCount.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3>Người Dùng</h3>
            <span className="period">THIS MONTH</span>
          </div>
          <div className="card-value">{khachHangCount.toLocaleString()}</div>
        </div>


        <div className="summary-card">
          <div className="card-header">
            <h3>Liên Hệ</h3>
            <span className="period">MONTHLY GOALS : 1000</span>
          </div>
          <div className="card-value">734</div>
        </div>
      </div>

      {/* Using the RoomListingsTable component */}
      <RoomListingsTable
        title="Tin Phòng Nổi Bật"
        viewAllText="Xem Tất Cả"
        viewAllLink="/admin/rooms"
        rooms={formattedRooms}
      />
    </div>
  );
};

export default AdminPage;