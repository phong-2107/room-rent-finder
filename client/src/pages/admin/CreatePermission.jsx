import React, { useState } from 'react';
import '../../styles/admin/createRoom.scss';
import { getToken } from '../../utils/storage';
import axios from 'axios';

const CreatePermission = () => {
    const [formData, setFormData] = useState({
        tenQuyen: '',
        moTa: ''
    });

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            if (!token) {
                alert("Bạn chưa đăng nhập hoặc token hết hạn!");
                return;
            }

            const res = await axios.post("http://localhost:3001/api/permissions", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("✅ Tạo quyền thành công!");
            setFormData({ tenQuyen: '', moTa: '' });
        } catch (err) {
            console.error("❌ Lỗi khi tạo quyền:", err);
            alert("❌ Không thể tạo quyền!");
        }
    };

    return (
        <div className="create-room-page">
            <div className="form-container">
                <div className="page-title">
                    <h2>Thêm quyền mới</h2>
                </div>

                <form className="room-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="tenQuyen">Tên quyền</label>
                            <input
                                name="tenQuyen"
                                className="form-input"
                                value={formData.tenQuyen}
                                onChange={handleInputChange}
                                placeholder="VD: XEM_PHONG_TRO"
                            />
                        </div>

                        <div className="form-field description-field">
                            <label htmlFor="moTa">Mô tả</label>
                            <textarea
                                name="moTa"
                                rows="5"
                                className="form-input description-textarea"
                                value={formData.moTa}
                                onChange={handleInputChange}
                                placeholder="Mô tả chi tiết chức năng của quyền"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Xác nhận</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePermission;