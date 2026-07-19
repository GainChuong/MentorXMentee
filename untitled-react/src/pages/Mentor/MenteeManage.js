import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './MenteeManage.css';
import calendarIcon from '../../assets/calendar-icon.png';
import menteeBao from '../../assets/mentee-bao.png';
import menteeNhi from '../../assets/mentee-nhi.jpg';
import menteeGiang from '../../assets/mentee-giang.jpg';

const MenteeManage = () => {
  const { currentUser, managedMentees } = useUser();
  const history = useHistory();

  if (!currentUser || currentUser.role !== 'alumni_mentor') {
    return <Redirect to="/" />;
  }

  return (
    <div className="manage-page">
      <div className="manage-header">
        <div>
          <h1 className="page-title">QUẢN LÝ MENTEE</h1>
          <p className="manage-subtitle">Bạn đang hướng dẫn {managedMentees.length} sinh viên trong Season này</p>
        </div>
        <div className="manage-actions">
          <button className="btn-calendar" onClick={() => history.push('/mentees/calendar')}>
            <img src={calendarIcon} alt="Lịch" className="calendar-icon-img" /> Xem lịch
          </button>
          <button className="btn-filter">
            <span className="filter-icon">▼</span>
          </button>
        </div>
      </div>

      <div className="manage-grid">
        {managedMentees.map(mentee => (
          <div key={mentee.id} className="manage-card">
            <div className="manage-card-top">
              <div className="manage-card-icon">
                {mentee.avatar ? (
                  <img src={mentee.avatar} alt={mentee.name} className="manage-avatar-img" />
                ) : (
                  <svg viewBox="0 0 100 80" fill="none" stroke="#bdc3c7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="10" width="90" height="60" rx="8" />
                    <circle cx="30" cy="40" r="12" />
                    <path d="M15 65 c0-10 10-15 15-15 s15 5 15 15" />
                    <line x1="55" y1="30" x2="85" y2="30" />
                    <line x1="55" y1="45" x2="85" y2="45" />
                    <line x1="55" y1="60" x2="70" y2="60" />
                    <rect x="40" y="2" width="20" height="12" rx="4" />
                  </svg>
                )}
              </div>
              <div className="manage-info">
                <div className="manage-name-row">
                  <h3 className="manage-name">{mentee.name}</h3>
                  <span className="manage-code">{mentee.code}</span>
                </div>
                <p className="manage-track">{mentee.track}</p>
              </div>
            </div>
            
            <div className="manage-progress">
              <div className="progress-labels">
                <span>Buổi gặp mặt: {mentee.sessions}/{mentee.maxSessions}</span>
                <span>{Math.round((mentee.sessions / mentee.maxSessions) * 100)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${(mentee.sessions / mentee.maxSessions) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="manage-card-footer">
              <button className="btn-view-details" onClick={() => history.push(`/mentees/profile/${mentee.id}?mode=manage`)}>Xem chi tiết &gt;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteeManage;
