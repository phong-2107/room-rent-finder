export const register = async (hoTen, email, password, soDienThoai, roleName, profileImage) => {
    const formData = new FormData();
    formData.append("hoTen", hoTen);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("soDienThoai", soDienThoai);
    formData.append("roleName", roleName);
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Đăng ký thất bại");
    }

    return res.json();
};