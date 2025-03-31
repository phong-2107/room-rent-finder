// News.jsx
import React from "react";
import "../../styles/News/NewsCard.scss";

const News = ({ className, newsData }) => {
    // Ví dụ: { title: "...", content: "..." }
    return (
        <div className={`news ${className}`}>
            <div className="frame-wrapper">
                <div className="frame-13" />
            </div>

            <div className="header-2">
                <div className="frame-14">
                    <p className="p">{newsData.title}</p>
                </div>
                <div className="frame-14">
                    <p className="text-wrapper-12">{newsData.content}</p>
                </div>
            </div>
        </div>
    );
};
export default News;