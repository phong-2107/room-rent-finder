import React from "react";
import "../../styles/Categories.scss";
import CardRow from "../cards/CardRow";
import TypeHouseWrapper from "./TypeHouseWrapper";
import TypeHouse from "./TypeHouse";
import LocationButton from "../buttons/LocationFilterButtons";

const Categories = () => {

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
                        />
                    </div>
                </div>

                <div className="infor">
                    <div className="cards">
                        {mockRooms.map((room) => (
                            <CardRow key={room.id} room={room} />
                        ))}
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