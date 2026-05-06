import React from 'react';
import { Link } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <div className="coming-soon-image-wrapper">
          <img src="/UEL (5) 1.png" alt="UEL Alumni" className="coming-soon-logo" />
          <span className="coming-soon-badge">Sắp ra mắt</span>
        </div>
        <h2 className="coming-soon-title">{title}</h2>
        <p className="coming-soon-text">Trang đang được phát triển. Vui lòng quay lại sau!</p>
        <div className="coming-soon-actions">
          <Link to="/" className="coming-soon-btn primary">Về trang chủ</Link>
          <Link to="/news" className="coming-soon-btn outline">Xem tin tức</Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
