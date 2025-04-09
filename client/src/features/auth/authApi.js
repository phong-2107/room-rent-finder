export const login = async (taiKhoan, password) => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taiKhoan, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
    return data;
};
