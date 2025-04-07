import React from "react";
import ListAll from "../components/List/ListAll";
import Map from "../components/Home/Map";


import "../styles/home/style.scss";

const RoomsPages = () => {
    return (
        <div className="home">

            <div className="div-2">
                <ListAll />
                <Map></Map>
            </div>
        </div>
    );
};

export default RoomsPages;
