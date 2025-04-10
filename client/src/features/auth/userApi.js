export const fetchKhachHangCount = async () => {
    const res = await fetch("http://localhost:3001/api/auth/Customer/count");

    if (!res.ok) {
        throw new Error("Không thể lấy số lượng khách hàng");
    }

    const data = await res.json();
    return data.count; // Trả về số lượng
};
