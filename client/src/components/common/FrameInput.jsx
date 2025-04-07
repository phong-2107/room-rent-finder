import React from "react";
import "../../styles/common/FrameInput.scss";

const FrameInput = ({ className, text = "Tên đăng nhập" }) => {
    return (
        <div className={`frame ${className}`}>
            <div className="t-n-ng-nh-p">{text}</div>
        </div>
    );
};
export default FrameInput;