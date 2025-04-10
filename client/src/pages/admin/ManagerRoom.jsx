import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import '../../styles/admin/managerRoom.scss';
import RoomManagementTable from '../../admin/components/RoomManagementTable';
import { fetchRooms } from '../../features/roomApi';

const ManagerRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const allRooms = await fetchRooms();
        const formatted = allRooms.map((room) => ({
          id: room._id,
          name: room.tieuDe,
          code: `${room._id.slice(-4)}/${room.nguoiDang?._id.slice(-4)}`,
          price: `${room.gia.toLocaleString()} đ`,
          type: 'Phòng trọ',
          status: room.trangThai === 'Còn trống' ? 'Hiện' : 'Ẩn',
          date: format(new Date(room.createdAt), 'dd/MM/yyyy'),
          image: room.hinhAnh?.[0] || '/assets/images/no-image.jpg',
        }));
        setRooms(formatted);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error);
      }
    };

    loadRooms();
  }, []);

  // Handler đăng tin mới
  const handlePostListing = () => {
    console.log('Mở form đăng tin');
    // Chuyển hướng hoặc mở modal đăng tin
  };

  // Handler tìm kiếm
  const handleSearch = (query) => {
    console.log('Tìm kiếm:', query);
    // Có thể thêm logic lọc ở đây
  };

  return (
    <div className="manager-room-container">
      <RoomManagementTable
        rooms={rooms}
        onPostListing={handlePostListing}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ManagerRoom;
