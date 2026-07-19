import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MenteeSearch.css';
import menteeBao from '../../assets/mentee-bao.png';
import menteeNhi from '../../assets/mentee-nhi.jpg';
import menteeGiang from '../../assets/mentee-giang.jpg';

// Generic avatars
import avatarMale1 from '../../assets/avatar-male-1.png';
import avatarFemale1 from '../../assets/avatar-female-1.png';
import avatarMale2 from '../../assets/avatar-male-2.png';
import avatarFemale2 from '../../assets/avatar-female-2.png';

const MOCK_MENTEES = [
  { id: 1, name: 'Huỳnh Gia Bảo', year: 'Năm 2', major: 'Thương mại điện tử', goals: ['Business Analyst', 'Data Analyst'], avatar: menteeBao },
  { id: 2, name: 'Đặng Quỳnh Nhi', year: 'Năm 3', major: 'Thương mại điện tử', goals: ['E-Commerce', 'Digital Marketing'], avatar: menteeNhi },
  { id: 3, name: 'Nguyễn Ngọc Trường Giang', year: 'Năm 4', major: 'Hệ thống thông tin', goals: ['Business Analyst', 'ERP Consultant'], avatar: menteeGiang },
  { id: 4, name: 'Trần Hoàng Nam', year: 'Năm 2', major: 'Thương mại điện tử', goals: ['E-Commerce', 'Digital Marketing'], avatar: avatarMale1 },
  { id: 5, name: 'Lê Mỹ Linh', year: 'Năm 3', major: 'Quản trị kinh doanh', goals: ['Digital Marketing', 'Business Strategy'], avatar: avatarFemale1 },
  { id: 6, name: 'Phạm Gia Huy', year: 'Năm 4', major: 'Hệ thống thông tin', goals: ['ERP Consultant', 'Business Analyst'], avatar: avatarMale2 },
  { id: 7, name: 'Nguyễn Thảo Vy', year: 'Năm 1', major: 'Thương mại điện tử', goals: ['Digital Marketing', 'Content Creator'], avatar: avatarFemale2 },
  { id: 8, name: 'Đỗ Hoàng Long', year: 'Năm 2', major: 'Hệ thống thông tin', goals: ['Data Analyst', 'SQL'], avatar: avatarMale1 },
  { id: 9, name: 'Trịnh Kim Chi', year: 'Năm 3', major: 'Quản trị kinh doanh', goals: ['Digital Marketing', 'E-Commerce'], avatar: avatarFemale1 },
  { id: 10, name: 'Bùi Anh Tú', year: 'Năm 4', major: 'Thương mại điện tử', goals: ['Digital Marketing', 'SEO'], avatar: avatarMale2 },
];

const MenteeSearch = () => {
  const history = useHistory();
  const [activeFilters, setActiveFilters] = useState({
    year: 'Tất cả',
    major: 'Tất cả',
    path: 'Tất cả'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filterGroups = [
    {
      label: 'Trình độ năm học',
      key: 'year',
      options: ['Tất cả', 'Năm 1', 'Năm 2', 'Năm 3', 'Năm 4']
    },
    {
      label: 'Nhóm ngành',
      key: 'major',
      options: ['Tất cả', 'Thương mại điện tử', 'Hệ thống thông tin', 'Quản trị kinh doanh']
    },
    {
      label: 'Hướng nghề mong muốn',
      key: 'path',
      options: ['Tất cả', 'Data Analyst', 'Business Analyst', 'ERP Consultant', 'E-Commerce', 'Digital Marketing']
    }
  ];

  const filteredMentees = MOCK_MENTEES.filter(mentee => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentee.major.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = activeFilters.year === 'Tất cả' || mentee.year === activeFilters.year;
    const matchesMajor = activeFilters.major === 'Tất cả' || mentee.major === activeFilters.major;
    const matchesPath = activeFilters.path === 'Tất cả' || mentee.goals.some(goal => goal === activeFilters.path);
    
    return matchesSearch && matchesYear && matchesMajor && matchesPath;
  });

  return (
    <div className="mentee-search-dashboard">
      <div className="search-container">
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Tìm kiếm Mentee" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
        <button className="filter-toggle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        </button>
      </div>

      <div className="filters-grid">
        {filterGroups.map((group) => (
          <div key={group.key} className="filter-group">
            <span className="filter-label">{group.label}</span>
            <div className="filter-options">
              {group.options.map((option) => (
                <button
                  key={option}
                  className={`filter-pill ${activeFilters[group.key] === option ? 'active' : ''}`}
                  onClick={() => setActiveFilters({ ...activeFilters, [group.key]: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mentee-grid">
        {filteredMentees.length > 0 ? (
          filteredMentees.map((mentee) => (
            <div key={mentee.id} className="mentee-card">
              <div className="mentee-year-tag">{mentee.year}</div>
              <div className="mentee-avatar">
                {mentee.avatar ? (
                  <img src={mentee.avatar} alt={mentee.name} />
                ) : (
                  <div className="avatar-placeholder"></div>
                )}
              </div>
              <div className="mentee-info">
                <h4 className="mentee-name">{mentee.name}</h4>
                <p className="mentee-major">{mentee.major}</p>
                <div className="mentee-goals">
                  {mentee.goals.map((goal, i) => (
                    <span key={i} className="goal-tag">{goal}</span>
                  ))}
                </div>
              </div>
              <button className="mentee-view-more" onClick={() => history.push(`/mentees/profile/${mentee.id}?mode=search`)}>Xem thêm</button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Không tìm thấy Mentee phù hợp với tiêu chí của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeSearch;
