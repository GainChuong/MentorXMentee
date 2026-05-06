import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer" id="site-footer">
        <div className="footer-content">
          {/* Column 1: Contact */}
          <div className="footer-col">
            <h3>THÔNG TIN LIÊN HỆ</h3>
            <div className="footer-contact-item">
              <span>Số 669 Đỗ Mười, Khu phố 13, Phường Linh Xuân, TP. HCM</span>
            </div>
            <div className="footer-contact-item">
              <span>Điện thoại: 028 3724 4555</span>
            </div>
            <div className="footer-contact-item">
              <span>Email: khoahttt@uel.edu.vn</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>LIÊN KẾT NHANH</h3>
            <ul className="footer-links">
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/programs">Chương trình đào tạo</Link></li>
              <li><Link to="/research">Định hướng nghiên cứu</Link></li>
              <li><Link to="/news">Tin tức</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-col">
            <h3>ĐĂNG KÝ NHẬN BẢN TIN</h3>
            <p className="footer-newsletter">
              Đăng ký ngay để cập nhật tin tức, sự kiện và thông tin tuyển sinh mới nhất.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Địa chỉ email"
                aria-label="Email newsletter"
              />
              <div className="footer-newsletter-submit">
                <button type="submit">GỬI &rarr;</button>
              </div>
            </form>
          </div>
        </div>

        {/* Inner bottom section (inside blue background) */}
        <div className="footer-inner-bottom">
          <div className="footer-inner-bottom-left">
            <img src="/uellogofinal0311146-9sok-200h.png" alt="UEL Logo" className="uel-seal" />
          </div>

          <div className="footer-social">
            <span className="footer-social-label">Theo dõi ngay</span>
            <img src="/Untitled-1-05 1.png" alt="Social Media" style={{ height: '32px', cursor: 'pointer' }} />
          </div>
        </div>
      </footer>

      {/* Bottommost white bar */}
      <div className="footer-bottom-wrapper">
        <div className="footer-bottom-copyright">
          <span>Bản quyền © 2026 - Khoa Hệ Thống thông tin, Trường Đại học Kinh tế Luật, ĐHQG - HCM</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
