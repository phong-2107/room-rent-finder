import "../styles/user/UserProfile.scss";
import React, { useEffect, useState } from "react";
import ProfileForm from "../components/profile/ProfileForm";
import Sidebar from "../components/profile/Sidebar";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // Lấy token từ cả localStorage và sessionStorage
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        
        if (!token) {
          setError("Bạn chưa đăng nhập hoặc token không tồn tại.");
          return;
        }

        const response = await fetch("http://localhost:3001/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          setError("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
          // Xóa token không hợp lệ
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          return;
        }

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Lỗi khi lấy thông tin người dùng.");
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setError("Không tìm thấy thông tin người dùng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        setError("Đã xảy ra lỗi khi lấy thông tin người dùng.");
      }
    };

    fetchMe();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="loading-message">Đang tải thông tin người dùng...</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <Sidebar user={user} />
        <ProfileForm user={user} />
      </div>
    </div>
  );
};