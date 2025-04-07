// Content.jsx
import React from "react";
import News from "../cards/NewsCard";
import "../../styles/News/Content.scss";


const Content = () => {
    // Giả lập một vài tin tức dạng object
    const newsItem1 = {
        title: "Hướng dẫn xem và tính tiền điện nước phòng trọ chuẩn",
        content: "Cách tính tiền điện nước tại phòng trọ... Chủ trọ nói sao biết vậy."
    };

    const newsItem2 = {
        title: "Bí quyết thuê phòng trọ giá rẻ",
        content: "Muốn thuê phòng trọ giá tốt thì bạn cần lưu ý những điều sau..."
    };

    const newsItem3 = {
        title: "Kinh nghiệm ở ghép phòng trọ",
        content: "Việc ở ghép giúp tiết kiệm chi phí nhưng cũng có nhiều bất tiện..."
    };

    return (
        <div className="content">
            <div className="title">
                <div className="text-wrapper-11">TIN TỨC NỔI BẬT</div>
            </div>
            <div className="list-news">
                {/* Mỗi News sẽ nhận một bộ dữ liệu khác nhau */}
                <News className="news-instance" newsData={newsItem1} />
                <News className="design-component-instance-node" newsData={newsItem2} />
                <News className="news-2" newsData={newsItem3} />
            </div>

            <div className="list-news-2">
                <News className="news-instance" newsData={newsItem2} />
                <News className="design-component-instance-node" newsData={newsItem3} />
                <News className="news-2" newsData={newsItem1} />
            </div>

            <div className="list-news-3">
                <News className="news-instance" newsData={newsItem3} />
                <News className="design-component-instance-node" newsData={newsItem1} />
                <News className="news-2" newsData={newsItem2} />
            </div>

            <div className="list-news-4">
                <News className="news-instance" newsData={newsItem1} />
                <News className="design-component-instance-node" newsData={newsItem2} />
                <News className="news-2" newsData={newsItem3} />
            </div>

            <div className="controls">
                <div className="text-wrapper-10">Xem thêm tin v</div>
            </div>


        </div>
    );
};
export default Content;