export const fetchRooms = async () => {
    const res = await fetch("http://localhost:3001/api/room");
    if (!res.ok) throw new Error("Lỗi khi lấy danh sách phòng trọ");
    return await res.json();
};

export const fetchDiaDiem = async () => {
    const res = await fetch("http://localhost:3001/api/diadiem");
    if (!res.ok) throw new Error("Không thể lấy danh sách địa điểm");
    return await res.json();
};

export const fetchRoomCount = async () => {
    const res = await fetch("http://localhost:3001/api/room/count");
    if (!res.ok) throw new Error("Không thể lấy số lượng phòng");
    const data = await res.json();
    return data.count;
};


export const fetchRoomsWithFilter = async (params) => {
    try {
        // ✨ Lọc bỏ những giá trị rỗng hoặc null
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );

        const queryString = new URLSearchParams(cleanParams).toString();
        console.log("Query string gửi đi:", queryString);

        const res = await fetch(`http://localhost:3001/api/room/filter?${queryString}`);
        if (!res.ok) {
            throw new Error("Không thể lọc phòng trọ");
        }
        return await res.json();
    } catch (error) {
        console.error("Lỗi khi gọi API lọc phòng:", error);
        throw error;
    }
};
