import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../../styles/Map.scss";

const Maps = () => {
    const [locations, setLocations] = useState([]);

    const containerStyle = {
        width: "100%",
        height: "800px",
    };

    const center = {
        lat: 10.762622,
        lng: 106.660172,
    };

    useEffect(() => {
        fetch("/api/vi-tri")
            .then((res) => res.json())
            .then((data) => {
                setLocations(data);
            })
            .catch((err) => {
                console.error("Lỗi khi tải danh sách vị trí:", err);
            });
    }, []);

    return (
        <div className="map-section">
            <div className="title">
                <div className="text-wrapper-7">VỊ TRÍ DỰ ÁN NỔI BẬT</div>
            </div>

            <div className="place-2">
                <div className="content-map">
                    <div className="map-container">
                        <LoadScript googleMapsApiKey="AIzaSyCu7FX0KUfmR91YEYE5K0MqBsFcC4nc3qE">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                options={{
                                    fullscreenControl: true,
                                    zoomControl: true,
                                    streetViewControl: true,
                                    mapTypeControl: false,
                                }}
                            >
                                {/* Hiển thị các marker từ danh sách */}
                                {locations.map((loc, index) => (
                                    // <Marker
                                    //     key={index}
                                    //     position={{ lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }}
                                    //     title={loc.ten_dia_diem}
                                    // />
                                    <Marker
                                        key={index}
                                        position={{ lat: 10.84757046266876, lng: 106.78656071748101 }}
                                        title="Phòng trọ A"
                                    />
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maps;
