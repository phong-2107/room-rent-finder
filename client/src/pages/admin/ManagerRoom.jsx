import React, { useState } from 'react';
import '../../styles/admin/managerRoom.scss';
import RoomManagementTable from '../../admin/components/RoomManagementTable';
const ManagerRoom = () => {
  // Example data for room listings
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 2,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 3,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 4,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 5,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 6,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 7,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    },
    {
      id: 8,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "https://xaydungaau.com/wp-content/uploads/2023/12/thiet-ke-noi-that-phong-tro-an-tuong-tien-nghi.jpg"
    }
  ]);

  // Handler for posting a new listing
  const handlePostListing = () => {
    console.log("Open post listing form");
    // Implement your logic here to open a form or redirect to a posting page
  };

  // Handler for search functionality
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Implement your search logic here
    // This could filter the rooms array based on the query
  };

  return (
    <div className="manager-room-container">      
      {/* Room Management Table */}
      <RoomManagementTable 
        rooms={rooms}
        onPostListing={handlePostListing}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ManagerRoom;