import React from 'react';
import '../../styles/admin/roomListingsTable.scss';

// RoomListingsTable component to be used across different pages
const RoomListingsTable = ({ 
  title = "Tin Phòng Nổi Bật", 
  viewAllText = "Xem Tất Cả",
  viewAllLink = "#",
  rooms = []
}) => {
  // Default rooms data if none provided
  const defaultRooms = [
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

  const roomsToDisplay = rooms.length > 0 ? rooms : defaultRooms;

  return (
    <div className="room-listings-section">
      <div className="section-header">
        <h2>{title}</h2>
        <a href={viewAllLink} className="view-all">{viewAllText}</a>
      </div>
      
      <div className="table-container">
        <table className="room-listings-table">
          <thead>
            <tr>
              <th>TT</th>
              <th>TIÊU PHÒNG</th>
              <th>MÃ PHÒNG</th>
              <th>GIÁ</th>
              <th>LOẠI PHÒNG</th>
              <th>TRẠNG THÁI</th>
              <th>NGÀY ĐĂNG</th>
            </tr>
          </thead>
          <tbody>
            {roomsToDisplay.map((room, index) => (
              <tr key={room.id || index}>
                <td>
                  <div className="room-image-container">
                    <img src={room.image} alt={room.title} className="room-thumbnail" />
                  </div>
                </td>
                <td className="title-cell">{room.title}</td>
                <td>{room.code}</td>
                <td>{room.price}</td>
                <td>{room.type}</td>
                <td>
                  <span className={`status-badge ${room.status === "Hiện" ? "available" : "pending"}`}>
                    {room.status}
                  </span>
                </td>
                <td>{room.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomListingsTable;