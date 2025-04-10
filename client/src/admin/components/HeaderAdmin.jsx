import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../../utils/storage";
import "../../styles/admin/headeradmin.scss";
import { TbLogout } from "react-icons/tb";
const HeaderAdmin = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    } finally {
      removeToken();
      removeUser();
      navigate("/login"); // Hoặc "/" tùy trang đăng nhập
    }
  };

  return (
    <div className="admin-header">
      <div className="left-section">
        <span className="menu-title">Quản Trị</span>
        <span className="divider">|</span>
        <span className="current-page">Trang Chủ</span>
      </div>
      <div className="right-section">
        <div className="user-info">
          <span className="username">{user?.hoTen || "Tài khoản"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <TbLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
