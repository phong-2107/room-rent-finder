import React from "react";

const RelatedRecommendations = () => {
  const recommendedItems = [
    {
      id: 1,
      title: "Phòng trọ Số 1",
      price: "6 Triệu",
      area: 60,
      location: "Dĩ An, Bình Dương",
      imageUrl: "https://picsum.photos/300/200",
      updatedTime: "5 giờ trước"
    },
    {
      id: 2,
      title: "Phòng trọ Số 2",
      price: "5 Triệu",
      area: 45,
      location: "Thủ Đức",
      imageUrl: "https://picsum.photos/300/201",
      updatedTime: "2 giờ trước"
    },
    {
      id: 3,
      title: "Phòng trọ Số 3",
      price: "7 Triệu",
      area: 70,
      location: "Quận 9",
      imageUrl: "https://picsum.photos/300/202",
      updatedTime: "1 giờ trước"
    },
      {
      id: 4,
      title: "Phòng trọ Số 3",
      price: "7 Triệu",
      area: 70,
      location: "Quận 9",
      imageUrl: "https://picsum.photos/300/202",
      updatedTime: "1 giờ trước"
    }
    
  ];

  return (
    <div className="related-recommendations">
      <h3 className="section-title">Tin dành cho bạn</h3>
      <div className="recommendation-list">
        {recommendedItems.map(item => (
          <div className="recommendation-card" key={item.id}>
            <img className="card-image" src={item.imageUrl} alt={item.title} />

            <div className="card-content">
              <div className="card-header">
                <div>
                  <div className="card-title">{item.title}</div>
                  <div className="card-location">{item.location}</div>
                </div>
                <img
                  className="heart-icon"
                  alt="heart"
                  src="https://c.animaapp.com/m8twrcooYWMm14/img/frame-4.svg"
                />
              </div>

              <div className="card-price">{item.price} / Tháng</div>

              <div className="card-info-row">
                <div className="info-block">
                  <img
                    className="icon"
                    src="https://c.animaapp.com/m8twrcooYWMm14/img/size-fullscreen-svgrepo-com-1.svg"
                    alt="area"
                  />
                  <div>
                    <div className="info-text-1">{item.area}m²</div>
                    <div className="info-label">Diện tích</div>
                  </div>
                </div>
                <div className="info-block">
                  <img
                    className="icon"
                    src="https://c.animaapp.com/m8twrcooYWMm14/img/time-svgrepo-com-1.svg"
                    alt="time"
                  />
                  <div>
                    <div className="info-text-1">{item.updatedTime}</div>
                    <div className="info-label">Thời gian</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedRecommendations;
