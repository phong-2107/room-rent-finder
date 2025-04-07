import React from "react";
import CardRow from "../cards/CardRow";

export const ContentFollowList = () => {
  const mockRooms = [
    {
        id: 1,
        name: "Phòng trọ số 1",
        location: "Dĩ An, Bình Dương",
        price: "6 Triệu",
        area: 60,
        imageUrl: "https://example.com/room1.jpg",
        updatedTime: "1 giờ trước",
    },
    {
        id: 2,
        name: "Phòng trọ số 2",
        location: "Quận 1, TP. HCM",
        price: "4 Triệu",
        area: 25,
        imageUrl: "https://example.com/room2.jpg",
        updatedTime: "2 giờ trước",
    },
    {
        id: 3,
        name: "Phòng trọ số 3",
        location: "Thủ Đức, TP. HCM",
        price: "3 Triệu",
        area: 20,
        imageUrl: "https://example.com/room3.jpg",
        updatedTime: "3 giờ trước",
    },
    {
        id: 4,
        name: "Phòng trọ số 4",
        location: "Bình Thạnh, TP. HCM",
        price: "5 Triệu",
        area: 40,
        imageUrl: "https://example.com/room4.jpg",
        updatedTime: "5 giờ trước",
    },
    {
        id: 5,
        name: "Phòng trọ số 5",
        location: "Thủ Dầu Một, Bình Dương",
        price: "4.5 Triệu",
        area: 35,
        imageUrl: "https://example.com/room5.jpg",
        updatedTime: "8 giờ trước",
    },
    {
        id: 6,
        name: "Phòng trọ số 6",
        location: "Dĩ An, Bình Dương",
        price: "6 Triệu",
        area: 60,
        imageUrl: "https://example.com/room6.jpg",
        updatedTime: "Hôm qua",
    },
];
  return (
    <div className="content-by-anima">
      <div className="div-wrapper-3">
        <p className="p">Danh sách tin đã lưu</p>
      </div>

      <div className="card-content">
        {mockRooms.map((room) => (
           <CardRow key={room.id} room={room} />
        ))}
        <div className="div-wrapper-2">
          <div className="text-wrapper-8">Xem thêm</div>
        </div>
      </div>
    </div>
  );
};
