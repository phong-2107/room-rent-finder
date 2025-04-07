import React from 'react';
import '../../styles/admin/dashboard.scss';
import RoomListingsTable from '../../admin/components/RoomListingsTable ';

const AdminPage = () => {
  // Example data for room listings
  const featuredRooms = [
    {
      id: 1,
      title: "Phòng trọ số 1",
      code: "4751/4501",
      price: "1,000,000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 2,
      title: "Phòng trọ số 2",
      code: "4751/4501",
      price: "1,000,000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 3,
      title: "Phòng trọ số 3",
      code: "4751/4501",
      price: "1,000,000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 4,
      title: "Phòng trọ số 4",
      code: "4751/4501",
      price: "1,000,000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 5,
      title: "Phòng trọ số 5",
      code: "4751/4501",
      price: "1,000,000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    }
  ];

  return (
    <div className="admin-dashboard">
      {/* Summary Cards Section */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <h3>Tin Phòng</h3>
            <span className="period">THIS MONTH</span>
          </div>
          <div className="card-value">4,235</div>
        </div>
        
        <div className="summary-card">
          <div className="card-header">
            <h3>Người Dùng</h3>
            <span className="period">THIS MONTH</span>
          </div>
          <div className="card-value">2,571</div>
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
        rooms={featuredRooms}
      />
    </div>
  );
};

export default AdminPage;