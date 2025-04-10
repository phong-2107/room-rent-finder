import React, { useState, useEffect } from 'react';
import '../../styles/admin/createRoom.scss';
import { fetchDiaDiem } from '../../features/roomApi';
import { getToken } from '../../utils/storage';
import axios from 'axios';

const CreateRoom = () => {
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
    loadDiaDiem();
  }, []);

  const handleImageSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map(file => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...files]); // Lưu file gốc để gửi
    }
  };

  const handleRemoveImage = (index) => {
    const updated = [...selectedImages];
    updated.splice(index, 1);
    setSelectedImages(updated);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("tieuDe", formData.tieuDe);
      submitData.append("diaChiCuThe", "Địa chỉ đang ẩn định"); // bạn có thể thêm field
      submitData.append("diaDiem", formData.diaDiem);
      submitData.append("gia", formData.gia);
      submitData.append("dienTich", formData.dienTich);
      submitData.append("moTa", formData.moTa);
      submitData.append("trangThai", formData.trangThai || "Còn trống");
      selectedImages.forEach((file) => {
        submitData.append("hinhAnh", file);
      });

      const token = getToken();
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc token hết hạn!");
        return;
      }
      console.log("Token gửi đi:", token);
      if (!token) {
        alert("Bạn chưa đăng nhập hoặc token hết hạn!");
        return;
      }
      console.log("Gửi dữ liệu:", submitData); // Kiểm tra dữ liệu trước khi gửi
      const res = await axios.post("http://localhost:3001/api/admin/rooms/post", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Đăng tin thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi đăng tin:", err);
      alert("❌ Đăng tin thất bại!");
    }
  };

  return (
    <div className="create-room-page">
      <div className="form-container">
        <div className="page-title">
          <h2>Thêm tin phòng</h2>
        </div>

        <form className="room-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="tieuDe">Tên phòng</label>
              <input name="tieuDe" className="form-input" value={formData.tieuDe} onChange={handleInputChange} />
            </div>

            <div className="form-field">
              <label htmlFor="loaiPhong">Loại phòng</label>
              <input name="loaiPhong" className="form-input" value={formData.loaiPhong} onChange={handleInputChange} />
            </div>

            <div className="form-field">
              <label htmlFor="dienTich">Diện tích</label>
              <input name="dienTich" className="form-input" value={formData.dienTich} onChange={handleInputChange} />
            </div>

            <div className="form-field">
              <label htmlFor="gia">Giá</label>
              <input name="gia" className="form-input" value={formData.gia} onChange={handleInputChange} />
            </div>

            <div className="form-field">
              <label htmlFor="trangThai">Trạng thái</label>
              <input name="trangThai" className="form-input" value={formData.trangThai} onChange={handleInputChange} />
            </div>

            <div className="form-field">
              <label htmlFor="diaDiem">Địa điểm</label>
              <select
                name="diaDiem"
                className="form-input"
                value={formData.diaDiem}
                onChange={handleInputChange}
              >
                <option value="">-- Chọn địa điểm --</option>
                {diaDiems.map((d) => (
                  <option key={d._id} value={d._id}>{d.tinhThanh}</option>
                ))}
              </select>
            </div>

            <div className="form-field description-field">
              <label htmlFor="moTa">Mô tả</label>
              <textarea
                name="moTa"
                rows="5"
                className="form-input description-textarea"
                value={formData.moTa}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field image-field">
              <label>Ảnh phòng</label>
              <div className="image-upload-container">
                <label htmlFor="roomImages" className="image-upload-btn">
                  <span className="upload-icon">+</span>
                  <span>Chọn ảnh phòng</span>
                </label>
                <input
                  type="file"
                  id="roomImages"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="image-previews-wrapper">
                {selectedImages.map((img, i) => (
                  <div key={i} className="image-preview-item">
                    <img src={URL.createObjectURL(img)} className="preview-image" />
                    <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(i)}>×</button>
                  </div>
                ))}
              </div>
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

export default CreateRoom;
