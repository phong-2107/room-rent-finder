import React from "react";
import Content from "../components/news/Content";
import ControlPage from "../components/news/ControlPage";

import "../styles/News/News.scss";

const NewsPage = () => {
    return (
        <div className="news-screen">
            <div className="news-3">
                <ControlPage />
                <Content />
                <div className="maps">
                    <div className="title-2">
                        <p className="text-wrapper-13">VỊ TRÍ DỰ ÁN NỔI BẬT</p>
                    </div>

                    <div className="map">
                        <img
                            className="image"
                            alt="Image"
                            src="https://c.animaapp.com/m8ua2uv9lJVQIw/img/image.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;