import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './News.css';

// Import image assets directly from src/assets for Webpack bundling
import rect46 from '../assets/rect-46.png';
import rect50 from '../assets/rect-50.png';
import rect59 from '../assets/rect-59.png';
import rect64 from '../assets/rect-64.png';
import rect119 from '../assets/rect-119.png';
import rect120 from '../assets/rect-120.png';
import rect121 from '../assets/rect-121.png';
import rect124 from '../assets/rect-124.png';
import rect126 from '../assets/rect-126.png';
import rect128 from '../assets/rect-128.png';
import toadam from '../assets/toadam.png';
import hoaMocMien from '../assets/hoa-moc-mien.jpg';


const NEWS_ITEMS = [
  {
    id: 1,
    image: rect46,
    date: '20.04.2026',
    title: 'Chúc mừng Cựu sinh viên Mai Thị Huỳnh Như đạt giải Bạc (Silver Winner) tại Vietnam Young Lions 2026',
    desc: 'Chị Mai Thị Huỳnh Như – cựu sinh viên Khoa Hệ thống Thông tin – cùng đồng đội tại Team 97 (Home Credit Vietnam) đã xuất sắc giành giải Silver Winner hạng mục Marketers tại Vietnam Young Lions 2026. Đây là cuộc thi tìm kiếm tài năng trẻ uy tín nhất ngành Marketing & Communication, nhằm tìm kiếm đại diện Việt Nam tham dự Young Lions tại Cannes (Pháp).',
    featured: true
  },
  {
    id: 2,
    image: rect120,
    date: '16.12.2025',
    title: 'Chúc mừng hai Tân Phó Giáo sư của Khoa Hệ thống Thông tin: PGS.TS Lê Hoành Sử và PGS.TS Hồ Trung Thành',
    desc: 'Ngày 15/12/2025, Trường ĐH Kinh tế - Luật chính thức ký Quyết định bổ nhiệm chức danh Phó Giáo sư đối với PGS.TS Lê Hoành Sử – Trưởng Khoa Hệ thống Thông tin và PGS.TS Hồ Trung Thành – Giảng viên cao cấp của Khoa. Đây là hai PGS.TS đầu tiên của Khoa HTTT, là niềm tự hào và nguồn cảm hứng lớn lao cho các thế hệ giảng viên, sinh viên trong hành trình chinh phục những đỉnh cao tri thức.',
    subtitle: 'PGS.TS Lê Hoành Sử & PGS.TS Hồ Trung Thành'
  },
  {
    id: 3,
    image: rect121,
    date: '23.12.2025',
    title: 'Chúc mừng Cựu sinh viên Bằng Nhân Trí đoạt giải Quán quân Global Leadership Challenge 2025',
    desc: 'Anh Bằng Nhân Trí - cựu sinh viên K20 lớp Cử nhân tài năng Thương mại điện tử UEL - đã xuất sắc trở thành một trong ba đại diện Việt Nam giành ngôi vị Quán quân tại GLC 2025 do Đại học Oxford tổ chức. Với giải pháp chiến lược cho tập đoàn bán lẻ quốc tế Lidl (Đức), Trí đã vượt qua hàng ngàn thí sinh từ các trường đại học danh giá nhất thế giới như Oxford, Cambridge, Harvard để khẳng định bản lĩnh của nhà lãnh đạo tương lai.'
  },
  {
    id: 4,
    image: rect50,
    date: '27-28.11.2025',
    title: 'Dấu ấn sinh viên UEL tại Diễn đàn Cộng đồng Học thuật SAP Việt Nam 2025',
    desc: 'Trong hai ngày 27-28/11/2025 vừa qua, tại Đại học Bách Khoa Hà Nội, nhóm sinh viên thuộc Khoa Hệ thống Thông tin, Trường Đại học Kinh tế - Luật (UEL), ĐHQG-HCM đã có màn thể hiện xuất sắc trong khuôn khổ sự kiện "SAP Academic Community Seminar Vietnam 2025". Với chủ đề "Khai thác SAP Learning Hub, Student Edition", nhóm đã thực hiện thành công các phiên tham luận chuyên sâu về Public Cloud và demo trực tiếp trên hệ thống.',
    fullText: `DẤU ẤN SINH VIÊN UEL TẠI DIỄN ĐÀN CỘNG ĐỒNG HỌC THUẬT SAP VIỆT NAM 2025.\n\nTrong hai ngày 27-28/11/2025 vừa qua, tại Đại học Bách Khoa Hà Nội, nhóm sinh viên thuộc Khoa Hệ thống Thông tin, Trường Đại học Kinh tế - Luật (UEL), ĐHQG-HCM đã có màn thể hiện xuất sắc trong khuôn khổ sự kiện "SAP Academic Community Seminar Vietnam 2025".\n\n🌟 Với chủ đề "Khai thác SAP Learning Hub, Student Edition", dưới sự dẫn dắt tận tình của Thầy ThS. Nguyễn Duy Nhất - Giám đốc Trung tâm Business Intelligence Research Lab, nhóm sinh viên đã thực hiện thành công hai phiên tham luận chuyên sâu về Public Cloud.\n\n🌟 Không chỉ dừng lại ở lý thuyết, nhóm đã chinh phục các chuyên gia và cộng đồng học thuật SAP bằng các thao tác demo trực tiếp trên hệ thống. Qua đó, khẳng định chiến lược tối ưu hóa cho doanh nghiệp:\n✅ Ứng dụng công nghệ chuỗi cung ứng kỹ thuật số.\n✅ Tối ưu hóa quy trình vận hành và quản trị dữ liệu.\n\nThành tích này một lần nữa khẳng định vị thế của sinh viên UEL trong việc tiếp cận và làm chủ các công nghệ quản trị tiên tiến hàng đầu thế giới.`
  },
  {
    id: 5,
    image: rect124,
    date: '28.03.2025',
    title: 'Khoa Hệ thống thông tin: Chuỗi hoạt động kết nối sinh viên và định hướng tương lai',
    desc: 'Nhằm thắt chặt tình cảm giữa các thế hệ người học, Khoa HTTT đã tổ chức thành công chuỗi sự kiện gặp gỡ, tư vấn hướng nghiệp và chia sẻ kinh nghiệm thực tiễn. Đây là dịp để các cựu sinh viên đang làm việc tại các vị trí quan trọng quay lại hỗ trợ, dẫn dắt các thế hệ đàn em trên con đường phát triển sự nghiệp.'
  },
  {
    id: 6,
    image: rect126,
    date: '20.03.2025',
    title: 'Gặp gỡ và tri ân đội ngũ Giảng viên, Thư ký Khoa Hệ thống thông tin',
    desc: 'Buổi gặp mặt thân mật đã diễn ra trong không khí ấm cúng, là dịp để các cựu sinh viên bày tỏ lòng tri ân sâu sắc đến những người thầy, người cô đã tận tâm dạy dỗ. Những kỷ niệm đẹp dưới mái trường UEL một lần nữa được khơi lại, nhắc nhở về giá trị của sự kết nối và biết ơn trong cộng đồng Alumni.'
  },
  {
    id: 7,
    image: rect128,
    date: '15.03.2025',
    title: 'Đội văn nghệ IAT ghi dấu ấn đậm nét tại Hội diễn Văn nghệ UEL 2025',
    desc: 'Với sự đầu tư công phu về cả nội dung lẫn hình thức, đội văn nghệ cựu sinh viên IAT đã mang đến những tiết mục đặc sắc, kết hợp nhuần nhuyễn giữa truyền thống và hiện đại. Thành tích giải Nhất toàn đoàn là minh chứng cho tinh thần nhiệt huyết và tài năng đa dạng của cộng đồng cựu người học Khoa HTTT.'
  }
];

const EVENT_ITEMS = [
  {
    id: 101,
    image: rect59,
    date: '09.05.2026',
    title: '[ NGÀY VỀ 2026 | THANH ÂM RỰC RỠ ] CHÍNH THỨC KHỞI ĐỘNG',
    desc: 'Hành trình 23 năm của Khoa Hệ thống thông tin - Trường Đại học Kinh tế - Luật là một bản giao hưởng được viết nên từ hàng vạn dải tần số khác nhau. Ngày Về 2026 chính là điểm hẹn để những thanh âm ấy cùng hội ngộ, là thời khắc để ta cùng nhìn lại hành trình đầy tự hào.',
    fullText: `Hành trình 23 năm của Khoa Hệ thống thông tin - Trường Đại học Kinh tế - Luật là một bản giao hưởng được viết nên từ hàng vạn dải tần số khác nhau. Không còn là những nhịp điệu đơn lẻ, mỗi FIS-er hôm nay là một tín hiệu bản lĩnh, mang theo “mã nguồn” giá trị của mái nhà chung để vươn mình tỏa sáng khắp mọi miền tổ quốc và vươn tầm quốc tế.\n\nSự vươn mình ấy không chỉ là thành công cá nhân, mà là sự tiếp nối giá trị của cả một thế hệ. Chúng ta, những dải sóng mang bản sắc riêng, lan tỏa năng lượng và không ngừng nâng cấp chính mình. Nhưng chỉ khi hội tụ, sức mạnh ấy mới thực sự đạt đến mức cực đại.\n\nNgày Về 2026 chính là điểm hẹn để những thanh âm ấy cùng hội ngộ, là thời khắc để ta cùng nhìn lại hành trình đầy tự hào và cùng nhau viết tiếp những chương mới rực rỡ hơn.\n\n⏰ Thời gian: 09/05/2026\n📍 Địa điểm: Trường Đại học Kinh tế - Luật\n✨ Hãy cùng chờ đón những điều bất ngờ tiếp theo!`,
    featured: true
  },
  {
    id: 102,
    image: hoaMocMien,
    date: '01.05.2026',
    title: 'Chiến dịch tình nguyện "Hoa Mộc Miên" lần thứ VIII',
    desc: 'Chiến dịch tình nguyện "Hoa Mộc Miên" lần thứ VIII chính thức được thắp lên như một ngọn lửa được truyền qua tám thế hệ, mỗi lần bùng cháy lại ấm hơn, sáng hơn. Lần này, chúng ta không chỉ tiếp bước — chúng ta nâng bước.'
  },
  {
    id: 103,
    image: toadam,
    date: '21.03.2026',
    title: 'Tọa đàm: Các hướng nghiên cứu ứng dụng trong đào tạo cao học và nghiên cứu sinh HTTT & TMĐT',
    desc: 'Đăng ký ngay tọa đàm để tìm hiểu về các hướng nghiên cứu ứng dụng thực tiễn trong lĩnh vực Hệ thống thông tin và Thương mại điện tử. Hạn đăng ký: 19/03/2026.',
    fullText: `ĐĂNG KÝ TỌA ĐÀM “CÁC HƯỚNG NGHIÊN CỨU ỨNG DỤNG TRONG ĐÀO TẠO CAO HỌC VÀ NGHIÊN CỨU SINH LĨNH VỰC HỆ THỐNG THÔNG TIN VÀ THƯƠNG MẠI ĐIỆN TỬ”\n\nLink đăng ký: https://forms.gle/6tc8XkD8AWCtQf496\nHạn đăng ký: 19/03/2026\nThông tin chi tiết xem tại: https://link.uel.edu.vn/hEixSa\n\n🌎 Thị trường đang thay đổi nhanh hơn bất kỳ ai có thể dự đoán. Trí tuệ nhân tạo, dữ liệu lớn và thương mại điện tử không còn là những khái niệm xa vời - chúng đang hiện diện trong từng quyết định kinh doanh, từng quy trình vận hành và từng trải nghiệm người dùng mỗi ngày.\n\n⁉️ Sự chuyển dịch đó đặt ra những câu hỏi lớn cho các nhà quản lý, các chuyên gia công nghệ và đặc biệt là những người đang theo đuổi con đường nghiên cứu chuyên sâu: Làm thế nào để giải quyết các bài toán thực tiễn bằng những phương pháp nghiên cứu hiện đại nhất?`,
    link: 'https://forms.gle/6tc8XkD8AWCtQf496'
  },
  {
    id: 104,
    image: rect64,
    date: '12.05.2026',
    title: 'Lễ Tốt nghiệp 2026 Khoa Hệ thống thông tin',
    desc: 'Ngày hội vinh danh những tân khoa xuất sắc đã hoàn thành chặng đường học tập tại Khoa HTTT. Đây cũng là dịp để cộng đồng Alumni chào đón những thành viên mới gia nhập mạng lưới.'
  }
];

const News = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam === 'events' ? 'events' : 'news');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    history.push(`/news?tab=${tab}`);
  };

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
  };

  const featured = activeTab === 'news' ? NEWS_ITEMS[0] : EVENT_ITEMS[0];
  const gridItems = activeTab === 'news' ? NEWS_ITEMS.slice(1) : EVENT_ITEMS;

  return (
    <div className="news-page">
      {/* Hero Banner */}
      <section className="news-hero-banner">
        <img src={rect119} alt="News hero" className="news-hero-img" />
        <div className="news-hero-overlay" />
        <div className="news-hero-text">
          <h1>TIN TỨC & SỰ KIỆN</h1>
          <p className="news-breadcrumb">
            <Link to="/">Trang Chủ</Link>
            <span> &gt; </span>
            <span>{activeTab === 'news' ? 'Tin tức' : 'Sự kiện'}</span>
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="news-tabs-section">
        <div className="news-tabs">
          <button
            className={`news-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => handleTabChange('news')}
          >
            TIN TỨC
          </button>
          <button
            className={`news-tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            SỰ KIỆN
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="news-content-section">
        {activeTab === 'news' ? (
          <>
            {/* Featured Card for News */}
            <div className="news-featured-card" onClick={(e) => handleItemClick(e, featured)}>
              <div className="news-featured-img">
                <img src={featured.image} alt={featured.title} />
                <div className="news-featured-img-overlay" />
              </div>
              <div className="news-featured-info">
                <span className="news-date-badge">{featured.date}</span>
                <h2>{featured.title}</h2>
                {featured.desc && <p>{featured.desc}</p>}
              </div>
            </div>

            {/* Grid Cards for News */}
            <div className="news-grid-cards">
              {gridItems.map((item) => (
                <div key={item.id} className="news-grid-card" onClick={(e) => handleItemClick(e, item)}>
                  <div className="news-grid-card-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-grid-card-body">
                    <span className="news-card-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    {item.subtitle && <p className="news-card-subtitle">{item.subtitle}</p>}
                    {item.desc && <p className="news-card-desc">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="events-main-layout">
            <h2 className="section-title-center">SỰ KIỆN</h2>
            
            <div className="events-container">
              {/* Left Column: Events List */}
              <div className="events-list">
                {EVENT_ITEMS.map((event) => {
                  const [day, month, year] = event.date.split('.');
                  return (
                    <div key={event.id} className="event-row-card" onClick={(e) => handleItemClick(e, event)}>
                      <div className="event-row-img">
                        <img src={event.image} alt={event.title} />
                      </div>
                      <div className="event-row-content">
                        <div className="event-date-box">
                          <span className="day-month">{day}/{month}</span>
                          <span className="year">{year}</span>
                        </div>
                        <div className="event-text">
                          <span className="event-label">Sự kiện</span>
                          <h3>{event.title}</h3>
                          <p className="event-row-desc">{event.desc}</p>
                          <button className="event-btn">Xem chi tiết</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Calendar Sidebar */}
              <div className="events-sidebar">
                <CalendarWidget />
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="news-pagination">
          <button className="page-btn disabled">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <span className="page-dots">...</span>
          <button className="page-btn">117</button>
          <button className="page-btn">&gt;</button>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

const ItemDetailModal = ({ item, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="news-modal-close" onClick={onClose}>✕</button>
        <div className="news-modal-scroll">
          <div className="news-modal-img">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="news-modal-body">
            <span className="news-modal-date">{item.date}</span>
            <h2 className="news-modal-title">{item.title}</h2>
            {item.subtitle && <h4 className="news-modal-subtitle">{item.subtitle}</h4>}
            <div className="news-modal-text">
              {item.fullText ? (
                item.fullText.split('\n').map((para, i) => (
                  para.trim() ? <p key={i}>{para}</p> : <br key={i} />
                ))
              ) : (
                <p>{item.desc}</p>
              )}
            </div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-modal-link">
                Đăng ký ngay
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarWidget = () => {
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dates = [
    26, 27, 28, 29, 30, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, 1, 2, 3, 4, 5, 6
  ];

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <h3>Tháng 5, 2026</h3>
        <div className="calendar-nav">
          <span>&lt;</span>
          <span>&gt;</span>
        </div>
      </div>
      <div className="calendar-grid">
        {days.map(d => <div key={d} className="calendar-day-label">{d}</div>)}
        {dates.map((d, i) => (
          <div key={i} className={`calendar-date ${d === 9 ? 'highlight' : ''} ${i < 5 || i > 35 ? 'dim' : ''}`}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
