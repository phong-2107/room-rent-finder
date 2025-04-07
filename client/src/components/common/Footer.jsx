import React from "react";
import "../../styles/common/Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="frame-4">
        <p className="t-m-ki-m-m-t-c-n-tr">
          <span className="span"> Tìm Kiếm Một Căn </span>

          <span className="text-wrapper-9">Trọ</span>

          <span className="span">&nbsp;</span>

          <span className="text-wrapper-9">Tốt</span>

          <span className="span"> Cho Bạn?</span>
        </p>

        <div className="frame-5">
          <div className="div-wrapper">
            <div className="text-wrapper-10">Home</div>
          </div>

          <div className="div-wrapper">
            <div className="text-wrapper-10">About</div>
          </div>

          <div className="div-wrapper">
            <div className="text-wrapper-10">Menu</div>
          </div>
        </div>

        <div className="frame-6">
          <div className="group-6">
            <a href="/list" className="text-wrapper-11">Phòng Trọ</a>
          </div>

          <div className="group-6">
            <a href="/list" className="text-wrapper-11">Nhà ở</a>
          </div>

          <div className="group-6">
            <a href="/list" className="text-wrapper-11">Chung Cư</a>
          </div>
        </div>

        <div className="frame-7">
          <div className="group-8">
            <img
              className="frame-8"
              alt="Frame"
              src="https://c.animaapp.com/m8twrcooYWMm14/img/frame-7.svg"
            />

            <div className="info-gmail-com"> info@gmail.com</div>
          </div>

          <div className="group-9">
            <img
              className="vector"
              alt="Vector"
              src="https://c.animaapp.com/m8twrcooYWMm14/img/vector-1.svg"
            />

            <div className="text-wrapper-12">+84345651206</div>
          </div>

          <div className="group-9">
            <p className="th-c-tp-h-ch-minh">Thủ Đức, Tp. Hồ Chí Mình</p>

            <img
              className="vector"
              alt="Vector"
              src="https://c.animaapp.com/m8twrcooYWMm14/img/vector.svg"
            />
          </div>
        </div>

        <a className="frame-9">
          <img
            className="icon-linkedin"
            alt="Icon linkedin"
            src="https://c.animaapp.com/m8twrcooYWMm14/img/icon-linkedin.svg"
          />

          <a className="icon-facebook" />

          <a className="icon-instagram" />
        </a>

      </div>

      <div className="frame-9-footer">
        <div className="frame-11">
          <div className="frame-12">
            <div className="text-wrapper-13">Copyright © 2025 trotot.vn</div>
          </div>

          <div className="frame-13">
            <p className="text-wrapper-13">
              Website đang trong gian đoạn thử nghiệm
            </p>
          </div>
        </div>

        <div className="frame-14-footer">
          <div className="text-wrapper-14">Privacy policy</div>

          <div className="text-wrapper-14">Privacy policy</div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;