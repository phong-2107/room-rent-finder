import "../styles/user/UserProfile.scss";
import React from "react";
import Sidebar from "../components/profile/Sidebar";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";

export const ChangePassword = () => {
    return (
      <div className="user-profile">
        <div className="user-profile__container">
          <Sidebar />
          <ChangePasswordForm />
        </div>
      </div>
    );
};