// src/pages/HomePage.jsx
import React from "react";
import Categories from "../components/Home/Categories";
import Slider from "../components/Home/Slider";
import Location from "../components/Home/Location";

import "../styles/home/style.scss";

const HomePage = () => {
    return (
        <div className="home">

            <div className="div-2">
                <Slider />
                <Categories />
                <Location />
                {/* <div className="overlap">
                    <div className="maps">
                        <div className="title-5">
                            <p className="text-wrapper-26">VỊ TRÍ DỰ ÁN NỔI BẬT</p>
                        </div>
                        <div className="image-wrapper">
                            <img
                                className="image-3"
                                alt="Image"
                                src="https://c.animaapp.com/m8uerufgJVBeV6/img/image.png"
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default HomePage;
