import React, { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    displayName: "Khanh Hồ",
    email: "Khanh Hồ",
    phone: "Khanh Hồ",
    address: "Quận 9 TPHCM"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <div className="profile-form__title">
          <div className="profile-form__title-text">Thông tin cá nhân</div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Tên hiển thị</div>
            </div>
            <input
              type="text"
              name="displayName"
              className="profile-form__input"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form__avatar-section">
          <div className="profile-form__avatar-group">
            <div className="profile-form__avatar-label">
              <div className="profile-form__label-text">Ảnh đại diện</div>
            </div>
            <div className="profile-form__avatar-image" />
          </div>
        </div>

        <button className="profile-form__button profile-form__button--secondary">Thay đổi ảnh</button>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Email</div>
            </div>
            <input
              type="email"
              name="email"
              className="profile-form__input"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Số diện thoại</div>
            </div>
            <input
              type="tel"
              name="phone"
              className="profile-form__input"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Địa chỉ</div>
            </div>
            <input
              type="text"
              name="address"
              className="profile-form__input"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="profile-form__button-wrapper">
            <a href="/changepassword" className="profile-form__button profile-form__button--secondary">Đổi mật khẩu</a>
            <button className="profile-form__button profile-form__button--primary">Lưu thay đổi</button>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileForm;