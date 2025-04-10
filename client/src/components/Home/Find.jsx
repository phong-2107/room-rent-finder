import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm hook này để điều hướng
import { fetchDiaDiem } from "../../features/roomApi";
import "../../styles/home/FindFilter.scss";

const Find = () => {
    const [searchText, setSearchText] = useState("");
    const [area, setRoomArea] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const popularAreas = [15, 20, 30, 40, 60, 80];
    const [locations, setLocations] = useState([]);

    // Hook điều hướng
    const navigate = useNavigate();

    useEffect(() => {
        const getDiaDiem = async () => {
            try {
                const data = await fetchDiaDiem();
                setLocations(data);
            } catch (err) {
                console.error("Lỗi khi lấy địa điểm:", err.message);
            }
        };
        getDiaDiem();
    }, []);

    const handleSearch = () => {
        // Thay vì console.log, ta chuyển hướng sang /rooms
        navigate("/findroom", {
            state: {
                searchText,
                area,
                location,
                price,
            },
        });
    };

    return (
        <div className="find">
            <div className="form">
                <div className="input">

                    {/* Diện tích */}
                    <div className="group-3">
                        <div className="label">DIỆN TÍCH</div>
                        <div className="content-3">
                            <select value={area} onChange={(e) => setRoomArea(e.target.value)}>
                                <option value="">Chọn diện tích</option>
                                {popularAreas.map((a) => (
                                    <option key={a} value={a}>{a} m²</option>
                                ))}
                            </select>
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
                                {locations.map((loc) => (
                                    <option key={loc._id} value={loc._id}>
                                        {loc.tinhThanh} - {loc.quanHuyen}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mức giá */}
                    <div className="group-5">
                        <div className="label">Mức Giá</div>
                        <div className="content-3">
                            <select value={price} onChange={(e) => setPrice(e.target.value)}>
                                <option value="">Tất cả mức giá</option>
                                <option value="duoi1tr">Dưới 1 triệu</option>
                                <option value="1-3tr">1 - 3 triệu</option>
                                <option value="3-5tr">3 - 5 triệu</option>
                                <option value="tren5tr">Trên 5 triệu</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/* Icon filter chỉ để minh hoạ */}
                <img
                    className="img img-filter"
                    alt="Filter"
                    src="https://c.animaapp.com/m8twrcooYWMm14/img/filter-1.svg"
                />

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
