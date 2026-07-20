import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MenteeProfileSelf.css';

import iconEmail from '../../assets/icon-email.png';
import iconPhone from '../../assets/icon-phone.png';
import iconLinkedin from '../../assets/icon-linkedin.png';
import iconStarBadge from '../../assets/icon-star-badge.png';
import iconClock from '../../assets/icon-clock.png';
import iconCalendarBlack from '../../assets/icon-calendar-black.png';
import iconPeople from '../../assets/icon-people.png';
import iconRocket from '../../assets/icon-rocket.png';
import iconTargetStat from '../../assets/icon-target.png';
import iconQuote from '../../assets/icon-quote.png';
import iconVng from '../../assets/icon-vng.png';
import iconShopee from '../../assets/icon-shopee.png';
import iconTiki from '../../assets/icon-tiki.png';
import iconVerified from '../../assets/icon-verified.png';
import iconEdit from '../../assets/icon-edit.png';

// New icons for profile
import iconEduNew from '../../assets/icon-edu-new.png';
import iconJoinNew from '../../assets/icon-join-new.png';
import iconExpNew from '../../assets/icon-exp-new.png';

const MenteeProfileSelf = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('Tổng quan');

  const mentor = {
    name: 'BẰNG NHÂN TRÍ',
    role: 'Data Analyst',
    company: 'VNG Corporation',
    location: 'TP Hồ Chí Minh, Việt Nam',
    avatar: 'https://ui-avatars.com/api/?name=Bang+Nhan+Tri&background=b8d4f0&color=154a7c&size=200',
    email: 'nhantri.ecstasy@gmail.com',
    phone: '092742837',
    education: 'Thương mại điện tử - Cử nhân tài năng',
    experienceYears: '+4 năm',
    linkedin: 'linkedin.com/yr.ecstasy',
    joinDate: '05/2025',
    skills: ['SQL', 'Power BI', 'Data Analysis', 'Python', 'Statistics', 'Dashboard'],
    industries: ['E-Commerce', 'Data Analyst', 'Game', 'Business Analyst', 'Retail'],
    rating: '4.8/5',
    reviewsCount: 32,
    hours: '1,350+',
    sessions: 34,
    mentees: 28,
    aboutText: 'Mình đam mê khám phá dữ liệu và biến dữ liệu thành những insight có giá trị giúp doanh nghiệp ra quyết định tốt hơn. Mình thích chia sẻ kiến thức và đồng hành cùng các bạn trẻ trên con đường phát triển sự nghiệp trong lĩnh vực Data.'
  };

  const TABS = ['Tổng quan', 'Kinh nghiệm', `Đánh giá(${mentor.reviewsCount})`, 'Lịch học'];


  return (
    <div className="mps-page">
      {/* ───── HERO HEADER ───── */}
      <div className="mps-hero">
        <div className="mps-hero-bg" />
        <div className="mps-hero-body">
          <div className="mps-avatar-wrap">
            <img src={mentor.avatar} alt="Avatar" className="mps-avatar" />
            <div className="mps-online-dot" />
          </div>

          <div className="mps-hero-info">
            <h1 className="mps-name">
              {mentor.name}
              <img src={iconVerified} alt="verified" className="mps-verified" />
            </h1>
            <p className="mps-role">
              {mentor.role} tại <span className="mps-company">{mentor.company}</span>
            </p>
            <p className="mps-location">📍 {mentor.location}</p>

            <div className="mps-badges">
              <span className="mps-badge green">Đang nhận Mentee</span>
              <span className="mps-badge blue">Còn 2 slot trong tháng này</span>
            </div>

            <div className="mps-stats-row">
              <div className="mps-stat">
                <img src={iconStarBadge} alt="rating" className="mps-stat-icon" />
                <div>
                  <strong>{mentor.rating}</strong>
                  <span>({mentor.reviewsCount} đánh giá)</span>
                </div>
              </div>
              <div className="mps-stat">
                <img src={iconClock} alt="hours" className="mps-stat-icon" />
                <div>
                  <strong>{mentor.hours}</strong>
                  <span>giờ mentoring</span>
                </div>
              </div>
              <div className="mps-stat">
                <img src={iconCalendarBlack} alt="sessions" className="mps-stat-icon" />
                <div>
                  <strong>{mentor.sessions}</strong>
                  <span>buổi hoàn thành</span>
                </div>
              </div>
              <div className="mps-stat">
                <img src={iconPeople} alt="mentees" className="mps-stat-icon" />
                <div>
                  <strong>{mentor.mentees}</strong>
                  <span>mentee đã hỗ trợ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons - top right */}
        <div className="mps-hero-actions">
          <button className="mps-btn-edit">
            <img src={iconEdit} alt="edit" className="mps-btn-icon" />
            CHỈNH SỬA
          </button>
          <button className="mps-btn-adjust" onClick={() => history.push('/mentees/manage-slots')}>
            ĐIỀU CHỈNH SỐ MENTEE
          </button>
        </div>
      </div>

      {/* ───── 3-COLUMN GRID ───── */}
      <div className="mps-grid">
        {/* LEFT COL */}
        <div className="mps-col-left">
          <div className="mps-card">
            <h3 className="mps-card-title">Thông tin cá nhân</h3>
            <ul className="mps-info-list">
              <li className="mps-info-item">
                <img src={iconEmail} alt="email" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Email</span>
                  <span className="mps-info-val">{mentor.email}</span>
                </div>
              </li>
              <li className="mps-info-item">
                <img src={iconPhone} alt="phone" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Số điện thoại</span>
                  <span className="mps-info-val">{mentor.phone}</span>
                </div>
              </li>
              <li className="mps-info-item">
                <img src={iconEduNew} alt="education" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Học vấn</span>
                  <span className="mps-info-val">{mentor.education}</span>
                </div>
              </li>
              <li className="mps-info-item">
                <img src={iconExpNew} alt="experience" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Kinh nghiệm</span>
                  <span className="mps-info-val">{mentor.experienceYears}</span>
                </div>
              </li>
              <li className="mps-info-item">
                <img src={iconLinkedin} alt="linkedin" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Linkedin</span>
                  <span className="mps-info-val mps-link">{mentor.linkedin}</span>
                </div>
              </li>
              <li className="mps-info-item">
                <img src={iconJoinNew} alt="joined" className="mps-info-icon" />
                <div className="mps-info-col">
                  <span className="mps-info-label">Tham gia</span>
                  <span className="mps-info-val">{mentor.joinDate}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mps-card">
            <h3 className="mps-card-title">Kỹ năng chuyên môn</h3>
            <div className="mps-tags">
              {mentor.skills.map(s => <span key={s} className="mps-tag">{s}</span>)}
            </div>
          </div>

          <div className="mps-card">
            <h3 className="mps-card-title">Ngành nghề</h3>
            <div className="mps-tags">
              {mentor.industries.map(s => <span key={s} className="mps-tag">{s}</span>)}
            </div>
          </div>
        </div>

        {/* MID COL */}
        <div className="mps-col-mid">
          <div className="mps-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`mps-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mps-card">
            <h3 className="mps-section-title">Về bản thân</h3>
            <p className="mps-about-text">{mentor.aboutText}</p>

            <h3 className="mps-section-title" style={{ marginTop: 24 }}>Kinh nghiệm làm việc</h3>
            <div className="mps-exp-list">
              <div className="mps-exp-item">
                <img src={iconVng} alt="VNG" className="mps-exp-logo" />
                <div className="mps-exp-info">
                  <h4>Data Analyst</h4>
                  <p className="mps-exp-org">VNG Corporation</p>
                </div>
                <span className="mps-exp-date">03/2023 - Hiện tại</span>
              </div>
              <div className="mps-exp-item">
                <img src={iconShopee} alt="Shopee" className="mps-exp-logo" />
                <div className="mps-exp-info">
                  <h4>Business Analyst</h4>
                  <p className="mps-exp-org">Shopee Việt Nam</p>
                </div>
                <span className="mps-exp-date">07/2021 - 02/2023</span>
              </div>
              <div className="mps-exp-item">
                <img src={iconTiki} alt="Tiki" className="mps-exp-logo" />
                <div className="mps-exp-info">
                  <h4>Data Intern</h4>
                  <p className="mps-exp-org">Tiki</p>
                </div>
                <span className="mps-exp-date">02/2020 - 06/2021</span>
              </div>
            </div>
            <button className="mps-view-more">Xem tất cả kinh nghiệm →</button>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className="mps-col-right">
          <div className="mps-card">
            <div className="mps-card-hdr">
              <h3 className="mps-card-title">Thống kê Mentoring</h3>
              <span className="mps-link-sm">Xem thêm</span>
            </div>
            <div className="mps-stat-boxes">
              <div className="mps-stat-box">
                <img src={iconRocket} alt="rocket" className="mps-stat-box-icon" />
                <div>
                  <strong>{mentor.hours}</strong>
                  <span>giờ mentoring</span>
                </div>
              </div>
              <div className="mps-stat-box">
                <img src={iconTargetStat} alt="target" className="mps-stat-box-icon" />
                <div>
                  <strong>{mentor.sessions}</strong>
                  <span>buổi hoàn thành</span>
                </div>
              </div>
              <div className="mps-stat-box">
                <img src={iconStarBadge} alt="star" className="mps-stat-box-icon" />
                <div>
                  <strong>{mentor.rating}</strong>
                  <span>đánh giá</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mps-card">
            <div className="mps-card-hdr">
              <h3 className="mps-card-title">
                <img src={iconQuote} alt="quote" className="mps-quote-icon" />
                Phản hồi từ Mentee
              </h3>
            </div>
            <div className="mps-stars">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MenteeProfileSelf;
