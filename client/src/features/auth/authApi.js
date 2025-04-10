export const login = async (taiKhoan, password) => {
    try {
        const res = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taiKhoan, password }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Đăng nhập thất bại");
        }
        
        // Kiểm tra xem phản hồi có chứa token không
        if (!data.token) {
            console.error("Response không chứa token:", data);
            throw new Error("Phản hồi từ server không có token");
        }
        
        return data;
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error;
    }
};