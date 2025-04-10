import React from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "../../styles/Map.scss";

const Map = () => {
  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: 10.854296861820961,
    lng: 106.78361847999372,
  };

  return (
    <div className="map-section">
      <div className="title">
        <div className="text-wrapper-7">VỊ TRÍ DỰ ÁN NỔI BẬT</div>
      </div>

      <div className="place-2">
        <div className="content-map">
          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyDIAMVXhr_mIedsWJSvQSer5rBPQjsBZKM">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                  fullscreenControl: true,
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: false,
                }}
              >
                {/* You can add markers here if needed */}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;