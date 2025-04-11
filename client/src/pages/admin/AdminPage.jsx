import React, { useEffect, useState } from "react";
import '../../styles/admin/dashboard.scss';
import { fetchRooms } from "../../features/roomApi";
import { fetchDashboardSummary } from "../../features/adminApi";
import RoomListingsTable from "../../admin/components/RoomListingsTable "; // Adjust the path if necessary


const AdminPage = () => {
  const [formattedRooms, setFormattedRooms] = useState([]);
  const [summary, setSummary] = useState({
    totalRooms: 0,
    totalUsers: 0,
    totalAccounts: 0,
  });

  useEffect(() => {
    // Lấy danh sách phòng
    const loadRooms = async () => {
      try {
        const allRooms = await fetchRooms();
        const transformed = allRooms.map((room) => ({
          id: room._id,
          title: room.tieuDe,
          code: `${room._id.slice(-4)}/${room.nguoiDang?._id.slice(-4)}`,
          price: `${room.gia.toLocaleString()} đ`,
          type: "Phòng trọ",
          status: room.trangThai === "Còn trống" ? "Hiện" : "Ẩn",
          date: new Date(room.createdAt).toLocaleDateString("vi-VN"),
          image: room.hinhAnh?.[0] || "/assets/images/no-image.jpg",
        }));
        setFormattedRooms(transformed);
      } catch (error) {
        console.error("Lỗi khi lấy phòng:", error);
      }
    };

    // Lấy tổng số liệu
    const loadSummary = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Lỗi khi lấy số liệu tổng quan:", error);
      }
    };

    loadRooms();
    loadSummary();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Summary Cards Section */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <h3>Tin Phòng</h3>
            <span className="period">TỔNG</span>
          </div>
          <div className="card-value">{summary.totalRooms.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3>Người Dùng</h3>
            <span className="period">TỔNG</span>
          </div>
          <div className="card-value">{summary.totalUsers.toLocaleString()}</div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3>Tài Khoản</h3>
            <span className="period">TỔNG</span>
          </div>
          <div className="card-value">{summary.totalAccounts.toLocaleString()}</div>
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