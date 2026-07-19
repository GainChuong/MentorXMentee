import React, { useState } from 'react';
import { useLocation, useParams, Redirect, useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './MenteeProfile.css';
import MenteeProfileSelf from './MenteeProfileSelf';

import iconChat from '../../assets/icon-chat.png';
import iconHeart from '../../assets/icon-heart.png';
import iconConnect from '../../assets/icon-connect.png';
import iconEmail from '../../assets/icon-email.png';
import iconPhone from '../../assets/icon-phone.png';
import iconMssv from '../../assets/icon-mssv.png';
import iconMajor from '../../assets/icon-major.png';
import iconSkills from '../../assets/icon-skills.png';
import iconTargetGoal from '../../assets/icon-target-goal.png';
import iconLevel from '../../assets/icon-level.png';
import iconLinkedin from '../../assets/icon-linkedin.png';

// Manage-mode stat icons
import iconProgress from '../../assets/icon-progress.png';
import iconCalendarOrange from '../../assets/icon-calendar-orange.png';
import iconMentorPerson from '../../assets/icon-mentor-person.png';
// Track & session icons
import iconTrack from '../../assets/icon-track.png';
import iconSession from '../../assets/icon-session.png';
// Activity & doc icons
import iconActivity from '../../assets/icon-activity.png';
import iconDoc from '../../assets/icon-doc.png';
import iconDownload from '../../assets/icon-download.png';
// Action button icons
import iconCalendarIcon from '../../assets/icon-calendar-icon.png';
import iconStarBadge from '../../assets/icon-star-badge.png';

// Mentee photos
import menteeBao from '../../assets/mentee-bao.png';
import menteeNhi from '../../assets/mentee-nhi.jpg';
import menteeGiang from '../../assets/mentee-giang.jpg';

// Generic avatars
import avatarMale1 from '../../assets/avatar-male-1.png';
import avatarFemale1 from '../../assets/avatar-female-1.png';
import avatarMale2 from '../../assets/avatar-male-2.png';
import avatarFemale2 from '../../assets/avatar-female-2.png';

const MenteeProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'search'; // 'manage' or 'search'
  const { id } = useParams();
  const { currentUser, managedMentees } = useUser();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState('Thông tin');
  const [isLiked, setIsLiked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'mentee', text: 'Chào anh, em rất mong được học hỏi từ anh!' }
  ]);

  // Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    sessionId: '',
    rating: 5,
    content: '',
    files: []
  });

  // Mock past sessions for reporting
  const pastSessions = [
    { id: 's1', title: 'Session #1 - Giới thiệu SQL', date: '2026-04-15', time: '18:00' },
    { id: 's2', title: 'Session #2 - Cơ bản về Database', date: '2026-04-22', time: '18:00' },
    { id: 's3', title: 'Session #3 - Advanced Joins', date: '2026-04-29', time: '18:00' },
    { id: 's4', title: 'Session #4 - Subqueries & CTEs', date: '2026-05-04', time: '18:00' }
  ];

  // If not mentor, redirect or show error
  if (!currentUser || currentUser.role !== 'alumni_mentor') {
    return <Redirect to="/" />;
  }

  if (mode === 'self') {
    return <MenteeProfileSelf />;
  }

  // Editable Roadmap State
  const [roadmapData, setRoadmapData] = useState({
    name: 'Data Analyst Track',
    duration: '6 tháng chương trình',
    progress: 45,
    totalSessions: 20,
    completedSessions: 9
  });

  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [isSessionDetailModalOpen, setIsSessionDetailModalOpen] = useState(false);

  // Mock Next Session Details
  const nextSession = {
    title: 'Session #5 - SQL Optimization',
    date: '4/5/2026 (Thứ 2)',
    time: '18:00 - 19:30',
    location: 'Google Meet',
    link: 'https://meet.google.com/abc-xyz-123',
    topic: 'Tối ưu hóa câu lệnh truy vấn, Indexing và Execution Plan.',
    prep: 'Hoàn thành bài tập SQL Lab 4, cài đặt PostgreSQL.'
  };

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const mockDocs = [
    { id: 'd1', title: 'Hướng dẫn sử dụng SQL nâng cao.pdf', size: '2.4MB', date: '04/05/2026', type: 'PDF' },
    { id: 'd2', title: 'Bài tập tuần 4 - Data Cleaning.docx', size: '1.2MB', date: '02/05/2026', type: 'DOCX' },
    { id: 'd3', title: 'Slide buổi học #4.pptx', size: '5.8MB', date: '04/05/2026', type: 'PPTX' }
  ];

  // Mock data mapping
  const menteesData = {
    '1': {
      name: 'Huỳnh Gia Bảo',
      role: mode === 'manage' ? 'Mentee' : 'Thương mại điện tử Hệ Cử nhân tài năng',
      track: 'Data Analyst Track',
      joinDate: '03/05/2026',
      duration: '6 tháng chương trình',
      avatar: menteeBao,
      email: 'baohgk24411e@st.uel.edu.vn',
      phone: '092742837',
      mssv: 'K244111454',
      major: 'Thương mại điện tử',
      skills: ['SQL', 'PowerBI', 'MachineLearning'],
      target: 'Trở thành Data Analyst chuyên nghiệp, làm việc với dữ liệu PowerBI và BI Dashboard.',
      level: 'Intermediate',
      linkedin: 'linkedin.com/in/baohgk'
    },
    '2': {
      name: 'Đặng Quỳnh Nhi',
      role: mode === 'manage' ? 'Mentee' : 'Thương mại điện tử Hệ Cử nhân tài năng',
      track: 'E-Commerce Strategy',
      joinDate: '10/05/2026',
      duration: '4 tháng chương trình',
      avatar: menteeNhi,
      email: 'nhidq.ecstasy@gmail.com',
      phone: '0988123456',
      mssv: 'K234110882',
      major: 'Thương mại điện tử',
      skills: ['E-Commerce', 'Digital Marketing', 'SEO'],
      target: 'Nắm vững quy trình vận hành sàn TMĐT và chiến lược Marketing kỹ thuật số.',
      level: 'Beginner',
      linkedin: 'linkedin.com/in/quynhnhi'
    },
    '3': {
      name: 'Nguyễn Ngọc Trường Giang',
      role: mode === 'manage' ? 'Mentee' : 'Hệ thống thông tin quản lý',
      track: 'Business Analyst Track',
      joinDate: '15/05/2026',
      duration: '5 tháng chương trình',
      avatar: menteeGiang,
      email: 'giangnnt@gmail.com',
      phone: '0977654321',
      mssv: 'K224110123',
      major: 'Hệ thống thông tin',
      skills: ['Business Analysis', 'UML', 'Agile'],
      target: 'Trở thành cầu nối giữa kỹ thuật và nghiệp vụ, thành thạo kỹ năng phân tích yêu cầu.',
      level: 'Advanced',
      linkedin: 'linkedin.com/in/giangnt'
    },
    '4': {
      name: 'Trần Hoàng Nam',
      role: mode === 'manage' ? 'Mentee' : 'Thương mại điện tử',
      track: 'Digital Marketing Track',
      joinDate: '18/05/2026',
      duration: '6 tháng chương trình',
      avatar: avatarMale1,
      email: 'namth@st.uel.edu.vn',
      phone: '0933111222',
      mssv: 'K244112001',
      major: 'Thương mại điện tử',
      skills: ['SEO', 'Content Marketing', 'Google Ads'],
      target: 'Nắm vững các công cụ quảng cáo số và tối ưu hóa chuyển đổi trên website TMĐT.',
      level: 'Intermediate',
      linkedin: 'linkedin.com/in/namth'
    },
    '5': {
      name: 'Lê Mỹ Linh',
      role: mode === 'manage' ? 'Mentee' : 'Quản trị kinh doanh',
      track: 'Business Strategy Track',
      joinDate: '20/05/2026',
      duration: '6 tháng chương trình',
      avatar: avatarFemale1,
      email: 'linhlm@st.uel.edu.vn',
      phone: '0944222333',
      mssv: 'K234113002',
      major: 'Quản trị kinh doanh',
      skills: ['Market Research', 'Project Management', 'Presentation'],
      target: 'Phát triển tư duy chiến lược và kỹ năng quản lý dự án thực tế.',
      level: 'Beginner',
      linkedin: 'linkedin.com/in/linhlm'
    },
    '6': {
      name: 'Phạm Gia Huy',
      role: mode === 'manage' ? 'Mentee' : 'Hệ thống thông tin quản lý',
      track: 'ERP Consultant Track',
      joinDate: '22/05/2026',
      duration: '6 tháng chương trình',
      avatar: avatarMale2,
      email: 'huypg@st.uel.edu.vn',
      phone: '0955333444',
      mssv: 'K224114003',
      major: 'Hệ thống thông tin',
      skills: ['ERP', 'Python', 'Database'],
      target: 'Trở thành chuyên viên tư vấn giải pháp ERP cho doanh nghiệp lớn.',
      level: 'Advanced',
      linkedin: 'linkedin.com/in/huypg'
    },
    '7': {
      name: 'Nguyễn Thảo Vy',
      role: mode === 'manage' ? 'Mentee' : 'Thương mại điện tử',
      track: 'Content Creation Track',
      joinDate: '25/05/2026',
      duration: '6 tháng chương trình',
      avatar: avatarFemale2,
      email: 'vynt@st.uel.edu.vn',
      phone: '0966444555',
      mssv: 'K254115004',
      major: 'Thương mại điện tử',
      skills: ['Social Media', 'Canva', 'Video Editing'],
      target: 'Học cách xây dựng thương hiệu cá nhân và sáng tạo nội dung đa nền tảng.',
      level: 'Beginner',
      linkedin: 'linkedin.com/in/vynt'
    },
    '8': {
      name: 'Đỗ Hoàng Long',
      role: mode === 'manage' ? 'Mentee' : 'Hệ thống thông tin quản lý',
      track: 'Data Engineering Track',
      joinDate: '28/05/2026',
      duration: '6 tháng chương trình',
      avatar: avatarMale1,
      email: 'longdh@st.uel.edu.vn',
      phone: '0977555666',
      mssv: 'K244116005',
      major: 'Hệ thống thông tin',
      skills: ['ETL', 'SQL Server', 'Python'],
      target: 'Xây dựng pipeline dữ liệu hiệu quả và bảo mật cho doanh nghiệp.',
      level: 'Intermediate',
      linkedin: 'linkedin.com/in/longdh'
    },
    '9': {
      name: 'Trịnh Kim Chi',
      role: mode === 'manage' ? 'Mentee' : 'Quản trị kinh doanh',
      track: 'Supply Chain Track',
      joinDate: '01/06/2026',
      duration: '6 tháng chương trình',
      avatar: avatarFemale1,
      email: 'chitk@st.uel.edu.vn',
      phone: '0988666777',
      mssv: 'K234117006',
      major: 'Quản trị kinh doanh',
      skills: ['Logistics', 'Excel', 'English'],
      target: 'Tìm hiểu sâu về chuỗi cung ứng toàn cầu và quản trị kho bãi.',
      level: 'Intermediate',
      linkedin: 'linkedin.com/in/chitk'
    },
    '10': {
      name: 'Bùi Anh Tú',
      role: mode === 'manage' ? 'Mentee' : 'Thương mại điện tử',
      track: 'Growth Hacking Track',
      joinDate: '03/06/2026',
      duration: '6 tháng chương trình',
      avatar: avatarMale2,
      email: 'tuba@st.uel.edu.vn',
      phone: '0999777888',
      mssv: 'K224118007',
      major: 'Thương mại điện tử',
      skills: ['A/B Testing', 'Growth Strategy', 'Analytics'],
      target: 'Áp dụng Growth Hacking để thúc đẩy doanh thu cho các startup TMĐT.',
      level: 'Advanced',
      linkedin: 'linkedin.com/in/tuba'
    }
  };

  const mentee = menteesData[id] || menteesData['1'];

  // Check if this mentee is already in managedMentees
  // We check by name since IDs might differ between search and manage list depending on how they were added
  const isConnected = managedMentees.some(m => m.name === mentee.name);

  const handleSaveReport = (e) => {
    e.preventDefault();
    // Logic to save report would go here
    console.log('Saving report:', reportForm);
    setIsReportModalOpen(false);
    alert('Báo cáo buổi học đã được gửi thành công!');
  };

  const handleSaveRoadmap = (e) => {
    e.preventDefault();
    setIsRoadmapModalOpen(false);
    alert('Lộ trình đã được cập nhật!');
  };

  return (
    <div className="mentee-profile-page">
      <div className="profile-header">
        {/* Banner graphic background would go here in CSS */}
        
        <div className="profile-header-actions">
          <button 
            className={`icon-btn-circle ${chatOpen ? 'active' : ''}`}
            onClick={() => setChatOpen(!chatOpen)}
          >
            <img src={iconChat} alt="Chat" className="btn-icon-img" />
          </button>
          <button 
            className={`icon-btn-circle ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <img src={iconHeart} alt="Heart" className="btn-icon-img" />
          </button>
          <button className="icon-btn-circle"><span className="icon">...</span></button>
        </div>

        <div className="profile-info-section">
          <div className="profile-avatar-container">
            <img src={mentee.avatar} alt="Avatar" className="profile-avatar" />
            <div className="status-indicator"></div>
          </div>
          
          <div className="profile-main-info">
            <h1 className="profile-name">{mentee.name}</h1>
            <p className="profile-role">{mentee.role}</p>
            {mode === 'manage' && (
              <p className="profile-meta">{mentee.track} | Tham gia: {mentee.joinDate} | {mentee.duration}</p>
            )}
          </div>

          <div className="profile-action-buttons">
            {mode === 'manage' ? (
              <>
                <button className="btn-primary-blue" onClick={() => history.push('/mentees/calendar')}>
                  <img src={iconCalendarIcon} alt="calendar" className="btn-icon-img-sm" /> Tạo lịch hẹn
                </button>
                <button className="btn-primary-orange" onClick={() => setIsReportModalOpen(true)}>
                  <img src={iconProgress} alt="report" className="btn-icon-img-sm" /> Báo cáo buổi học
                </button>
              </>
            ) : (
              <div className="search-actions-right">
                {isConnected ? (
                  <button className="btn-connected-gray" disabled>
                    <img src={iconConnect} alt="Connected" className="btn-icon-img grayscale" /> ĐÃ KẾT NỐI
                  </button>
                ) : (
                  <button className="btn-primary-orange">
                    <img src={iconConnect} alt="Connect" className="btn-icon-img" /> KẾT NỐI NGAY
                  </button>
                )}
                <div className="profile-skills-tags right-aligned">
                  <span className="skills-label">Kỹ năng nổi bật</span>
                  <div className="skills-list">
                    <span className="skill-tag">Data Analysis</span>
                    <span className="skill-tag">Google Ads Management</span>
                    <span className="skill-tag">Critical Thinking</span>
                    <span className="skill-tag">Business Intelligence</span>
                    <span className="skill-tag-more">+10 more</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mode === 'manage' && (
        <div className="profile-stats-row">
          <div className="stat-card">
            <div className="stat-icon-img-wrap book">
              <img src={iconProgress} alt="progress" className="stat-img" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Tiến độ học tập</p>
              <h3 className="stat-value">40%</h3>
              <div className="stat-bar"><div className="stat-fill" style={{width: '40%'}}></div></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-img-wrap calendar">
              <img src={iconCalendarOrange} alt="sessions" className="stat-img" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Số buổi đã tham gia</p>
              <h3 className="stat-value">9<span className="stat-total">/20 buổi</span></h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-img-wrap star">
              <img src={iconStarBadge} alt="rating" className="stat-img" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Đánh giá trung bình</p>
              <h3 className="stat-value">4.8<span className="stat-total">/5</span></h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-img-wrap people">
              <img src={iconMentorPerson} alt="mentor" className="stat-img" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Mentor hiện tại</p>
              <h3 className="stat-value text-lg">Anh Bằng Nhân Trí</h3>
            </div>
          </div>
        </div>
      )}

      <div className="profile-tabs">
        {['Thông tin', 'Hoạt động', 'Đánh giá'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="profile-content">
        <div className="content-left">
          <div className="info-card">
            <h3 className="card-title">Thông tin cá nhân</h3>
            <div className="info-list">
              <div className="info-item">
                <img src={iconEmail} alt="Email" className="info-icon-img" />
                <span className="info-label">Email</span>
                <span className="info-value">{mentee.email}</span>
              </div>
              <div className="info-item">
                <img src={iconPhone} alt="Phone" className="info-icon-img" />
                <span className="info-label">Số điện thoại</span>
                <span className="info-value">{mentee.phone}</span>
              </div>
              <div className="info-item">
                <img src={iconMssv} alt="MSSV" className="info-icon-img" />
                <span className="info-label">MSSV</span>
                <span className="info-value">{mentee.mssv}</span>
              </div>
              <div className="info-item">
                <img src={iconMajor} alt="Major" className="info-icon-img" />
                <span className="info-label">Ngành học</span>
                <span className="info-value">{mentee.major}</span>
              </div>
              <div className="info-item vertical">
                <div className="item-header">
                  <img src={iconSkills} alt="Skills" className="info-icon-img" />
                  <span className="info-label">Kỹ năng quan tâm</span>
                </div>
                <div className="info-tags">
                  {mentee.skills.map(skill => (
                    <span key={skill} className="info-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="info-item vertical">
                <div className="item-header">
                  <img src={iconTargetGoal} alt="Target" className="info-icon-img" />
                  <span className="info-label">Mục tiêu học tập</span>
                </div>
                <p className="info-text">{mentee.target}</p>
              </div>
              <div className="info-item">
                <img src={iconLevel} alt="Level" className="info-icon-img" />
                <span className="info-label">Cấp độ</span>
                <span className="info-badge">{mentee.level}</span>
              </div>
              <div className="info-item">
                <img src={iconLinkedin} alt="LinkedIn" className="info-icon-img" />
                <span className="info-label">LinkedIn</span>
                <span className="info-value link">{mentee.linkedin}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          {mode === 'manage' ? (
            <>
              <div className="info-card mb-4">
                <div className="card-header-flex">
                  <h3 className="card-title">Lộ trình mentoring</h3>
                  <button className="btn-edit-text" onClick={() => setIsRoadmapModalOpen(true)}>Tùy chỉnh</button>
                </div>
                <div className="track-progress-card mb-4">
                  <div className="track-icon-img">
                    <img src={iconTrack} alt="track" className="track-img" />
                  </div>
                  <div className="track-details">
                    <h4 className="track-name">{roadmapData.name}</h4>
                    <p className="track-duration">{roadmapData.duration}</p>
                  </div>
                  <div className="track-stats">
                    <p className="stats-label">Đã hoàn thành <span>{roadmapData.progress}%</span></p>
                    <div className="stats-bar"><div className="stats-fill" style={{width: `${roadmapData.progress}%`}}></div></div>
                    <p className="stats-sub">{roadmapData.completedSessions}/{roadmapData.totalSessions} buổi</p>
                  </div>
                </div>
                
                <div className="next-session-card">
                  <div className="session-icon-img">
                    <img src={iconSession} alt="session" className="session-img" />
                  </div>
                  <div className="session-details">
                    <p className="session-label">Buổi học tiếp theo</p>
                    <h4 className="session-title">{nextSession.title}</h4>
                    <div className="session-meta">
                      <span>📅 {nextSession.date}</span>
                      <span>🕒 {nextSession.time}</span>
                    </div>
                  </div>
                  <button className="btn-view-details-small" onClick={() => setIsSessionDetailModalOpen(true)}>Xem chi tiết</button>
                </div>
              </div>

              <div className="two-cols">
                <div className="info-card">
                  <h3 className="card-title">Hoạt động gần đây</h3>
                  <div className="activity-item">
                    <div className="activity-icon-img">
                      <img src={iconActivity} alt="activity" className="activity-img" />
                    </div>
                    <div className="activity-details">
                      <h4 className="activity-title">Hoàn thành bài tập tuần 4: Data Cleaning</h4>
                      <p className="activity-time">2 giờ trước</p>
                      <span className="activity-status">Hoàn thành</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="card-header-flex">
                    <h3 className="card-title">Tài liệu</h3>
                    <span className="link-view-all">Xem tất cả</span>
                  </div>
                  <div className="doc-list">
                    {mockDocs.map(doc => (
                      <div key={doc.id} className="doc-item" onClick={() => { setSelectedDoc(doc); setIsPreviewModalOpen(true); }}>
                        <div className="doc-icon-img">
                          <img src={iconDoc} alt="doc" className="doc-img" />
                        </div>
                        <div className="doc-details">
                          <h4 className="doc-title">{doc.title}</h4>
                          <p className="doc-size">{doc.size}</p>
                        </div>
                        <button className="btn-download" onClick={(e) => { e.stopPropagation(); alert(`Đang tải xuống: ${doc.title}`); }}>
                          <img src={iconDownload} alt="download" className="download-img" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="info-card mb-4">
                <div className="section-title-line">
                  <h3 className="section-title-orange">Về bản thân</h3>
                </div>
                <p className="about-text">
                  My objectives are to get solid skills and develop in hospitality and marketing, specially in the field of communication.
                  I am driven to be the best at what I do and I want to work somewhere I will have the opportunities to develop my skills, take on interesting projects, and work with people I can really learn from.
                </p>
              </div>

              <div className="info-card">
                <div className="section-title-line">
                  <h3 className="section-title-orange">Kinh nghiệm</h3>
                </div>
                <div className="experience-item">
                  <h4 className="experience-title">Research Paper Presentation</h4>
                  <p className="experience-org">National Scientific Conference 2025</p>
                  <p className="experience-desc">"Sustainable Business: From Research to Policy and Practice"</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Chat Dialog Overlay */}
      {chatOpen && (
        <div className="chat-dialog-overlay">
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-user-info">
                <img src={mentee.avatar} alt="Avatar" className="chat-avatar-sm" />
                <div>
                  <h4 className="chat-user-name">{mentee.name}</h4>
                  <p className="chat-status">Trực tuyến</p>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setChatOpen(false)}>×</button>
            </div>
            
            <div className="chat-messages">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`message-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && chatMessage.trim()) {
                    setChatHistory([...chatHistory, { sender: 'mentor', text: chatMessage }]);
                    setChatMessage('');
                  }
                }}
              />
              <button 
                className="btn-send-chat"
                onClick={() => {
                  if (chatMessage.trim()) {
                    setChatHistory([...chatHistory, { sender: 'mentor', text: chatMessage }]);
                    setChatMessage('');
                  }
                }}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Report Modal */}
      {isReportModalOpen && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <div className="report-modal-header">
              <h3>Báo cáo buổi học</h3>
              <button className="close-modal-btn" onClick={() => setIsReportModalOpen(false)}>×</button>
            </div>
            <form className="report-form" onSubmit={handleSaveReport}>
              <div className="report-form-group">
                <label>Chọn buổi học đã diễn ra</label>
                <select 
                  className="report-select"
                  value={reportForm.sessionId}
                  onChange={e => setReportForm({...reportForm, sessionId: e.target.value})}
                  required
                >
                  <option value="">-- Chọn buổi học --</option>
                  {pastSessions.map(s => (
                    <option key={s.id} value={s.id}>{s.title} ({s.date})</option>
                  ))}
                </select>
              </div>

              <div className="report-form-group">
                <label>Đánh giá buổi học</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      className={`star ${reportForm.rating >= star ? 'active' : ''}`}
                      onClick={() => setReportForm({...reportForm, rating: star})}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="report-form-group">
                <label>Nội dung buổi học & Nhận xét</label>
                <textarea 
                  className="report-textarea"
                  placeholder="Nhập nội dung tóm tắt buổi học và nhận xét về mentee..."
                  value={reportForm.content}
                  onChange={e => setReportForm({...reportForm, content: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="report-form-group">
                <label>Tài liệu đính kèm (Slide, bài tập...)</label>
                <div className="file-upload-zone">
                  <input 
                    type="file" 
                    id="file-upload" 
                    multiple 
                    onChange={e => setReportForm({...reportForm, files: Array.from(e.target.files)})}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <span className="upload-icon">📁</span>
                    <span>Nhấn để tải lên tài liệu từ máy tính</span>
                    <p className="upload-hint">Hỗ trợ PDF, DOCX, PPTX, ZIP (Max 20MB)</p>
                  </label>
                  {reportForm.files.length > 0 && (
                    <div className="selected-files">
                      {reportForm.files.map((file, idx) => (
                        <div key={idx} className="file-tag">
                          <span>📄 {file.name}</span>
                          <button type="button" onClick={() => setReportForm({...reportForm, files: reportForm.files.filter((_, i) => i !== idx)})}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="report-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsReportModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-submit-report">Gửi báo cáo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roadmap Customization Modal */}
      {isRoadmapModalOpen && (
        <div className="report-modal-overlay">
          <div className="report-modal roadmap-editor">
            <div className="report-modal-header">
              <h3>Tùy chỉnh lộ trình</h3>
              <button className="close-modal-btn" onClick={() => setIsRoadmapModalOpen(false)}>×</button>
            </div>
            <form className="report-form" onSubmit={handleSaveRoadmap}>
              <div className="report-form-group">
                <label>Tên lộ trình / Track</label>
                <input 
                  type="text" 
                  className="report-select"
                  value={roadmapData.name}
                  onChange={e => setRoadmapData({...roadmapData, name: e.target.value})}
                />
              </div>
              <div className="grid-2">
                <div className="report-form-group">
                  <label>Thời lượng</label>
                  <input 
                    type="text" 
                    className="report-select"
                    value={roadmapData.duration}
                    onChange={e => setRoadmapData({...roadmapData, duration: e.target.value})}
                  />
                </div>
                <div className="report-form-group">
                  <label>Tiến độ (%)</label>
                  <input 
                    type="number" 
                    className="report-select"
                    value={roadmapData.progress}
                    onChange={e => setRoadmapData({...roadmapData, progress: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid-2">
                <div className="report-form-group">
                  <label>Tổng số buổi</label>
                  <input 
                    type="number" 
                    className="report-select"
                    value={roadmapData.totalSessions}
                    onChange={e => setRoadmapData({...roadmapData, totalSessions: e.target.value})}
                  />
                </div>
                <div className="report-form-group">
                  <label>Đã hoàn thành</label>
                  <input 
                    type="number" 
                    className="report-select"
                    value={roadmapData.completedSessions}
                    onChange={e => setRoadmapData({...roadmapData, completedSessions: e.target.value})}
                  />
                </div>
              </div>
              <div className="report-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsRoadmapModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-submit-report">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Next Session Details Modal */}
      {isSessionDetailModalOpen && (
        <div className="report-modal-overlay">
          <div className="report-modal session-detail-modal">
            <div className="report-modal-header blue-theme">
              <h3>Chi tiết buổi học tiếp theo</h3>
              <button className="close-modal-btn" onClick={() => setIsSessionDetailModalOpen(false)}>×</button>
            </div>
            <div className="session-detail-content">
              <div className="detail-item">
                <span className="detail-label">Chủ đề</span>
                <h4 className="detail-value-title">{nextSession.title}</h4>
              </div>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Thời gian</span>
                  <p className="detail-value">{nextSession.date}</p>
                  <p className="detail-value">{nextSession.time}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Địa điểm / Link</span>
                  <p className="detail-value">{nextSession.location}</p>
                  <a href={nextSession.link} target="_blank" rel="noreferrer" className="detail-link">{nextSession.link}</a>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nội dung chính</span>
                <p className="detail-value">{nextSession.topic}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cần chuẩn bị</span>
                <div className="prep-box">
                  {nextSession.prep}
                </div>
              </div>
            </div>
            <div className="report-modal-footer">
              <button className="btn-primary-blue full-width" onClick={() => setIsSessionDetailModalOpen(false)}>Đã hiểu</button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {isPreviewModalOpen && selectedDoc && (
        <div className="report-modal-overlay">
          <div className="report-modal doc-preview-modal">
            <div className="report-modal-header gray-theme">
              <h3>Xem trước tài liệu</h3>
              <button className="close-modal-btn" onClick={() => setIsPreviewModalOpen(false)}>×</button>
            </div>
            <div className="doc-preview-content">
              <div className="doc-preview-visual">
                <div className="doc-preview-placeholder">
                  <img src={iconDoc} alt="Doc Icon" className="preview-large-icon" />
                  <p className="preview-filename">{selectedDoc.title}</p>
                  <p className="preview-meta">{selectedDoc.type} • {selectedDoc.size}</p>
                </div>
              </div>
              <div className="doc-info-pane">
                <div className="detail-item">
                  <span className="detail-label">Tên tập tin</span>
                  <p className="detail-value-bold">{selectedDoc.title}</p>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Kích thước</span>
                    <p className="detail-value">{selectedDoc.size}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ngày tải lên</span>
                    <p className="detail-value">{selectedDoc.date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="report-modal-footer">
              <button className="btn-secondary-gray" onClick={() => setIsPreviewModalOpen(false)}>Đóng</button>
              <div className="action-buttons-right">
                <button className="btn-view-full" onClick={() => alert('Đang mở chế độ xem toàn màn hình...')}>Xem toàn bộ</button>
                <button className="btn-download-premium" onClick={() => alert(`Đang tải xuống: ${selectedDoc.title}`)}>Tải xuống máy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeProfile;
