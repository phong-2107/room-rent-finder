// src/pages/HomePage.jsx
import React from "react";
import Categories from "../components/Home/Categories";
import Slider from "../components/Home/Slider";
import Location from "../components/Home/Location";
import Map from "../components/Home/Map";


import "../styles/home/style.scss";
import Maps from "../components/Home/Maps";

const HomePage = () => {
    return (
        <div className="home">

            <div className="div-2">
                <Slider />
                <Categories />
                <Location />
                {/* <Map></Map> */}
                <Map></Map>
            </div>
        </div>
    );
};

export default HomePage;
