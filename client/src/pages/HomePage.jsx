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

            </div>
        </div>
    );
};

export default HomePage;
