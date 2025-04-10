import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/admin/sidebaradmin.scss';

const SidebarAdmin = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('/admin/dashboard');

  useEffect(() => {
    // Update the active item based on current path
    const currentPath = location.pathname;
    setActiveItem(currentPath);
  }, [location]);

  // Function to check if a menu item is active
  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return activeItem === path;
    }
    // For other routes, check if the current path starts with the menu path
    return activeItem.startsWith(path);
  };

  return (
    <div className="admin-sidebar">
      <div className="logo-container">
        <Link to="/admin/dashboard" className="logo-link">
          <img src="https://c.animaapp.com/m8twrcooYWMm14/img/logo.png" alt="TimTro24H" className="logo" />
        </Link>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li className={isActive('/admin/dashboard') ? 'active' : ''}>
            <Link to="/admin/dashboard">
              <img src='https://c.animaapp.com/W9WTQKAn/img/dashboard-1.svg' className="menu-icon" alt="" />
              <span>Trang Chủ</span>
            </Link>
          </li>
          <li className={isActive('/admin/room') ? 'active' : ''}>
            <Link to="/admin/room">
              <img src='https://c.animaapp.com/W9WTQKAn/img/home-1.svg' className="menu-icon" alt="" />
              <span>Tin Phòng</span>
            </Link>
          </li>
          <li className={isActive('/admin/nguoi-dung') ? 'active' : ''}>
            <Link to="/admin/nguoi-dung">
              <img src='https://c.animaapp.com/W9WTQKAn/img/users-1.svg' className="menu-icon" alt="" />
              <span>Người Dùng</span>
            </Link>
          </li>
          <li className={isActive('/admin/tin-tuc') ? 'active' : ''}>
            <Link to="/admin/tin-tuc">
              <img src='https://c.animaapp.com/W9WTQKAn/img/smartphone-1.svg' className="menu-icon" alt="" />
              <span>Tin Tức</span>
            </Link>
          </li>
          <li className={isActive('/admin/quyen') ? 'active' : ''}>
            <Link to="/admin/permission">
              <img src='https://c.animaapp.com/W9WTQKAn/img/key-1.svg' className="menu-icon" alt="" />
              <span>Quyền</span>
            </Link>
          </li>
          <li className={isActive('/admin/cai-dat') ? 'active' : ''}>
            <Link to="/admin/cai-dat">
              <img src='https://c.animaapp.com/W9WTQKAn/img/settings.svg' className="menu-icon" alt="" />
              <span>Cài Đặt</span>
            </Link>
          </li>
          <li className="divider"></li>
          <li className={isActive('/admin/dong-xuat') ? 'active' : ''}>
            <Link to="/admin/dong-xuat">
              <img src='https://c.animaapp.com/W9WTQKAn/img/log-out-1.svg' className="menu-icon" alt="" />
              <span>Đăng Xuất</span>
            </Link>
          </li>
        </ul>
      </nav>
      <p className='copyright-admin'>copyright @timtro24h</p>
    </div>
  );
};

export default SidebarAdmin;