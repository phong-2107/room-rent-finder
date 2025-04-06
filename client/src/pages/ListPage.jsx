import React from "react";
import "../styles/Categories.scss";
import Find from "../components/List/Find";
import Categories from "../components/List/Categories";
import Map from "../components/Home/Map";
import "../styles/Style.scss";

const ListPage = () => {
    return (
        <div className="list" style={{ marginTop: "100px"}}>
            <div className="div-2">
                <Find />
                <Categories />

                <Map />

            </div>
        </div>
    );
};

export default ListPage;