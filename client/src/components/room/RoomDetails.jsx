import React from "react";
import dayjs from "dayjs"; // npm install dayjs nếu chưa có

const RoomDetails = ({ description, postedBy, createdAt, updatedAt }) => {
  return (
    <div className="room-details">
      <h3>Thông tin mô tả</h3>
      <p>{description}</p>

      <div className="post-dates">
        {/* <div className="post-date">
          <div className="label">Người đăng</div>
          <div className="date">{postedBy}</div>
        </div> */}
        <div className="post-date">
          <div className="label">Ngày đăng</div>
          <div className="date">{dayjs(createdAt).format("DD/MM/YYYY")}</div>
        </div>
        <div className="post-date">
          <div className="label">Ngày hết hạn</div>
          <div className="date">{dayjs(updatedAt).format("DD/MM/YYYY")}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
