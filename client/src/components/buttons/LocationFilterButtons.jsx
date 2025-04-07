import React from "react";
import "../../styles/common/Button.scss"

const LocationButton = ({ className, divClassName }) => {
    return (
        <button className={`button ${className}`}>
            <div className={`text-wrapper-15 ${divClassName}`}>Tp.Hồ Chí Minh</div>
        </button>
    );
};
export default LocationButton;