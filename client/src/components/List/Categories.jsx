import React, { useEffect, useState } from "react";
import "../../styles/Categories.scss";
import CardRow from "../cards/CardRow";
import TypeHouseWrapper from "./TypeHouseWrapper";
import TypeHouse from "./TypeHouse";
import LocationButton from "../buttons/LocationFilterButtons";

const Categories = ({ diaDiemId }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tinhThanh, setTinhThanh] = useState("");

    useEffect(() => {
        const fetchRoomsByLocation = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/room/by-location/${diaDiemId}`);
                const data = await response.json();
                setRooms(data);
                if (data.length > 0 && data[0].diaDiem) {
                    setTinhThanh(data[0].diaDiem.tinhThanh);
                } else {
                    setTinhThanh("Không rõ khu vực");
                }
            } catch (error) {
                console.error("Lỗi khi lấy phòng theo địa điểm:", error);
            } finally {
                setLoading(false);
            }
        };

        if (diaDiemId) {
            fetchRoomsByLocation();
        }
    }, [diaDiemId]);

    return (
        <div className="categories">
            <div className="menu-categories">
                <div className="breadcrumbs">
                    <div className="text-wrapper">Home</div>
                    <div className="text-wrapper">/</div>
                    <div className="div">Phòng trọ</div>
                    <div className="text-wrapper">/</div>
                    <div className="group">
                        <LocationButton
                            className="button-instance"
                            divClassName="design-component-instance-node"
                            tinhThanh={tinhThanh}
                        />
                    </div>
                </div>

                <div className="infor">
                    <div className="cards">
                        {loading ? (
                            <p>Đang tải danh sách phòng...</p>
                        ) : rooms.length === 0 ? (
                            <p>Không tìm thấy phòng trọ nào trong khu vực này.</p>
                        ) : (
                            rooms.map((room) => (
                                <CardRow
                                    key={room._id}
                                    room={{
                                        id: room._id,
                                        name: room.tieuDe,
                                        location: `${room.diaChiCuThe}, ${room.diaDiem?.quanHuyen}, ${room.diaDiem?.tinhThanh}`,
                                        price: `${(room.gia / 1000000).toFixed(1)} Triệu`,
                                        area: room.dienTich,
                                        imageUrl: room.hinhAnh?.[0],
                                        updatedTime: "Vừa đăng",
                                    }}
                                />
                            ))
                        )}
                    </div>

                    <div className="categories-title">
                        <TypeHouse />
                        <div className="total-area" />

                        <TypeHouseWrapper />
                        <TypeHouse
                            className="type-house-instance"
                            divClassName="type-house-3"
                            divClassName1="type-house-5"
                            divClassName2="type-house-5"
                            divClassNameOverride="type-house-4"
                            text="Mức Giá Mong Muốn"
                            text1="4 Triệu"
                            text2="6 Triệu"
                            text3="10 Triệu"
                            text4="15 Triệu"
                            textIconsClassName="type-house-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
