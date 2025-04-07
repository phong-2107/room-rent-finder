import React from "react";
import Content from "../components/news/Content";
import ControlPage from "../components/news/ControlPage";
import Map from "../components/Home/Map";

import "../styles/News/News.scss";

const NewsPage = () => {
    return (
        <div className="news-screen">
            <div className="news-3">
                <ControlPage />
                <Content />
                <Map></Map>
            </div>
        </div>
    );
};

export default NewsPage;