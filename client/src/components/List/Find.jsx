import React, { useState } from "react";
import "../../styles/FindFilter.scss";
import Icons from "../icons/Icon";

const Find = () => {
    const [searchText, setSearchText] = useState("");
    const [roomType, setRoomType] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const handleSearch = () => {
        // Xử lý logic tìm kiếm
        console.log({ searchText, roomType, location, price });
    };

    return (
        <div className="frame">
            <div className="form">
                {/* Các trường tìm kiếm */}
                <div className="input">
                    {/* Tìm kiếm tên phòng */}
                    <div className="group-2">
                        <div className="label">Tìm Kiếm</div>
                        <div className="content-2">
                            <img
                                className="img-2"
                                alt="Frame"
                                src="https://c.animaapp.com/m8twrcooYWMm14/img/frame.svg"
                            />
                            <input
                                type="text"
                                placeholder="Tìm kiếm tên phòng trọ"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Loại phòng */}
                    <div className="group-3">
                        <div className="label">LOẠI PHÒNG</div>
                        <div className="content-3">
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <option value="">Phòng Trọ</option>
                                <option value="nhatro">Nhà trọ</option>
                                <option value="chungcu">Chung cư mini</option>
                                <option value="nguyencan">Nhà nguyên căn</option>
                            </select>
                            <Icons className="selectarrow" />
                        </div>
                    </div>

                    {/* Khu vực */}
                    <div className="group-4">
                        <div className="label">KHU VỰC</div>
                        <div className="content-3">
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Chọn Địa Điểm</option>
                                <option value="hcm">TP. Hồ Chí Minh</option>
                                <option value="hn">Hà Nội</option>
                                <option value="dn">Đà Nẵng</option>
                            </select>
                            <Icons className="selectarrow" />
                        </div>
                    </div>

                    {/* Mức giá */}
                    <div className="group-5">
                        <div className="label">Mức Giá</div>
                        <div className="content-3">
                            <select
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option value="">Tất cả mức giá</option>
                                <option value="duoi1tr">Dưới 1 triệu</option>
                                <option value="1-3tr">1 - 3 triệu</option>
                                <option value="3-5tr">3 - 5 triệu</option>
                                <option value="tren5tr">Trên 5 triệu</option>
                            </select>
                            <Icons className="selectarrow" />
                        </div>
                    </div>
                </div>
                <img
                    className="img"
                    alt="Filter"
                    src="https://c.animaapp.com/m8twrcooYWMm14/img/filter-1.svg"
                />

                {/* Nút tìm kiếm */}
                <button className="button-2" onClick={handleSearch}>
                    <img
                        className="img"
                        alt="Icon"
                        src="https://c.animaapp.com/m8twrcooYWMm14/img/icon.svg"
                    />
                    <div className="text-wrapper-2">TÌM KIẾM</div>
                </button>
            </div>
        </div>
    );
};

export default Find;
