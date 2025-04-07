import React from "react";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <div className="sidebar__avatar">
          {/* Ảnh đại diện nếu có */}
          {user?.anhDaiDien ? (
            <img src={user.anhDaiDien} alt="avatar" />
          ) : null}
        </div>
        <div className="sidebar__username">
          <div className="sidebar__username-text">
            {user?.hoTen || "Người dùng"}
          </div>
        </div>
      </div>

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
