import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser, removeToken } from "../../utils/storage";
import { IoMenu } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";


import "../../styles/common/Header.scss";

const Header = () => {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowMenu(prev => !prev);
    };  
    useEffect(() => {
        const loggedInUser = getUser();
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".user-dropdown")) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                            <a href="/rooms" className="text-wrapper-8">
                                Phòng trọ
                            </a>
                            <a href="/rooms/location/67ea6d7cf45f6276995baab6" className="text-wrapper-8">
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

                    <div className="frame-2">
                        {user ? (
                            <div className="user-info">
                                <div className="user-dropdown">
                                    <div className="user-toggle" onClick={toggleDropdown}  data-testid="user-menu-toggle">
                                        <span><strong>{user.taiKhoan}</strong></span>
                                        <div className="icon-menu">
                                            <IoMenu className="icon" />
                                        </div>

                                    </div>

                                    <div className={`dropdown-box ${showMenu ? "show" : ""}`}>
                                        <div className="dropdown-item">
                                            <a href="/profile">Hồ sơ</a>
                                        </div>
                                        <div className="dropdown-item">
                                            <a href="/setting">Cài đặt</a>
                                        </div>
                                        <div className="dropdown-item" style={{ color: 'red' }} onClick={handleLogout}>
                                            <TbLogout />Đăng xuất
                                        </div>
                                    </div>
                                </div>
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
