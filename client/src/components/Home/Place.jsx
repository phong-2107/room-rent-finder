import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home/Place.scss";

const Place = ({
  className = "",
  divClassName = "",
  text = "Tp.Hồ Chí Minh", // Tỉnh/Thành phố
  text2 = "",           // Quận/Huyện
  id
}) => {
  if (!id) return null; // tránh render nếu thiếu id

  const fullLocation = text ? `${text} - ${text2}` : text2;

  return (
    <Link to={`/rooms/location/${id}`} className={`place ${className}`}>
      <div className={`tp-h-ch-minh ${divClassName}`}>{fullLocation}</div>
    </Link>
  );
};

export default Place;
