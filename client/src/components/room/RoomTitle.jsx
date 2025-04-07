import React from "react";

const RoomTitle = ({ title, location }) => {
  return (
    <div className="room-title">
      <h2>{title}</h2>
      <p className="address">{location}</p>
    </div>
  );
};

export default RoomTitle;
