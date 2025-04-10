import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { getToken } from '../../utils/storage';
import '../../styles/admin/RoomManagementTable.scss';

const RoomManagementTable = ({

  rooms = [],
  onPostListing = () => { },
  onSearch = () => { },
  onEdit = () => { },
  onDelete = () => { }
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const roomsPerPage = 8;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (roomId) => {
    setActiveDropdown(activeDropdown === roomId ? null : roomId);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEdit = (roomId, e) => {
    e.stopPropagation();
    onEdit(roomId);
    setActiveDropdown(null);
  };

  const handleDelete = async (roomId, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Bạn có chắc muốn xoá phòng trọ này?");
    if (!confirmDelete) return;

    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/api/admin/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Đã xoá phòng trọ thành công!");

      onDelete(roomId);
      window.location.reload();
    } catch (error) {
      console.error("❌ Lỗi khi xoá phòng:", error.message);
      alert("❌ Không thể xoá phòng trọ!");
    }

    setActiveDropdown(null);
  };

  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = rooms.slice(startIndex, startIndex + roomsPerPage);

  return (
    <div className="room-management-container">
      <div className="header-section">
        <h1 className="title">Tin phòng</h1>
        <div className="actions">
          <a href="/admin/create-room" className="post-button" onClick={onPostListing}>
            Đăng tin
          </a>
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <span className="search-icon">⌕</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>TT</th>
              <th>Tên Phòng</th>
              <th>Mã Phòng</th>
              <th>Giá</th>
              <th>Loại Phòng</th>
              <th>Trạng Thái</th>
              <th>Ngày đăng</th>
              <th className="actions-th">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentRooms.map((room, index) => (
              <tr key={room.id} onClick={() => navigate(`/admin/room/${room.id}`)} style={{ cursor: "pointer" }}>
                <td>
                  <div className="room-image-container">
                    <img src={room.image} alt={room.name} className="room-thumbnail" />
                    <span className="index-number">{startIndex + index + 1}</span>
                  </div>
                </td>
                <td className="title-cell">{room.name}</td>
                <td>{room.code}</td>
                <td>{room.price}</td>
                <td>{room.type}</td>
                <td>
                  <span className={`status-badge ${room.status === 'Hiện' ? 'available' : 'pending'}`}>
                    {room.status}
                  </span>
                </td>
                <td>{room.date}</td>
                <td className="actions-td">
                  <div className="dropdown-container">
                    <button
                      className="action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(room.id);
                      }}
                    >
                      ...
                    </button>
                    {activeDropdown === room.id && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={(e) => handleEdit(room.id, e)}>
                          <span className="icon edit-icon">✎</span>
                          Sửa
                        </button>
                        <button className="dropdown-item" onClick={(e) => handleDelete(room.id, e)}>
                          <span className="icon delete-icon">🗑</span>
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentRooms.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-row">Không có dữ liệu phòng trọ nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-item prev"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-item next"
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomManagementTable;
