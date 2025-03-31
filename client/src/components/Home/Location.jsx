import React from "react";
import "../../styles/home/Location.scss";
const Location = () => {
    return (
        <div className="locaton">
            <div className="title">
                <div className="text-wrapper-7">ĐỊA ĐIỂM SÔI ĐỘNG</div>
            </div>

            <div className="place-2">
                {/* <div className="title-2">
                    <p className="p">Thuê Trọ Theo Địa Điểm</p>
                </div> */}

                <div className="content">
                    <div className="location-left">
                        <img
                            className="image"
                            alt="Image"
                            src="https://c.animaapp.com/m8uerufgJVBeV6/img/image-1.png"
                        />

                        <div className="text-wrapper-8">Hồ Chí Minh</div>
                    </div>

                    <div className="location-right ">
                        <div className="item">
                            <img
                                className="image-2"
                                alt="Image"
                                src="https://c.animaapp.com/m8uerufgJVBeV6/img/image-2.png"
                            />

                            <div className="text-wrapper-9">Bình Dương</div>
                        </div>

                        <div className="item">
                            <img
                                className="image-2"
                                alt="Image"
                                src="https://c.animaapp.com/m8uerufgJVBeV6/img/image-3.png"
                            />

                            <div className="text-wrapper-9">Đồng Nai</div>
                        </div>

                        <div className="item">
                            <img
                                className="image-2"
                                alt="Image"
                                src="https://c.animaapp.com/m8uerufgJVBeV6/img/image-4.png"
                            />

                            <div className="text-wrapper-9">Hà Nội</div>
                        </div>

                        <div className="item">
                            <img
                                className="image-2"
                                alt="Image"
                                src="https://c.animaapp.com/m8uerufgJVBeV6/img/image-5.png"
                            />

                            <p className="text-wrapper-10">Bà Rịa - Vũng Tàu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Location;