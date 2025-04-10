import React, { useState } from "react";
import axios from "axios";
import "../styles/contact/contact.scss";
import Map from "../components/Home/Map";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Họ tên phải có ít nhất 3 ký tự.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại chỉ được chứa chữ số.";
    } else if (formData.phone.length < 10 || formData.phone.length > 11) {
      newErrors.phone = "Số điện thoại phải có 10 hoặc 11 chữ số.";
    } else if (!/^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ.";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Nội dung phải có ít nhất 10 ký tự.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/contact", formData);
      setResponseMessage({ type: "success", text: response.data.message });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: error.response?.data?.message || "Không thể gửi thông tin liên hệ!",
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-form-section">
          <div className="contact-content">
            <div className="contact-form-card">
              <div className="form-header">
                <h2 className="form-title">Liên Hệ</h2>
                <p className="form-subtitle">
                  Mọi thắc mắc liên hệ với chúng tôi theo hướng dẫn bên dưới!
                </p>
              </div>

              {/* Global feedback message */}
              {responseMessage.text && (
                <div
                  className={`alert ${
                    responseMessage.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                >
                  {responseMessage.text}
                </div>
              )}

              <form className="form-container" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      placeholder="Họ & Tên"
                      className={`form-input ${errors.name ? "input-error" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      placeholder="Mail"
                      className={`form-input ${errors.email ? "input-error" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <div className="input-container">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Số Điện Thoại"
                      className={`form-input ${errors.phone ? "input-error" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <div className="textarea-container">
                    <textarea
                      name="message"
                      placeholder="Nội Dung"
                      className={`form-textarea ${errors.message ? "input-error" : ""}`}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>

                <button type="submit" className="submit-button">
                  GỬI NGAY
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <div className="info-header">
                <h2 className="info-title">THÔNG TIN LIÊN HỆ</h2>
              </div>

              <div className="info-content">
                <div className="info-item">
                  <img
                    className="info-icon"
                    alt="Email icon"
                    src="https://c.animaapp.com/9cQhdlZc/img/frame.svg"
                  />
                  <div className="info-text">info@gmail.com</div>
                </div>

                <div className="info-item">
                  <img
                    className="info-icon"
                    alt="Phone icon"
                    src="https://c.animaapp.com/9cQhdlZc/img/vector.svg"
                  />
                  <div className="info-text">+84345651206</div>
                </div>

                <div className="info-item">
                  <img
                    className="info-icon"
                    alt="Location icon"
                    src="https://c.animaapp.com/9cQhdlZc/img/vector-2.svg"
                  />
                  <div className="info-text">Thủ Đức, Tp. Hồ Chí Minh</div>
                </div>

                <div className="info-item">
                  <img
                    className="info-icon"
                    alt="Website icon"
                    src="https://c.animaapp.com/9cQhdlZc/img/vector-2.svg"
                  />
                  <div className="info-text">www.timtro24h.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;