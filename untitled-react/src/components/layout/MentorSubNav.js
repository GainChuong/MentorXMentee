import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MentorSubNav.css';

const MENTOR_NAV_ITEMS = [
  { path: '/', label: 'Tìm kiếm Mentee', icon: '🔍' },
  { path: '/mentor/connections', label: 'Mentee của tôi', icon: '👥' },
  { path: '/mentor/schedule', label: 'Lịch hẹn', icon: '📅' },
  { path: '/mentor/reviews', label: 'Đánh giá', icon: '⭐' },
];

const MentorSubNav = () => {
  const location = useLocation();

  return (
    <div className="mentor-subnav">
      <div className="header-inner">
        <nav className="mentor-subnav-list">
          {MENTOR_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mentor-subnav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="mentor-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MentorSubNav;
