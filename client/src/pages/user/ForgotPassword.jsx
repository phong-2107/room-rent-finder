import React, { useState } from "react";
import "../../styles/user/SignIn.scss";
import AuthForm from "../../components/auth/AuthForm";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    if (!form.email) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Đã xảy ra lỗi.");
      }

      const data = await response.json();
      setMessage(data.message);
      setError("");
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi, vui lòng thử lại.");
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
          <div className="forgot-redirect">
            Quay trở lại <a href="/login">Đăng nhập</a>
        </div>
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