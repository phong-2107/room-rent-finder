import React, { useState } from "react";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      // TODO: Gọi API khôi phục mật khẩu ở đây
      console.log("Sending password reset to:", form.email);
      setError("");
      setMessage("Liên kết khôi phục mật khẩu đã được gửi đến email.");
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="sign-in">
        <div className="container">
          <div className="logo">
            <a href="/"><img src="/assets/images/logo1.png" alt="logo" /></a>
          </div>
          <h2 className="auth-title">Khôi phục mật khẩu</h2>
          <AuthForm
            type="forgotPassword"
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            buttonStyle={{ backgroundColor: "#3b82f6", color: "#fff" }}
          />
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
      <div className="footer-login">
        <p className="footer-copy">Được tạo bởi</p>
        <div className="footer-logo">
          <img src="/assets/images/logo1.png" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
