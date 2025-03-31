import React from "react";
import Find from "../components/List/Find";
import Categories from "../components/List/Categories";


const ListPage = () => {
    return (
        <div className="list" style={{ marginTop: "100px" }}>
            <div className="div-2">
                <Find />
                <Categories />

                {/* <div className="frame-19">
                    <div className="frame-20">
                        <p className="text-wrapper-31">VỊ TRÍ DỰ ÁN NỔI BẬT</p>
                    </div>

                    <div className="group-10">
                        <div className="image-wrapper">
                            <img
                                className="image"
                                alt="Image"
                                src="https://c.animaapp.com/m8twrcooYWMm14/img/image.png"
                            />
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default ListPage;