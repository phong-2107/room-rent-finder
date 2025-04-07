import React from "react";
import "../styles/contact/contact.scss";
import Map from "../components/Home/Map";

const ContactPage = () => {
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

              <div className="form-group">
                <div className="input-container">
                  <input type="text" placeholder="Họ & Tên" className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input type="email" placeholder="Mail" className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <div className="input-container">
                  <input type="tel" placeholder="Số Điện Thoại" className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <div className="textarea-container">
                  <textarea placeholder="Nội Dung" className="form-textarea"></textarea>
                </div>
              </div>

              <button className="submit-button">GỬI NGAY</button>
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