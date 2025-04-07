import React from "react";
import "../../styles/CardRow.scss";
import { Link } from "react-router-dom";

const CardRow = ({ room }) => {
    if (!room) {
        // Có thể thay bằng loading hoặc fallback UI khác
        return <div>Không có dữ liệu</div>;
    }
    const shortName = room.name.length > 16 ? room.name.slice(0, 20) + "..." : room.name;
    return (
        <Link to={`/room/${room.id}`} className="card-row">
            {/* Thay thế div cứng bằng ảnh từ dữ liệu */}
            <img className="img-3" alt={room.name} src={room.imageUrl} />

            <div className="text-icons">
                <div className="text">
                    <div className="title">
                        <div className="frame-15">
                            <div className="text-wrapper-16">{shortName}</div>
                            <img
                                className="frame-16"
                                alt="Heart"
                                src="https://c.animaapp.com/m8twrcooYWMm14/img/frame-4.svg"
                            />
                        </div>
                        <div className="text-wrapper-17">{room.location}</div>
                    </div>

                    <div className="text-wrapper-18">{room.price} / Tháng</div>
                </div>

                <div className="text-icons-2">
                    {/* Diện tích */}
                    <div className="bedrooms">
                        <div className="icon-text">
                            <img
                                className="img-4"
                                alt="Size"
                                src="https://c.animaapp.com/m8twrcooYWMm14/img/size-fullscreen-svgrepo-com-1.svg"
                            />
                            <div className="text-2">
                                <div className="text-wrapper-19">{room.area}m²</div>
                            </div>
                        </div>
                        <div className="text-wrapper-20">Diện tích</div>
                    </div>

                    {/* Thời gian cập nhật */}
                    <div className="total-area-2">
                        <div className="total-area-3">
                            <img
                                className="img-4"
                                alt="Time"
                                src="https://c.animaapp.com/m8twrcooYWMm14/img/time-svgrepo-com-1.svg"
                            />
                            <div className="text-3">
                                <div className="text-wrapper-21">{room.updatedTime}</div>
                            </div>
                        </div>
                        <div className="text-wrapper-22">Thời gian</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CardRow;
