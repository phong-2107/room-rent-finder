import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home/Place.scss";

const Place = ({ className = "", divClassName = "", text = "Tp.Hồ Chí Minh", id }) => {
    if (!id) return null; // tránh render nếu thiếu id

    return (
        <Link to={`/rooms/location/${id}`} className={`place ${className}`}>
            <div className={`tp-h-ch-minh ${divClassName}`}>{text}</div>
        </Link>
    );
};

export default Place;
