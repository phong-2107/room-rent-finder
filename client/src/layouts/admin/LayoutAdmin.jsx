import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../../admin/components/HeaderAdmin';
import SidebarAdmin from '../../admin/components/SidebarAdmin';
import '../../styles/admin/layoutadmin.scss';

const LayoutAdmin = () => {
    return (
        <div className="admin-layout">
            <SidebarAdmin />
            <div className="admin-content">
                <HeaderAdmin />
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;