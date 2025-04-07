export const register = async (username, email, password) => {
    const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Đăng ký thất bại");
    }

    return res.json();
};
