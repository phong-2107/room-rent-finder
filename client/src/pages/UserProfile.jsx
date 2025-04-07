import "../styles/user/UserProfile.scss";
import React from "react";
import ProfileForm from "../components/profile/ProfileForm";
import Sidebar from "../components/profile/Sidebar";

export const UserProfile = () => {
    return (
      <div className="user-profile">
        <div className="user-profile__container">
          <Sidebar />
          <ProfileForm />
        </div>
      </div>
    );
};