import React from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Home/Map";


import "../styles/home/style.scss";
import ListFind from "../components/List/ListFind";

const FindRoom = () => {

    const locationState = useLocation().state;
    const {
        searchText = "",
        area = "",
        location = "",
        price = "",
    } = locationState || {};

    console.log("Location State:", locationState);

    return (
        <div className="home">

            <div className="div-2">
                <ListFind
                    filterParams={{
                        searchText,
                        area,
                        location,
                        price,
                    }}
                />
                <Map></Map>
            </div>
        </div>
    );
};

export default FindRoom;
