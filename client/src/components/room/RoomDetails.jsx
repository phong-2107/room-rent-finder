import React from "react";

const RoomDetails = () => {
    return (
      <div className="room-details">
        <h3>Thông tin mô tả</h3>
        <ul>
          <li>Phòng cho thuê thiết kế riêng có cửa sổ rộng</li>
          <li>Khu dân cư yên tĩnh, an ninh</li>
          <li>Phòng sạch sẽ không nấu ăn sáng dậy dọn</li>
          <li>Có gác gỗ, nhà vệ sinh trong phòng</li>
          <li>Phi Điền huấn tình riêng</li>
          <li>Có Wifi</li>
          <li>Mọi thông tin chi tiết vui lòng liên hệ Cô Phụng 0789949423</li>
        </ul>
  
        <div className="post-dates">
          <div className="post-date">
            <div className="label">Ngày đăng</div>
            <div className="date">23/03/2025</div>
          </div>
          <div className="post-date">
            <div className="label">Ngày hết hạn</div>
            <div className="date">28/03/2025</div>
          </div>
        </div>
      </div>
    );
  };

export default RoomDetails;