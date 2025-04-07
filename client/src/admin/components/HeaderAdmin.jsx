import React from 'react';
import '../../styles/admin/headeradmin.scss';

const HeaderAdmin = () => {
  return (
    <div className="admin-header">
      <div className="left-section">
        <span className="menu-title">Quản Trị</span>
        <span className="divider">|</span>
        <span className="current-page">Trang Chủ</span>
      </div>
      <div className="right-section">
        <div className="user-info">
          <span className="username">Nguyễn Thanh Phong</span>
          <button className="logout-btn">
            <img className="fa fa-sign-out" src='https://c.animaapp.com/W9WTQKAn/img/log-out-1.svg'></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;