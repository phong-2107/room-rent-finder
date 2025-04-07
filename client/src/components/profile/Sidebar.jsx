import React from "react";

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* User Info Section */}
      <div className="sidebar__user-info">
        <div className="sidebar__avatar"></div>
        <div className="sidebar__username">
          <div className="sidebar__username-text">Khanh Hồ</div>
        </div>
      </div>
      
      {/* Personal Info Button - Active */}
      <button className="sidebar__menu-item sidebar__menu-item--active">
        <img
          className="sidebar__menu-icon"
          alt="Profile Icon"
          src="https://c.animaapp.com/Av7kc8aL/img/icon.svg"
        />
        <div className="sidebar__menu-text">
          <div className="sidebar__menu-label">Thông tin cá nhân</div>
        </div>
      </button>
      
      {/* Logout Button */}
      <button className="sidebar__menu-item sidebar__menu-item--logout">
        <div className="sidebar__menu-icon-wrapper">
          <img
            className="sidebar__logout-icon"
            alt="Logout"
            src="https://c.animaapp.com/Av7kc8aL/img/group-16@2x.png"
          />
        </div>
        <div className="sidebar__menu-text">
          <div className="sidebar__menu-label">Đăng xuất</div>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;