import "../styles/user/UserProfile.scss";
import React, { useEffect, useState } from "react";
import ProfileForm from "../components/profile/ProfileForm";
import Sidebar from "../components/profile/Sidebar";

export const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.user) setUser(data.user);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };

    fetchMe();
  }, []);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <Sidebar user={user} />
        <ProfileForm user={user} />
      </div>
    </div>
  );
};
