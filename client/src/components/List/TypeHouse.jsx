import React from "react";


import "../../styles/TypeHouse.scss";
const TypeHouse = ({
    className,
    text = "Loại Phòng Cần Thuê",
    textIconsClassName,
    divClassName,
    text1 = "Phòng trọ",
    divClassNameOverride,
    text2 = "Chung cư",
    divClassName1,
    text3 = "Nhà nguyên căn",
    divClassName2,
    text4 = "Kí túc xá",
}) => {
    return (
        <div className={`type-house ${className}`}>
            <div className="frame-wrapper">
                <div className="lo-i-ph-ng-c-n-thu-wrapper">
                    <div className="lo-i-ph-ng-c-n-thu">{text}</div>
                </div>
            </div>

            <div className={`text-icons-3 ${textIconsClassName}`}>
                <div className="total-area-wrapper">
                    <div className="total-area-4">
                        <img
                            className="frame-17"
                            alt="Frame"
                            src="https://c.animaapp.com/m8twrcooYWMm14/img/frame.svg"
                        />

                        <div className="text-4">
                            <div className={`text-wrapper-23 ${divClassName}`}>{text1}</div>
                        </div>
                    </div>
                </div>

                <div className="total-area-5">
                    <div className="total-area-4">
                        <img
                            className="frame-17"
                            alt="Frame"
                            src="https://c.animaapp.com/m8twrcooYWMm14/img/frame.svg"
                        />

                        <div className="text-4">
                            <div className={`text-wrapper-23 ${divClassNameOverride}`}>
                                {text2}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="total-area-6">
                    <div className="total-area-4">
                        <img
                            className="frame-17"
                            alt="Frame"
                            src="https://c.animaapp.com/m8twrcooYWMm14/img/frame.svg"
                        />

                        <div className="text-4">
                            <div className={`nh-nguy-n-c-n ${divClassName1}`}>{text3}</div>
                        </div>
                    </div>
                </div>

                <div className="total-area-7">
                    <div className="total-area-4">
                        <img
                            className="frame-17"
                            alt="Frame"
                            src="https://c.animaapp.com/m8twrcooYWMm14/img/frame.svg"
                        />

                        <div className="text-4">
                            <div className={`k-t-c-x ${divClassName2}`}>{text4}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TypeHouse;