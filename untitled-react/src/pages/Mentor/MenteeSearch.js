import React, { useState } from 'react';
import './MenteeSearch.css';

const MOCK_MENTEES = [
  { id: 1, name: 'Huỳnh Gia Bảo', year: 'Năm 2', major: 'Thương mại điện tử', goals: ['Business Analyst', 'Data Analyst'], avatar: '/alumni/alumni_tri.jpg' },
  { id: 2, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 3, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 4, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 5, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 6, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 7, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
  { id: 8, name: 'Họ và tên', year: 'Năm', major: 'Ngành học', goals: ['Hướng nghề', 'Hướng nghề'], avatar: '' },
];

const MenteeSearch = () => {
  const [activeFilters, setActiveFilters] = useState({
    year: 'Tất cả',
    major: 'Tất cả',
    path: 'Tất cả'
  });

  const filterGroups = [
    {
      label: 'Trình độ năm học',
      key: 'year',
      options: ['Tất cả', 'Năm 1', 'Năm 2', 'Năm 3', 'Năm 4']
    },
    {
      label: 'Nhóm ngành',
      key: 'major',
      options: ['Tất cả', '411', '406', '416']
    },
    {
      label: 'Hướng nghề mong muốn',
      key: 'path',
      options: ['Tất cả', 'Data Analyst', 'Business Analyst', 'ERP Consultant', 'Product Manager', 'Vận hành sàn TMĐT', 'Khác...']
    }
  ];

  return (
    <div className="mentee-search-dashboard">
      <div className="search-container">
        <div className="search-box-wrapper">
          <input type="text" placeholder="Tìm kiếm Mentee" className="search-input" />
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
        {MOCK_MENTEES.map((mentee) => (
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
            <button className="mentee-view-more">Xem thêm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteeSearch;
