import React, { useEffect, useState } from "react";
import "../../styles/home/Categories.scss";
import { fetchRooms, fetchDiaDiem } from "../../features/roomApi";
import Place from "../Home/Place";
import Card from "../Home/Card";

const ListAll = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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

    // Tính dữ liệu trang hiện tại
    const totalPages = Math.ceil(roomsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRooms = roomsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="categories-Home">
            <div className="title-3">
                <div className="text-wrapper-11">PHÒNG TRỌ NỔI BẬT</div>
            </div>

            <div className="list-card">
                <div className="list-place">
                    <div className="text-wrapper-12">Cho Thuê Phòng Trọ</div>

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

                <div className="frame-10">
                    {loading ? (
                        <p>Đang tải phòng trọ...</p>
                    ) : (
                        currentRooms.map((room) => (
                            <Card
                                key={room._id}
                                id={room._id}
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
                {!loading && totalPages > 1 && (
                    <div className="pagination" style={{ marginTop: "30px", textAlign: "center" }}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                                style={{
                                    margin: "0 5px",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    backgroundColor: currentPage === index + 1 ? "#007bff" : "#f0f0f0",
                                    color: currentPage === index + 1 ? "#fff" : "#333",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListAll;
