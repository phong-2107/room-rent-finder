import React, { useEffect, useState } from "react";

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.hoTen || "",
        email: user.email || "",
        phone: user.soDienThoai || "",
        address: user.diaChi || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
            <div className="profile-form__avatar-image">
              {user?.anhDaiDien && <img src={user.anhDaiDien} alt="avatar" />}
            </div>
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
          <a href="/changepassword" className="profile-form__button profile-form__button--secondary">
            Đổi mật khẩu
          </a>
          <button className="profile-form__button profile-form__button--primary">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
