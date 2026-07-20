import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MentorSubNav.css';

const MENTOR_NAV_ITEMS = [
  { path: '/mentees/search', label: 'Tìm kiếm Mentee', icon: '🔍' },
  { path: '/mentees/applications', label: 'Đơn đăng ký', icon: '📋' },
  { path: '/mentees/manage', label: 'Quản lý Mentee', icon: '👥' },
];

const MentorSubNav = () => {
  const location = useLocation();

  return (
    <div className="mentor-subnav">
      <div className="mentor-subnav-inner">
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
