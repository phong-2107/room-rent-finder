import React, { useEffect, useState } from "react";
import "../../styles/home/Categories.scss";
import Place from "./Place";
import Card from "./Card";
import { fetchRooms, fetchDiaDiem } from "../../features/roomApi";

const Categories = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [roomData, diaDiemData] = await Promise.all([
                    fetchRooms(),
                    fetchDiaDiem(),
                ]);
                setRoomsData(roomData);
                setLocations(diaDiemData);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="categories-Home">
            <div className="title-3">
                <div className="text-wrapper-11">PHÒNG TRỌ NỔI BẬT</div>
            </div>

            <div className="list-card">
                <div className="list-place">
                    <div className="text-wrapper-12">Cho Thuê Phòng Trọ</div>

                    <div className="places">
                        {console.log("Location: ", locations)}

                        <div className="places">
                            {locations.map((location) => (
                                <Place
                                    key={location._id}
                                    className="place-instance"
                                    divClassName="design-component-instance-node"
                                    text={location.tinhThanh}
                                    id={location._id}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="frame-10">
                    {loading ? (
                        <p>Đang tải phòng trọ...</p>
                    ) : (
                        roomsData.map((room) => (
                            <Card
                                key={room._id}
                                className="card-instance"
                                imgClassName="card-2"
                                textIconsClassName="card-4"
                                vectorClassName="card-3"
                                title={room.tieuDe}
                                location={`${room.diaChiCuThe}, ${room.diaDiem?.quanHuyen || ""}, ${room.diaDiem?.tinhThanh || ""}`}
                                price={`${(room.gia / 1000000).toFixed(1)} Triệu / Tháng`}
                                area={`${room.dienTich}m2`}
                                timeAgo={"Vừa đăng"}
                                isHot={true}
                                imageSrc={room.hinhAnh?.[0]}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
