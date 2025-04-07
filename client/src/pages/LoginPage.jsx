import React, { useState } from "react";
import "../styles/user/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Xóa lỗi trước khi submit

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đăng nhập thất bại");
            }

            // Lưu token vào localStorage
            localStorage.setItem("token", data.token);

            dispatch(setLogin({ user: data.user, token: data.token }));

            // Điều hướng theo phân quyền
            if (data.user.loaiUser === "Admin") {
                navigate("/admin-dashboard");
            } else if (data.user.loaiUser === "NhanVien") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login">
            <div className="login_content">
                <h2>Đăng Nhập</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form className="login_content_form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Đăng nhập</button>
                </form>
                <a href="/register">Chưa có tài khoản? Đăng ký ngay</a>
            </div>
        </div>
    );
};

export default LoginPage;
