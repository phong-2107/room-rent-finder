import React, { useEffect, useRef } from 'react';
import "../../styles/Map.scss";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 10.859493, lng: 106.781505 },
          zoom: 12,
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
        });
      }
    };

    // Nếu API đã sẵn sàng
    if (window.google) {
      initMap();
    } else {
      // Đợi script Google Maps tải xong
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }
  }, []);

  return (
    <div className="map-section">
      <div className="title">
        <div className="text-wrapper-7">VỊ TRÍ DỰ ÁN NỔI BẬT</div>
      </div>

      <div className="place-2">
        <div className="content-map">
          <div className="map-container">
            <div
              ref={mapRef}
              style={{ width: '100%', height: '500px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;