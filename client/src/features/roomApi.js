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