import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/DetailRoom.scss";
import LocationButton from "../components/buttons/LocationFilterButtons";
import TypeHouse from "../components/List/TypeHouse";
import TypeHouseWrapper from "../components/List/TypeHouseWrapper";
import RoomGallery from "../components/room/RoomGallery";
import RoomTitle from "../components/room/RoomTitle";
import RoomPriceInfo from "../components/room/RoomPriceInfo";
import RoomDetails from "../components/room/RoomDetails";
import RelatedRecommendations from "../components/room/RelatedRecommendations ";

const DetailRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/room/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết phòng:", err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return <p>Đang tải thông tin phòng...</p>;
  }

  return (
    <div className="detail-room-page">
      <div className="detail-room-page-content">
        <div className="breadcrumbs-detailroom">
          <div className="text-wrapper">Home</div>
          <div className="text-wrapper">/</div>
          <div className="text-wrapper">Phòng trọ</div>
          <div className="text-wrapper">/</div>
          <div className="group">
            <LocationButton
              className="button-instance"
              divClassName="design-component-instance-node"
            />
          </div>
          <div className="text-wrapper">/</div>
          <div className="div">Nhà trọ số 1</div>
        </div>

        <div className="infor-room">
          <div className="cards-room">
            <div className="detail-room-content">
              <RoomGallery images={room.hinhAnh || []} />
              <RoomTitle
                title={room.tieuDe}
                location={`${room.diaChiCuThe}, ${room.diaDiem?.quanHuyen || ""}, ${room.diaDiem?.tinhThanh || ""}`}
              />
              <RoomPriceInfo
                price={`${(room.gia / 1000000).toFixed(1)} triệu / tháng`}
                area={`${room.dienTich} m²`}
                status={room.trangThai}
              />
              <RoomDetails
                description={room.moTa}
                postedBy={room.nguoiDang?.hoTen}
                createdAt={room.createdAt}
                updatedAt={room.updatedAt}
              />

            </div>
          </div>

          <div className="room-title">
            <TypeHouse
              text="Loại Phòng Cần Thuê"
              text1="Phòng trọ"
              text2="Chung cư"
              text3="Nhà nguyên căn"
              text4="Kí túc xá"
            />
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

        <div className="recommendations-wrapper">
          <RelatedRecommendations />
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
