import React from "react";
import "../../styles/common/Button.scss";

const LocationButton = ({ className, divClassName, tinhThanh = "Đang tải..." }) => {
    return (
        <button className={`button ${className}`}>
            <div className={`text-wrapper-15 ${divClassName}`}>{tinhThanh}</div>
        </button>
    );
};

export default LocationButton;
