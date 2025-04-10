import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/storage';
import '../../styles/admin/RoomManagementTable.scss';

const PermissionManagement = () => {
    const [permissions, setPermissions] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/permissions');
            setPermissions(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quyền:', error);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm('Bạn có chắc muốn xoá quyền này?');
        if (!confirmDelete) return;

        try {
            const token = getToken();
            await axios.delete(`http://localhost:3001/api/permissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Đã xoá quyền thành công!');
            fetchPermissions();
        } catch (err) {
            console.error('Lỗi khi xoá quyền:', err);
            alert('Không thể xoá quyền!');
        }
    };

    const handleEdit = (id, e) => {
        e.stopPropagation();
        navigate(`/admin/permissions/${id}`);
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    return (
        <div className="room-management-container">
            <div className="header-section">
                <h1 className="title">Quản lý quyền</h1>
                <div className="actions">
                    <a href="/admin/permission/create" className="post-button">
                        Thêm quyền
                    </a>
                </div>
            </div>

            <div className="table-container">
                <table className="room-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên quyền</th>
                            <th>Mô tả</th>
                            <th className="actions-th">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((perm, index) => (
                            <tr key={perm._id} style={{ cursor: 'default' }}>
                                <td>{index + 1}</td>
                                <td className="title-cell">{perm.tenQuyen}</td>
                                <td>{perm.moTa}</td>
                                <td className="actions-td">
                                    <div className="dropdown-container">
                                        <button
                                            className="action-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(perm._id);
                                            }}
                                        >
                                            ...
                                        </button>
                                        {activeDropdown === perm._id && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item" onClick={(e) => handleEdit(perm._id, e)}>
                                                    <span className="icon edit-icon">✎</span>
                                                    Sửa
                                                </button>
                                                <button className="dropdown-item" onClick={(e) => handleDelete(perm._id, e)}>
                                                    <span className="icon delete-icon">🗑</span>
                                                    Xoá
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {permissions.length === 0 && (
                            <tr>
                                <td colSpan="4" className="empty-row">Không có quyền nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PermissionManagement;
