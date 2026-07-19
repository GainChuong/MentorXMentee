import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './MenteeApplications.css';

// Avatars
import avatarMale1 from '../../assets/avatar-male-1.png';
import avatarFemale1 from '../../assets/avatar-female-1.png';
import avatarMale2 from '../../assets/avatar-male-2.png';
import avatarFemale2 from '../../assets/avatar-female-2.png';
import iconDoc from '../../assets/icon-doc.png';
import iconDownload from '../../assets/icon-download.png';

const MOCK_APPLICATIONS = [
  { id: 1, name: 'Trần Văn An', year: 'Sinh viên Năm 2', message: 'Em rất mong được học hỏi thêm về kỹ năng SQL và cách tối ưu hóa truy vấn dữ liệu từ anh.', cv: 'CV_TranVanAn_DA.pdf', role: 'Data Analyst', status: 'Pending', avatar: avatarMale1 },
  { id: 2, name: 'Lê Thị Bình', year: 'Sinh viên Năm 4', message: 'Em đang thực hiện đồ án tốt nghiệp về hệ thống vận hành TMĐT và cần sự cố vấn chuyên sâu.', cv: 'CV_LeBinh_Ecom.pdf', role: 'E-Commerce', status: 'Pending', avatar: avatarFemale1 },
  { id: 3, name: 'Phạm Hồng Cường', year: 'Sinh viên Năm 3', message: 'Em muốn định hướng trở thành Business Analyst và hy vọng anh giúp em cải thiện tư duy logic.', cv: 'CV_PhamCuong_BA.pdf', role: 'Business Analyst', status: 'Pending', avatar: avatarMale2 },
  { id: 4, name: 'Đỗ Minh Đức', year: 'Sinh viên Năm 1', message: 'Dù là năm nhất nhưng em rất đam mê công nghệ và muốn tìm hiểu sớm về ngành Hệ thống thông tin.', cv: 'CV_DoDuc_Freshman.pdf', role: 'Hệ thống thông tin', status: 'Pending', avatar: avatarMale1 },
  { id: 5, name: 'Ngô Thanh Hà', year: 'Sinh viên Năm 2', message: 'Em đang quan tâm đến Digital Marketing và cách áp dụng Data vào chiến dịch quảng cáo.', cv: 'CV_NgoHa_Marketing.pdf', role: 'Digital Marketing', status: 'Pending', avatar: avatarFemale2 },
  { id: 6, name: 'Vũ Thái Hòa', year: 'Sinh viên Năm 3', message: 'Em đã có nền tảng Excel tốt và muốn học thêm về PowerBI để trực quan hóa báo cáo.', cv: 'CV_VuHoa_BI.pdf', role: 'Data Analyst', status: 'Pending', avatar: avatarMale2 },
];

const MenteeApplications = () => {
  const { currentUser, acceptMentee } = useUser();
  const [filter, setFilter] = useState('All');
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);

  // If not mentor, redirect or show error
  if (!currentUser || currentUser.role !== 'alumni_mentor') {
    return <Redirect to="/" />;
  }

  // Modal states
  const [acceptSuccessOpen, setAcceptSuccessOpen] = useState(false);
  const [rejectFormOpen, setRejectFormOpen] = useState(false);
  const [rejectSuccessOpen, setRejectSuccessOpen] = useState(false);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);
  
  const [activeAppId, setActiveAppId] = useState(null);
  const [activeCv, setActiveCv] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectSuggestion, setRejectSuggestion] = useState('');

  const handleAcceptClick = (id) => {
    // Find the application
    const application = applications.find(app => app.id === id);
    if (application) {
      // Add to managed list
      acceptMentee(application);
      // Update status locally (to move it to 'Approved' filter tab)
      setApplications(apps => apps.map(app => app.id === id ? { ...app, status: 'Approved' } : app));
      setAcceptSuccessOpen(true);
    }
  };

  const handleRejectClick = (id) => {
    setActiveAppId(id);
    setRejectReason('');
    setRejectSuggestion('');
    setRejectFormOpen(true);
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }
    setApplications(apps => apps.map(app => app.id === activeAppId ? { ...app, status: 'Rejected' } : app));
    setRejectFormOpen(false);
    setRejectSuccessOpen(true);
  };

  const filteredApps = applications.filter(app => {
    if (filter === 'All') return true;
    return app.status === filter;
  });

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1 className="page-title">DANH SÁCH MENTEE ĐĂNG KÝ</h1>
        
        <div className="filter-container">
          <span className="filter-label">Filter by status:</span>
          <div className="filter-buttons">
            {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="applications-grid">
        {filteredApps.map(app => (
          <div key={app.id} className="app-card">
            <div className="app-card-icon">
              {app.avatar ? (
                <img src={app.avatar} alt={app.name} className="app-avatar-img" />
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
            
            <div className="app-card-content">
              <div className="app-info">
                <div className="app-info-top">
                  <h3 className="app-name">{app.name}</h3>
                  <p className="app-year">{app.year}</p>
                  <p className="app-message">{app.message}</p>
                </div>
                
                <div className="app-cv">
                  <a 
                    href={`#preview-${app.cv}`} 
                    className="app-cv-link"
                    title="Bấm để xem trước"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCv(app.cv);
                      setCvPreviewOpen(true);
                    }}
                  >
                    <img src={iconDoc} alt="Document" className="cv-icon" />
                    <span>{app.cv}</span>
                  </a>
                </div>
              </div>
              
              <div className="app-actions">
                <div className="app-role-tag">{app.role}</div>
                {app.status === 'Pending' ? (
                  <div className="action-buttons">
                    <button className="btn-accept" onClick={() => handleAcceptClick(app.id)}>Chấp nhận</button>
                    <button className="btn-reject" onClick={() => handleRejectClick(app.id)}>Từ chối</button>
                  </div>
                ) : (
                  <div className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status === 'Approved' ? 'Đã chấp nhận' : 'Đã từ chối'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredApps.length === 0 && (
          <div className="no-applications">Không có đơn đăng ký nào.</div>
        )}
      </div>

      {/* Accept Success Modal */}
      {acceptSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <button className="close-btn" onClick={() => setAcceptSuccessOpen(false)}>×</button>
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="#00c853">
                <circle cx="12" cy="12" r="12" />
                <path d="M9.5 16.5l-4.5-4.5 1.5-1.5 3 3 7.5-7.5 1.5 1.5-9 9z" fill="white" />
              </svg>
            </div>
            <h2 className="modal-title-orange">CHẤP NHẬN THÀNH CÔNG</h2>
            <p className="modal-subtitle">Bạn về Mentee đã kết nối thành công</p>
          </div>
        </div>
      )}

      {/* Reject Form Modal */}
      {rejectFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content reject-form-modal">
            <button className="close-btn" onClick={() => setRejectFormOpen(false)}>×</button>
            <h2 className="modal-title-orange">TỪ CHỐI MENTEE</h2>
            
            <div className="form-group">
              <label>Lý do từ chối *</label>
              <textarea 
                className="form-textarea"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Suggestions for<br/>Revision</label>
              <textarea 
                className="form-textarea large"
                value={rejectSuggestion}
                onChange={e => setRejectSuggestion(e.target.value)}
              />
            </div>
            
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setRejectFormOpen(false)}>Cancel</button>
              <button className="btn-submit" onClick={submitReject}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Success Modal */}
      {rejectSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <button className="close-btn" onClick={() => setRejectSuccessOpen(false)}>×</button>
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="#00c853">
                <circle cx="12" cy="12" r="12" />
                <path d="M9.5 16.5l-4.5-4.5 1.5-1.5 3 3 7.5-7.5 1.5 1.5-9 9z" fill="white" />
              </svg>
            </div>
            <h2 className="modal-title-orange">TỪ CHỐI MENTEE</h2>
            <p className="modal-subtitle">Thông báo từ chối đã được gửi đến Mentee</p>
          </div>
        </div>
      )}

      {/* CV Preview Modal */}
      {cvPreviewOpen && (
        <div className="modal-overlay">
          <div className="modal-content cv-preview-modal">
            <button className="close-btn" onClick={() => setCvPreviewOpen(false)}>×</button>
            <h2 className="modal-title-orange">XEM TRƯỚC CV</h2>
            <p className="cv-filename">{activeCv}</p>
            
            <div className="cv-preview-content">
              {/* Mocking PDF content with a stylish placeholder */}
              <div className="cv-placeholder">
                <img src={iconDoc} alt="PDF Icon" className="preview-placeholder-icon" />
                <p>Nội dung file PDF sẽ hiển thị ở đây</p>
                <div className="mock-text-lines">
                  <div className="line long"></div>
                  <div className="line medium"></div>
                  <div className="line short"></div>
                  <div className="line long"></div>
                  <div className="line medium"></div>
                </div>
              </div>
            </div>
            
            <div className="cv-preview-actions">
              <button className="btn-download-cv" onClick={() => alert(`Đang tải xuống: ${activeCv}`)}>
                <img src={iconDownload} alt="Download" className="download-btn-icon" />
                Tải về CV
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MenteeApplications;
