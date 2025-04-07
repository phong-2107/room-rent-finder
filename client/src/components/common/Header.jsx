import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser, removeToken } from "../../utils/storage";

import "../../styles/common/Header.scss";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = getUser();
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3001/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            removeUser();
            removeToken();
            setUser(null); // Cập nhật UI
            navigate("/login"); // Điều hướng về trang đăng nhập
        } catch (error) {
            console.error("Lỗi khi logout:", error);
        }
    };

    return (
        <div className="header">
            <div className="navbar-wrapper">
                <div className="navbar">
                    {/* Logo */}
                    <a href="/" className="logo">
                        <div className="logo-2" />
                    </a>

                    {/* Khối link bên trái */}
                    <div className="frame-2">
                        <div className="frame-3">
                            {/* Đổi div thành a để có link */}
                            <a href="/phong-tro" className="text-wrapper-8">
                                Phòng trọ
                            </a>
                            <a href="/list" className="text-wrapper-8">
                                Danh Mục
                            </a>
                            <a href="/news" className="text-wrapper-8">
                                Tin Tức
                            </a>
                            <a href="/contact" className="text-wrapper-8">
                                Liên Hệ
                            </a>
                        </div>
                    </div>

                    {/* đăng nhập đăng kýký*/}
                    <div className="frame-2">
                        {user ? (
                            <div className="user-info">
                                <span>Hi! <strong>{user.taiKhoan}</strong></span>
                                <button onClick={handleLogout} className="logout" title="Đăng xuất">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </div>
                        ) : (
                            <>
                                <a href="/login" className="SIGN-IN">Đăng Nhập</a>
                                <div className="SIGN-UP-wrapper">
                                    <a href="/register" className="SIGN-UP">Đăng Ký</a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
