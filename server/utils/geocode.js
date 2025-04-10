// utils/geocode.js
const fetch = require("node-fetch");

const getLatLngFromAddress = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            throw new Error("Chưa thiết lập GOOGLE_MAPS_API_KEY trong .env");
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else {
            console.error("Google Geocoding API lỗi:", data.status, data.error_message);
            return null;
        }
    } catch (error) {
        console.error("Lỗi khi gọi Google API:", error.message);
        return null;
    }
};

module.exports = {
    getLatLngFromAddress,
};
