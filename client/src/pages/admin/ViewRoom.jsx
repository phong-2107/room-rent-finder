import React, { useState, useEffect } from 'react';
import '../../styles/admin/createRoom.scss';
import { fetchDiaDiem } from '../../features/roomApi';
import { getToken } from '../../utils/storage';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewRoom = () => {
    const { id } = useParams();
    const [selectedImages, setSelectedImages] = useState([]);
    const [diaDiems, setDiaDiems] = useState([]);
    const [formData, setFormData] = useState({
        tieuDe: '',
        loaiPhong: '',
        dienTich: '',
        gia: '',
        moTa: '',
        trangThai: '',
        diaDiem: '',
        diaChiCuThe: ''
    });

    useEffect(() => {
        const loadDiaDiem = async () => {
            try {
                const data = await fetchDiaDiem();
                setDiaDiems(data);
            } catch (error) {
                console.error("Lỗi khi tải địa điểm:", error);
            }
        };

        const fetchDetail = async () => {
            try {
                const token = getToken();
                const res = await axios.get(`http://localhost:3001/api/admin/rooms/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const room = res.data;
                setFormData({
                    tieuDe: room.tieuDe,
                    loaiPhong: 'Phòng trọ',
                    dienTich: room.dienTich,
                    gia: room.gia,
                    moTa: room.moTa,
                    trangThai: room.trangThai,
                    diaDiem: room.diaDiem?._id || '',
                    diaChiCuThe: room.diaChiCuThe
                });
                setSelectedImages(room.hinhAnh || []);
            } catch (err) {
                console.error("❌ Lỗi khi tải chi tiết phòng:", err);
            }
        };

        loadDiaDiem();
        if (id) fetchDetail();
    }, [id]);

    return (
        <div className="create-room-page">
            <div className="form-container">
                <div className="page-title">
                    <a href='http://localhost:3000/admin/room'>Room /</a>
                    <h3>Chi tiết phòng trọ</h3>
                </div>

                <form className="room-form">
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="tieuDe">Tên phòng</label>
                            <input name="tieuDe" className="form-input" value={formData.tieuDe} disabled />
                        </div>

                        <div className="form-field">
                            <label htmlFor="loaiPhong">Loại phòng</label>
                            <input name="loaiPhong" className="form-input" value={formData.loaiPhong} disabled />
                        </div>

                        <div className="form-field">
                            <label htmlFor="dienTich">Diện tích</label>
                            <input name="dienTich" className="form-input" value={formData.dienTich} disabled />
                        </div>

                        <div className="form-field">
                            <label htmlFor="gia">Giá</label>
                            <input name="gia" className="form-input" value={formData.gia} disabled />
                        </div>

                        <div className="form-field">
                            <label htmlFor="trangThai">Trạng thái</label>
                            <input name="trangThai" className="form-input" value={formData.trangThai} disabled />
                        </div>

                        <div className="form-field">
                            <label htmlFor="diaDiem">Địa điểm</label>
                            <select name="diaDiem" className="form-input" value={formData.diaDiem} disabled>
                                <option value="">-- Chọn địa điểm --</option>
                                {diaDiems.map((d) => (
                                    <option key={d._id} value={d._id}>{d.tinhThanh}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="diaChiCuThe">Địa chỉ cụ thể</label>
                            <input name="diaChiCuThe" className="form-input" value={formData.diaChiCuThe} disabled />
                        </div>

                        <div className="form-field description-field">
                            <label htmlFor="moTa">Mô tả</label>
                            <textarea name="moTa" rows="5" className="form-input description-textarea" value={formData.moTa} disabled />
                        </div>

                        <div className="form-field image-field">
                            <label>Ảnh phòng</label>
                            <div className="image-previews-wrapper">
                                {selectedImages.map((img, i) => (
                                    <div key={i} className="image-preview-item">
                                        <img src={img.startsWith('/assets') ? img : `/assets/images/${img}`} className="preview-image" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewRoom;
