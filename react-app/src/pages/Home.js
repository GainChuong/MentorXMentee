import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import MenteeSearch from './Mentor/MenteeSearch';
import './Home.css';

const MOCK_NEWS = [
  {id:1, tag:'Sự kiện', title:'Hội thảo Chuyển đổi số trong Giáo dục Đại học 2026', desc:'Khoa HTTT phối hợp tổ chức hội thảo quốc tế về ứng dụng AI và công nghệ trong giáo dục...', date:'02/05/2026', featured:true, image: '/Rectangle 46.png'},
  {id:2, tag:'Tin tức', title:'Sinh viên HTTT đạt giải nhất cuộc thi Hackathon toàn quốc', desc:'Đội thi gồm 4 sinh viên năm 3 đã xuất sắc vượt qua 200 đội thi...', date:'28/04/2026', image: '/Rectangle 59.png'},
  {id:3, tag:'Tuyển dụng', title:'FPT Software tuyển dụng thực tập sinh IT 2026', desc:'Chương trình thực tập mùa hè dành cho sinh viên năm 3, năm 4...', date:'25/04/2026', image: '/Rectangle 64.png'},
  {id:4, tag:'Hoạt động', title:'Chương trình Mentor x Mentee kết nối 50 cặp đôi mới', desc:'Đợt kết nối tháng 4 đã ghép thành công 50 cặp mentor-mentee...', date:'20/04/2026', image: '/Rectangle 69.png'},
];

const MOCK_ALUMNI = [
  {
    name: 'Anh Bằng Nhân Trí',
    role: 'Quán quân Global Leadership Challenge 2025',
    achievement: 'Cựu sinh viên K20 - Lớp CNTN ngành Thương mại điện tử',
    avatar: '/alumni/alumni_tri.jpg',
    description: 'Thành viên đội quán quân với giải pháp “A LiDl better everyday” cho tập đoàn bán lẻ quốc tế Lidl (Đức), thuộc Schwarz Group.'
  },
  {
    name: 'Nguyễn Thị Thúy Hiền',
    role: 'Giải nhất NCKH cấp trường 2023-2024',
    achievement: 'Cựu sinh viên K21 - Lớp CNTN HTTT Quản lý',
    avatar: '/alumni/alumni_hien.jpg',
    description: 'Đồng tác giả bài báo quốc tế (Scopus Q1). Top 20 Digital Creatory 2023.'
  },
  {
    name: 'Phan Ngọc Bảo Tâm',
    role: 'Thủ khoa ngành Hệ thống thông tin quản lý',
    achievement: 'Cựu sinh viên HTTT Quản lý',
    avatar: '/alumni/alumni_tam.jpg',
    description: '“Không có giới hạn nào khi chúng mình thực sự quyết tâm và nỗ lực.”'
  },
  {
    name: 'Lê Châu Anh',
    role: 'Thủ khoa ngành Thương mại điện tử',
    achievement: 'Cựu sinh viên Thương mại điện tử',
    avatar: '/alumni/alumni_anh.jpg',
    description: '“Môi trường Nhà Xanh đã giúp mình đạt được những thành quả như hôm nay.”'
  },
];

const HERO_SLIDES = [
  { id: 1, image: '/Bìa 1.png' },
  { id: 2, image: '/cuu-nguoi-hoc-uel.jpg' }
];

const SLIDE_DURATION = 5000;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser.role !== 'alumni_mentor') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, SLIDE_DURATION);
      return () => clearInterval(timer);
    }
  }, [currentSlide, currentUser.role]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Standard View with optional Mentor Sub-navbar
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="home-hero">
        {HERO_SLIDES.map((slide, index) => (
          <img 
            key={slide.id}
            src={slide.image} 
            alt="Hero Banner" 
            className={`home-hero-bg ${index === currentSlide ? 'active' : ''}`}
          />
        ))}

        <div className="hero-bottom-controls-wrapper">
          <div className="hero-bottom-controls">
            <div className="hero-progress-track">
              <div 
                key={currentSlide}
                className="hero-progress-fill" 
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
            <div className="hero-nav-buttons">
              <button className="hero-nav-btn" onClick={prevSlide} aria-label="Previous slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="hero-nav-btn" onClick={nextSlide} aria-label="Next slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

    {/* News & Events */}
    <section className="home-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--color-navy)', textAlign: 'center', margin: 0, padding: 0, fontWeight: 700 }}>
          TIN TỨC & SỰ KIỆN
        </h2>
      </div>
      
      <div className="news-complex-grid">
        {/* Left Column: Tin Tức */}
        <div className="news-col-left">
          {/* Main Featured News (Horizontal) */}
          <Link to="/news/1" className="main-featured-news-row">
            <div className="main-featured-img">
              <img src="./Rectangle 46.png" alt="Vietnam Young Lions" />
            </div>
            <div className="main-featured-content-dark">
              <span className="tag-orange">Tin tức</span>
              <h3>Chúc mừng Cựu sinh viên Mai Thị Huỳnh Như đạt giải Bạc tại Vietnam Young Lions 2026</h3>
              <p>Chị Mai Thị Huỳnh Như – cựu sinh viên Khoa HTTT – cùng đồng đội tại Team 97 (Home Credit Vietnam) đã xuất sắc giành giải Silver Winner hạng mục Marketers tại Vietnam Young Lions 2026. Đây là thành tích ấn tượng tại sân chơi sáng tạo uy tín nhất Việt Nam.</p>
            </div>
          </Link>

          {/* Sub News Grid (3 items row) */}
          <div className="sub-news-row">
            <Link to="/news/2" className="sub-news-card-col">
              <div className="sub-news-img"><img src="./Rectangle 120.png" alt="Tân Phó Giáo sư" /></div>
              <div className="sub-news-content">
                <span className="tag-orange-text">Tin tức</span>
                <h4>Chúc mừng hai Tân Phó Giáo sư đầu tiên của Khoa HTTT: PGS.TS Lê Hoành Sử và PGS.TS Hồ Trung Thành</h4>
              </div>
            </Link>
            <Link to="/news/3" className="sub-news-card-col">
              <div className="sub-news-img"><img src="./Rectangle 121.png" alt="Bằng Nhân Trí GLC 2025" /></div>
              <div className="sub-news-content">
                <span className="tag-orange-text">Tin tức</span>
                <h4>Chúc mừng Cựu sinh viên Bằng Nhân Trí đoạt giải Quán quân Global Leadership Challenge 2025</h4>
              </div>
            </Link>
            <Link to="/news/4" className="sub-news-card-col">
              <div className="sub-news-img"><img src="./Rectangle 50.png" alt="SAP Vietnam" /></div>
              <div className="sub-news-content">
                <span className="tag-orange-text">Tin tức</span>
                <h4>Dấu ấn sinh viên UEL tại Diễn đàn Cộng đồng Học thuật SAP Việt Nam 2025</h4>
              </div>
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/news" className="view-more-pill-btn">Tìm hiểu thêm &rarr;</Link>
          </div>
        </div>

        {/* Right Column: Sự Kiện (Scrollable Container) */}
        <div className="news-col-right-container">
          <div className="news-col-right-scrollable">
            {/* Main Featured Event */}
            <Link to="/news/101" className="main-featured-event-card">
              <div className="main-event-img-wrapper">
                <img src="./Rectangle 59.png" alt="Ngày Về 2026" className="main-event-img" />
                <div className="main-event-date-badge">09.05.2026</div>
              </div>
              <div className="main-event-content-dark">
                <span className="tag-orange-small">Sự kiện</span>
                <h3>Ngày Về 2026 - Thanh Âm Rực Rỡ: Kỷ niệm 23 năm thành lập Khoa Hệ thống Thông tin</h3>
              </div>
            </Link>
            
            <div className="divider-line" />

            {/* Sub Events List */}
            <div className="sub-events-list">
              <Link to="/news/103" className="sub-event-item">
                <div className="sub-event-img"><img src="./toadam.png" alt="Tọa đàm" /></div>
                <div className="sub-event-content">
                  <span className="tag-orange-bg">21.03.2026</span>
                  <h4>Tọa đàm: Các hướng nghiên cứu ứng dụng trong đào tạo HTTT & TMĐT</h4>
                </div>
              </Link>
              <Link to="/news/102" className="sub-event-item">
                <div className="sub-event-img"><img src="./681212572_1360495922778615_7166935161293770380_n.jpg" alt="Hoa Mộc Miên" /></div>
                <div className="sub-event-content">
                  <span className="tag-orange-bg">01.05.2026</span>
                  <h4>Chiến dịch tình nguyện "Hoa Mộc Miên" lần thứ VIII</h4>
                </div>
              </Link>
              <Link to="/news/7" className="sub-event-item">
                <div className="sub-event-img"><img src="./Rectangle 128.png" alt="Văn nghệ" /></div>
                <div className="sub-event-content">
                  <span className="tag-orange-bg">15.03.2025</span>
                  <h4>Đội văn nghệ IAT ghi dấu ấn đậm nét tại Hội diễn Văn nghệ UEL 2025</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Hoạt động cộng đồng */}
    <section className="home-section community-section">
      <div className="section-header-center">
        <h2>HOẠT ĐỘNG CỘNG ĐỒNG</h2>
      </div>

      <div className="community-grid-figma">
        {/* Left: Mentor Banner */}
        <div className="mentor-banner-figma">
          <div className="mentor-banner-figma-bg"></div>
          <div className="mentor-banner-figma-overlay"></div>
          <div className="mentor-banner-figma-content">
            <div className="mentor-icon-figma">
              <img src="./Rectangle 70.png" alt="Mentor icon" />
            </div>
            <div className="mentor-banner-figma-body">
              <h3>ĐĂNG KÝ TRỞ THÀNH MENTOR</h3>
              <p>Chia sẻ kinh nghiệm, kiến thức nghề nghiệp của bạn cho thế hệ sinh viên kế cận. Cùng xây dựng cộng đồng cựu sinh viên vững mạnh.</p>
              <Link to="/register" className="btn-orange-figma">ĐĂNG KÝ NGAY →</Link>
            </div>
          </div>
        </div>

        {/* Right: Two stacked cards */}
        <div className="community-right-figma">
          {/* Tài liệu hướng dẫn */}
          <Link to="/docs" className="docs-card-figma">
            <h3>TÀI LIỆU HƯỚNG DẪN</h3>
            <div className="docs-card-divider"></div>
            <ul className="docs-card-list">
              <li>Quy trình đăng ký thành Mentor</li>
              <li>Bộ quy tắc ứng xử trên diễn đàn</li>
            </ul>
            <div className="docs-card-icon-float">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </Link>

          {/* Diễn đàn thảo luận */}
          <Link to="/forum" className="forum-card-figma">
            <div className="forum-icon-figma">
              <img src="./Rectangle 69.png" alt="Diễn đàn" />
            </div>
            <div className="forum-card-text">
              <h3>DIỄN ĐÀN THẢO LUẬN</h3>
              <p>Nơi trao đổi, chia sẻ kinh nghiệm giữa Mentor và Mentee trong cộng đồng cựu sinh viên</p>
            </div>
            <span className="forum-card-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>

    {/* Chung tay xây dựng */}
    <section className="contribute-banner-figma">
      <div className="contribute-banner-bg">
        <img src="./Rectangle 75.png" alt="FIS event" />
      </div>
      <div className="contribute-banner-overlay"></div>
      <div className="contribute-banner-content">
        <h2>CHUNG TAY XÂY DỰNG</h2>
        <h3>KHOA HỆ THỐNG THÔNG TIN</h3>
        <p>Cùng UEL Alumni tạo ra những giá trị tích cực thông qua Quỹ học bổng và chia sẻ Cơ hội nghề nghiệp cho thế hệ sinh viên tiếp nối.</p>
        <div className="contribute-banner-btns">
          <Link to="/donate" className="btn-contribute-orange">QUYÊN GÓP (GIVING)</Link>
          <Link to="/jobs" className="btn-contribute-outline">ĐĂNG TUYỂN DỤNG</Link>
        </div>
      </div>
    </section>

    {/* Notable Alumni */}
    <section className="home-section alumni-premium-section">
      <div className="section-header-center">
        <h2>CỰU NGƯỜI HỌC TIÊU BIỂU</h2>
        <p className="section-subtitle">Những gương mặt xuất sắc đại diện cho giá trị và bản lĩnh của sinh viên Khoa HTTT</p>
      </div>
      
      <div className="alumni-premium-grid">
        {MOCK_ALUMNI.map((a, i) => (
          <div key={i} className="alumni-premium-card">
            <div className="alumni-premium-avatar-wrapper">
              <img src={a.avatar} alt={a.name} className="alumni-premium-avatar" />
              <div className="alumni-premium-badge">Featured</div>
            </div>
            <div className="alumni-premium-info">
              <h4 className="alumni-premium-name">{a.name}</h4>
              <p className="alumni-premium-role">{a.role}</p>
              <div className="alumni-premium-divider"></div>
              <p className="alumni-premium-achievement">{a.achievement}</p>
              <p className="alumni-premium-desc">{a.description}</p>
            </div>
            <div className="alumni-premium-footer">
              <Link to="/alumni" className="alumni-view-btn">Xem chi tiết</Link>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Link to="/alumni" className="view-all-alumni-btn">
          XEM TẤT CẢ CỰU SINH VIÊN 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>

  </div>
  );
};

export default Home;
