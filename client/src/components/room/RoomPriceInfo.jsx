import React from "react";

const RoomPriceInfo = ({ price, area, status }) => {
  return (
    <div className="room-price-info">
      <div className="price-box">
        <div className="label">Giá thuê</div>
        <div className="price">{price}</div>
      </div>
      <div className="area-box">
        <div className="label">Diện tích</div>
        <div className="area">{area}</div>
      </div>
      <div className="area-box">
        <div className="label">Tình trạng</div>
        <div className="status">{status}</div>
      </div>

      <div className="area-box">
        <div className="label">Tình trạng</div>
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

export default RoomPriceInfo;
