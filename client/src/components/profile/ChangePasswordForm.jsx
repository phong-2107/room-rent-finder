import React, { useState } from "react";
import { toast } from "react-toastify"; // Chỉ import toast, không import ToastContainer
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matKhauHienTai: "",
    matKhauMoi: "",
    xacNhanMatKhau: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    matKhauHienTai: false,
    matKhauMoi: false,
    xacNhanMatKhau: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.matKhauHienTai) {
      newErrors.matKhauHienTai = "Vui lòng nhập mật khẩu hiện tại";
    }
    
    if (!formData.matKhauMoi) {
      newErrors.matKhauMoi = "Vui lòng nhập mật khẩu mới";
    } else if (formData.matKhauMoi.length < 6) {
      newErrors.matKhauMoi = "Mật khẩu phải có ít nhất 6 ký tự";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.matKhauMoi)) {
      newErrors.matKhauMoi = "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
    }
    
    if (!formData.xacNhanMatKhau) {
      newErrors.xacNhanMatKhau = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.matKhauMoi !== formData.xacNhanMatKhau) {
      newErrors.xacNhanMatKhau = "Xác nhận mật khẩu không khớp";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đã nhập!");
      return;
    }
    
    setLoading(true);
    
    try {
      // Lấy token từ localStorage hoặc sessionStorage
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      if (!token) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        navigate("/login");
        return;
      }
      
      const response = await fetch("http://localhost:3001/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matKhauHienTai: formData.matKhauHienTai,
          matKhauMoi: formData.matKhauMoi,
          xacNhanMatKhau: formData.xacNhanMatKhau,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          // Xử lý lỗi validation từ server
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.param] = err.msg;
          });
          setErrors(serverErrors);
          toast.error("Vui lòng kiểm tra lại thông tin đã nhập!");
        } else {
          toast.error(data.message || "Đổi mật khẩu thất bại. Mật khẩu hiện tại không chính xác.");
        }
        return;
      }
      
      // Đổi mật khẩu thành công
      toast.success("Đổi mật khẩu thành công! Đang chuyển hướng về trang hồ sơ...");
      
      // Reset form
      setFormData({
        matKhauHienTai: "",
        matKhauMoi: "",
        xacNhanMatKhau: "",
      });
      
      // Chuyển về trang hồ sơ sau 2 giây
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
      
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      toast.error("Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <div className="profile-form__title">
          <div className="profile-form__title-text">Đổi mật khẩu</div>
        </div>

        <form className="profile-form__contain" onSubmit={handleSubmit}>
          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Mật khẩu hiện tại <span className="required-field">*</span></div>
              </div>
              <div className="password-input-container">
                <input
                  type={showPassword.matKhauHienTai ? "text" : "password"}
                  name="matKhauHienTai"
                  className={`profile-form__input ${errors.matKhauHienTai ? "is-invalid" : ""}`}
                  value={formData.matKhauHienTai}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button 
                  type="button"
                  onClick={() => toggleShowPassword("matKhauHienTai")}
                  className="toggle-password-button"
                >
                  {showPassword.matKhauHienTai ? "Ẩn" : "Hiện"}
                </button>
              </div>
              {errors.matKhauHienTai && (
                <div className="error-message">
                  {errors.matKhauHienTai}
                </div>
              )}
            </div>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Mật khẩu mới <span className="required-field">*</span></div>
              </div>
              <div className="password-input-container">
                <input
                  type={showPassword.matKhauMoi ? "text" : "password"}
                  name="matKhauMoi"
                  className={`profile-form__input ${errors.matKhauMoi ? "is-invalid" : ""}`}
                  value={formData.matKhauMoi}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu mới"
                />
                <button 
                  type="button"
                  onClick={() => toggleShowPassword("matKhauMoi")}
                  className="toggle-password-button"
                >
                  {showPassword.matKhauMoi ? "Ẩn" : "Hiện"}
                </button>
              </div>
              {errors.matKhauMoi && (
                <div className="error-message">
                  {errors.matKhauMoi}
                </div>
              )}
              <div className="password-hint">
                Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số
              </div>
            </div>
          </div>

          <div className="profile-form__field">
            <div className="profile-form__field-group">
              <div className="profile-form__label">
                <div className="profile-form__label-text">Xác nhận mật khẩu <span className="required-field">*</span></div>
              </div>
              <div className="password-input-container">
                <input
                  type={showPassword.xacNhanMatKhau ? "text" : "password"}
                  name="xacNhanMatKhau"
                  className={`profile-form__input ${errors.xacNhanMatKhau ? "is-invalid" : ""}`}
                  value={formData.xacNhanMatKhau}
                  onChange={handleInputChange}
                  placeholder="Xác nhận mật khẩu mới"
                />
                <button 
                  type="button"
                  onClick={() => toggleShowPassword("xacNhanMatKhau")}
                  className="toggle-password-button"
                >
                  {showPassword.xacNhanMatKhau ? "Ẩn" : "Hiện"}
                </button>
              </div>
              {errors.xacNhanMatKhau && (
                <div className="error-message">
                  {errors.xacNhanMatKhau}
                </div>
              )}
            </div>
          </div>

          <div className="profile-form__button-wrapper">
            <button
              type="button"
              className="profile-form__button profile-form__button--secondary"
              onClick={() => navigate("/profile")}
              disabled={loading}
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="profile-form__button profile-form__button--primary"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;