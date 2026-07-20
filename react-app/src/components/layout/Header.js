import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import MentorSubNav from './MentorSubNav';
import './Header.css';
import iconBell from '../../assets/icon-bell.png';

const NAV_LINKS = [
  { path: '/', label: 'Trang Chủ' },
  { path: '/about', label: 'Giới Thiệu' },
  { 
    path: '/news', 
    label: 'Tin tức & Sự Kiện',
    children: [
      { path: '/news?tab=news', label: 'Tin tức' },
      { path: '/news?tab=events', label: 'Sự kiện' },
    ]
  },
  { path: '/forum', label: 'Diễn đàn' },
  { path: '/donate', label: 'Quyên góp' },
  { path: '/jobs', label: 'Cơ hội việc làm' },
];

const Header = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, loginAsMentor, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(null);
  
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Simulation function for demo purposes
  const handleSimulateLogin = () => {
    loginAsMentor();
    setDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target)) {
        setNavDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);



  return (
    <>
      <header className="header" id="site-header">
        {/* Top Bar */}
        <div className="header-top">
          <div className="header-inner">
            <div className="header-top-spacer"></div>
            <div className="header-actions">
              <button className="header-lang-toggle" aria-label="Change language">
                <span className="lang-active">EN</span> | <span>VI</span>
              </button>

              <div className="header-user-wrapper" ref={dropdownRef} style={{ position: 'relative' }}>
                <div className="header-user-group">
                  <button 
                    className="header-bell-btn" 
                  aria-label="Notifications"
                >
                  <img src={iconBell} alt="Notifications" className="header-bell-icon" />
                </button>

                <button
                  className={`header-avatar-btn ${currentUser.role === 'guest' ? 'guest' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  <img src={currentUser.avatar} alt="User avatar" />
                </button>
                </div>

                <div className={`header-dropdown ${dropdownOpen ? 'open' : ''} ${currentUser.role}`}>
                  {currentUser.role === 'guest' ? (
                    <div className="guest-view">
                      <div className="header-dropdown-header">
                        <div className="header-dropdown-name">GUEST</div>
                        <span className="header-dropdown-role">Vui lòng đăng nhập để tiếp tục</span>
                      </div>
                      <div className="dropdown-content-inner">
                        <button className="dropdown-item btn-login-dropdown" onClick={handleSimulateLogin}>
                          Đăng nhập ngay
                        </button>
                        <div className="divider" />
                        <Link to="/register" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                          Đăng ký thành viên
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="user-view">
                      <div className="header-dropdown-header">
                        <div className="header-dropdown-name">{currentUser.name}</div>
                        <div className="header-dropdown-roles">
                          <span className="role-text-simple">MENTOR</span>
                        </div>
                      </div>
                      <div className="dropdown-content-inner">
                        <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                          Hồ sơ cá nhân
                        </Link>
                        <button className="logout dropdown-item text-orange" onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="header-hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main">
          <div className="header-inner">
            <div className="header-logo-section">
              <Link to="/" className="header-logo">
                <img src="./uel11143-imot-200h.png" alt="UEL Logo" />
              </Link>
              <div className="header-logo-text">
                <span className="dept-name">KHOA HỆ THỐNG THÔNG TIN</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="header-nav" id="main-nav" ref={navRef}>
              {NAV_LINKS.map((link) => (
                <div key={link.path} className="nav-item-container">
                  {link.children ? (
                    <>
                      <button 
                        className={`nav-dropdown-trigger ${location.pathname === link.path ? 'active' : ''} ${navDropdownOpen === link.label ? 'open' : ''}`}
                        onClick={() => setNavDropdownOpen(navDropdownOpen === link.label ? null : link.label)}
                      >
                        {link.label}
                      </button>
                      <div className={`nav-submenu ${navDropdownOpen === link.label ? 'open' : ''}`}>
                        {link.children.map(child => (
                          <Link 
                            key={child.path} 
                            to={child.path}
                            onClick={() => setNavDropdownOpen(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={location.pathname === link.path ? 'active' : ''}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
        
        {currentUser.role === 'alumni_mentor' && <MentorSubNav />}
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
           onClick={() => setMobileMenuOpen(false)}>
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
