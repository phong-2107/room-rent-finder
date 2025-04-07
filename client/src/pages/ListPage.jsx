import React from "react";
import Find from "../components/List/Find";
import Categories from "../components/List/Categories";


const ListPage = () => {
    return (
        <div className="list" style={{ marginTop: "100px" }}>
            <div className="div-2">
                <Find />
                <Categories />

            </div>
        </div>
    );
};

export default ListPage;