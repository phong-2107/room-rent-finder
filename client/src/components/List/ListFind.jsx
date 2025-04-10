import React, { useEffect, useState } from "react";
import "../../styles/home/Categories.scss";
import { toast } from "react-toastify";
import {
    fetchRooms,
    fetchDiaDiem,
    fetchRoomsWithFilter
} from "../../features/roomApi";
import Place from "../Home/Place";
import Card from "../Home/Card";

const ListFind = ({ filterParams }) => {
    const [rooms, setRooms] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // State phục vụ phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Lấy danh sách địa điểm (chỉ cần 1 lần khi mount)
    useEffect(() => {
        const loadLocations = async () => {
            try {
                const diaDiemData = await fetchDiaDiem();
                setLocations(diaDiemData);
            } catch (err) {
                console.error("Lỗi khi lấy địa điểm:", err);
            }
        };
        loadLocations();
    }, []);

    // Lấy danh sách phòng (tất cả hoặc đã lọc) dựa trên filterParams
    useEffect(() => {
        const loadRooms = async () => {
            setLoading(true);
            try {
                const hasFilter =
                    filterParams &&
                    Object.values(filterParams).some((value) => value !== "" && value !== null && value !== undefined);

                if (hasFilter) {
                    const result = await fetchRoomsWithFilter(filterParams);

                    // ✅ Nếu là mảng phòng trả về bình thường
                    if (Array.isArray(result)) {
                        setRooms(result);
                    }
                    // ✅ Nếu là object có message + data (rỗng)
                    else if (result?.data && Array.isArray(result.data)) {
                        setRooms(result.data);
                        if (result.data.length === 0) {
                            toast.info(result.message || "Không có phòng nào phù hợp");
                        }
                    }
                } else {
                    const allRooms = await fetchRooms();
                    setRooms(allRooms);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách phòng:", err);
                toast.error("Đã xảy ra lỗi khi lấy danh sách phòng");
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, [filterParams]);

    // Tính toán dữ liệu cho phân trang
    const totalPages = Math.ceil(rooms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRooms = rooms.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="categories-Home">
            <div className="title-3">
                <div className="text-wrapper-11">DANH SÁCH PHÒNG TRỌ</div>
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
                                location={`
                  ${room.diaChiCuThe},
                  ${room.diaDiem?.quanHuyen || ""},
                  ${room.diaDiem?.tinhThanh || ""}
                `}
                                price={`${(room.gia / 1000000).toFixed(1)} Triệu / Tháng`}
                                area={`${room.dienTich}m2`}
                                timeAgo={"Vừa đăng"}
                                isHot={true}
                                imageSrc={room.hinhAnh?.[0]}
                            />
                        ))
                    )}
                </div>

                {/* Hiển thị nút phân trang nếu có nhiều dữ liệu */}
                {!loading && totalPages > 1 && (
                    <div
                        className="pagination"
                        style={{ marginTop: "30px", textAlign: "center" }}
                    >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? "active" : ""
                                    }`}
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

export default ListFind;
