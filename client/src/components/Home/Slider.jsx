import React from "react";
import "../../styles/home/Slider.scss";
import Find from "./Find";
const Slider = () => {
    return (
        <div>

            <div className="slider">
                <div className="title-BG"></div>
                <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                        <p className="titleSlider">TÌM KIẾM PHÒNG TRỌ GIÁ RẺ</p>
                        <Find />
                    </div>
                </div>

            </div>

        </div>

    );
};
export default Slider;