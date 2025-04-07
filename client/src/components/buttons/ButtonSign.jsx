import React from "react";
import "../../styles/common/ButtonSign.scss";

const ButtonSign = ({ className }) => {
    return (
        <button className={`button ${className}`}>
            <div className="text-wrapper">Đăng nhập</div>
        </button>
    );
};
export default ButtonSign;