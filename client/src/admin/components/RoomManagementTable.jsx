import React, { useState } from 'react';
import '../../styles/admin/RoomManagementTable.scss';

const RoomManagementTable = ({ 
  rooms = [],
  onPostListing = () => {},
  onSearch = () => {},
  onEdit = () => {},
  onDelete = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const totalPages = 24;
  
  // Default rooms data if none provided (matching the data in the image)
  const defaultRooms = [
    {
      id: 1,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-1.jpg"
    },
    {
      id: 2,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-2.jpg"
    },
    {
      id: 3,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-3.jpg"
    },
    {
      id: 4,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-4.jpg"
    },
    {
      id: 5,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-5.jpg"
    },
    {
      id: 6,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-6.jpg"
    },
    {
      id: 7,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-7.jpg"
    },
    {
      id: 8,
      name: "Phòng trọ số 1",
      code: "47514501",
      price: "1.000.000 đ",
      type: "Phòng trọ",
      status: "Hiện",
      date: "27/3/2025",
      image: "/images/room-8.jpg"
    }
  ];

  const roomsToDisplay = rooms.length > 0 ? rooms : defaultRooms;

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (roomId) => {
    if (activeDropdown === roomId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(roomId);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle edit and delete actions
  const handleEdit = (roomId, e) => {
    e.stopPropagation();
    onEdit(roomId);
    setActiveDropdown(null);
  };

  const handleDelete = (roomId, e) => {
    e.stopPropagation();
    onDelete(roomId);
    setActiveDropdown(null);
  };

  return (
    <div className="room-management-container">
      <div className="header-section">
        <h1 className="title">Tin phòng</h1>
        <div className="actions">
          <a href='/admin/create-room' className="post-button" onClick={onPostListing}>
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
            {roomsToDisplay.map((room) => (
              <tr key={room.id}>
                <td>
                  <div className="room-image-container">
                    <img src={room.image} alt={room.name} className="room-thumbnail" />
                  </div>
                </td>
                <td className="title-cell">{room.name}</td>
                <td>{room.code}</td>
                <td>{room.price}</td>
                <td>{room.type}</td>
                <td>
                  <span className={`status-badge ${room.status === "Hiện" ? "available" : "pending"}`}>
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
                        <button 
                          className="dropdown-item" 
                          onClick={(e) => handleEdit(room.id, e)}
                        >
                          <span className="icon edit-icon">✎</span>
                          Sửa
                        </button>
                        <button 
                          className="dropdown-item" 
                          onClick={(e) => handleDelete(room.id, e)}
                        >
                          <span className="icon delete-icon">🗑</span>
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="pagination-item prev"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        
        <button 
          className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        
        <button 
          className={`pagination-item ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        
        <span className="pagination-ellipsis">...</span>
        
        <button 
          className={`pagination-item ${currentPage === 23 ? 'active' : ''}`}
          onClick={() => handlePageChange(23)}
        >
          23
        </button>
        
        <button 
          className={`pagination-item ${currentPage === 24 ? 'active' : ''}`}
          onClick={() => handlePageChange(24)}
        >
          24
        </button>
        
        <button 
          className="pagination-item next"
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default RoomManagementTable;