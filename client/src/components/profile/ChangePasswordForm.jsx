import React, { useState } from "react";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "*************",
    newPassword: "*************",
    acceptPassword: "*************",
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
          <div className="profile-form__title-text">Đổi mật khẩu</div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Mật khẩu cũ</div>
            </div>
            <input
              type="password"
              name="currentPassword"
              className="profile-form__input"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Mật khẩu mới</div>
            </div>
            <input
              type="password"
              name="newPassword"
              className="profile-form__input"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="profile-form__field">
          <div className="profile-form__field-group">
            <div className="profile-form__label">
              <div className="profile-form__label-text">Xác nhận mật khẩu</div>
            </div>
            <input
              type="password"
              name="acceptPassword"
              className="profile-form__input"
              value={formData.acceptPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        
        <button className="profile-form__button-cpw profile-form__button--accept">Xác nhận</button>
        
      </div>
    </div>
  );
};

export default ChangePasswordForm;