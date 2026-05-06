import { UserProfile, Mentor, Mentee, Milestone, Season, ForumPost, MentorshipMatch } from './types';

export const USERS = [
  {
    id: 'user-a',
    full_name: 'Trần Văn A',
    email: 'a@uel.edu.vn',
    password: '123',
    roles: ['alumnus', 'mentor'],
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    role: 'alumnus',
    career_track: 'Senior Software Engineer @ Google',
    industry: 'Công nghệ thông tin',
    years_experience: 8,
    phone: '0901 234 567',
    bio: 'Cựu sinh viên K60, chuyên ngành Hệ thống thông tin. Hiện đang là Senior Software Engineer tại Google (Singapore). Với hơn 8 năm kinh nghiệm trong việc xây dựng hệ thống quy mô lớn, tôi mong muốn chia sẻ tư duy lập trình và lộ trình phát triển sự nghiệp tại các tập đoàn đa quốc gia cho thế hệ đàn em UEL.',
    experience_list: [
      {
        company: 'Google Singapore',
        position: 'Senior Software Engineer',
        period: '2021 - Hiện tại',
        description: 'Phụ trách phát triển hạ tầng backend cho Google Cloud, tối ưu hóa hiệu suất hệ thống phân tán.'
      },
      {
        company: 'Shopee Vietnam',
        position: 'Software Engineer Lead',
        period: '2018 - 2021',
        description: 'Dẫn dắt đội ngũ 10 người phát triển hệ thống thanh toán, xử lý hàng triệu giao dịch mỗi ngày.'
      },
      {
        company: 'FPT Software',
        position: 'Software Developer',
        period: '2016 - 2018',
        description: 'Tham gia các dự án outsource cho thị trường Nhật Bản, sử dụng Java và Spring Boot.'
      }
    ],
    activity_list: [
      {
        type: 'post',
        title: 'Chia sẻ lộ trình trở thành Engineer tại Big Tech',
        date: '25/04/2026',
        description: 'Bài viết thu hút hơn 124 lượt thích và 18 thảo luận trên diễn đàn.'
      },
      {
        type: 'mentor',
        title: 'Mentoring Season 1 - Spring 2026',
        date: '01/02/2026',
        description: 'Đang dẫn dắt 2 mentees đạt kết quả xuất sắc trong học kỳ này.'
      },
      {
        type: 'award',
        title: 'Alumni Cống Hiến Xuất Sắc 2025',
        date: '20/11/2025',
        description: 'Được vinh danh vì những đóng góp tích cực cho quỹ học bổng UEL.'
      }
    ],
    linkedin_url: 'https://linkedin.com/in/tranvana-google',
    skills: ['System Architecture', 'Cloud Computing', 'Mentoring', 'Java/Go', 'Product Mindset'],
    is_mentor_approved: true,
    applied_to_be_mentor: true,
  },
  {
    id: 'user-b',
    full_name: 'Lê Thị B',
    email: 'b@uel.edu.vn',
    password: '123',
    roles: ['alumnus'],
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    role: 'alumnus',
    career_track: 'Alumnus - Marketing Manager @ Unilever',
    industry: 'Marketing & FMCG',
    years_experience: 5,
    phone: '0912 333 444',
    bio: 'Đam mê xây dựng thương hiệu và kết nối cộng đồng Alumni UEL. Hiện đang phụ trách mảng chiến lược thương hiệu cho các dòng sản phẩm tiêu dùng nhanh.',
    linkedin_url: 'https://linkedin.com/in/lethib',
    skills: ['Branding', 'Digital Marketing', 'Market Research'],
    is_mentor_approved: false,
    applied_to_be_mentor: false,
  }
];

export const getLoggedInUser = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('logged_in_user');
    if (saved) return JSON.parse(saved);
  }
  return null; // Return null if not logged in
};

export const updateUserProfile = (updatedData: Partial<UserProfile>) => {
  if (typeof window !== 'undefined') {
    const currentUser = getLoggedInUser();
    const newUser = { ...currentUser, ...updatedData };
    localStorage.setItem('logged_in_user', JSON.stringify(newUser));
    
    // Also update in USERS list for immediate reflecting in other views
    const index = USERS.findIndex(u => u.id === newUser.id);
    if (index !== -1) {
      USERS[index] = newUser;
    }
    
    return newUser;
  }
  return null;
};

/**
 * Ghi nhận một hoạt động mới vào hồ sơ người dùng
 */
export const logUserActivity = (activity: { type: 'post' | 'mentor' | 'award', title: string, description: string }) => {
  const currentUser = getLoggedInUser();
  if (currentUser) {
    const newActivity = {
      ...activity,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    const updatedActivities = [newActivity, ...(currentUser.activity_list || [])];
    updateUserProfile({ activity_list: updatedActivities });
  }
};

export const CURRENT_USER = USERS[0];

export const CAREER_TRACKS = [
  'Vận hành sàn TMĐT',
  'Phân tích chiến lược TMĐT',
  'Business Analyst (BA)',
  'Tư vấn triển khai ERP',
  'Phân tích dữ liệu',
  'Xây dựng ứng dụng',
  'Tester',
  'IT Audit'
];

export const EDUCATION_LEVELS = [
  'Năm 1',
  'Năm 2',
  'Năm 3',
  'Năm 4'
];

export const MENTEES: Mentee[] = [
  {
    id: 'mentee-1',
    full_name: 'Nguyễn Văn B',
    education_level: 'Năm 3',
    goals: 'Muốn học về quy trình vận hành E-commerce và quản lý chuỗi cung ứng tại các sàn lớn như Shopee, Lazada.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_NguyenVanB_BA_Intern.pdf',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    career_track: 'Vận hành sàn TMĐT',
    health_score: 85,
    skills_assessment: [
      { skill: 'Data Analysis', score: 7, category: 'technical' },
      { skill: 'Communication', score: 8, category: 'soft' },
      { skill: 'E-commerce Ops', score: 5, category: 'business' },
      { skill: 'Problem Solving', score: 6, category: 'soft' },
      { skill: 'SQL', score: 4, category: 'technical' },
    ]
  },
  {
    id: 'mentee-3',
    full_name: 'Phạm Minh D',
    education_level: 'Năm 4',
    goals: 'Tìm hiểu sâu về Data Analysis, SQL và kỹ năng trực quan hóa dữ liệu bằng Power BI.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_PhamMinhD_Marketing.pdf',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    career_track: 'Phân tích dữ liệu'
  },
  {
    id: 'mentee-4',
    full_name: 'Hoàng Thu Thủy',
    education_level: 'Năm 2',
    goals: 'Đam mê lập trình và muốn xây dựng ứng dụng di động cho thị trường Việt Nam.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_HoangThuThuy_Dev.pdf',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    career_track: 'Xây dựng ứng dụng'
  },
  {
    id: 'mentee-5',
    full_name: 'Đặng Minh Khôi',
    education_level: 'Năm 4',
    goals: 'Muốn theo đuổi mảng IT Audit và bảo mật hệ thống thông tin doanh nghiệp.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_DangMinhKhoi_Audit.pdf',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    career_track: 'IT Audit'
  },
  {
    id: 'mentee-6',
    full_name: 'Nguyễn Thị Lan Anh',
    education_level: 'Năm 3',
    goals: 'Mong muốn tìm hiểu về quy trình Tester và đảm bảo chất lượng phần mềm trong các dự án Fintech.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_LanAnh_Tester.pdf',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LanAnh',
    career_track: 'Tester'
  },
  {
    id: 'mentee-7',
    full_name: 'Trần Minh Quang',
    education_level: 'Năm 2',
    goals: 'Em muốn học cách xây dựng hệ thống ERP và hiểu về quy trình nghiệp vụ trong doanh nghiệp lớn.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_MinhQuang_ERP.pdf',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quang',
    career_track: 'Tư vấn triển khai ERP'
  },
  {
    id: 'mentee-8',
    full_name: 'Vũ Thùy Linh',
    education_level: 'Năm 4',
    goals: 'Định hướng làm về Phân tích chiến lược TMĐT, tối ưu hóa doanh thu và trải nghiệm người dùng.',
    cv_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    cv_filename: 'CV_ThuyLinh_Strategy.pdf',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh',
    career_track: 'Phân tích chiến lược TMĐT'
  }
];

export const SEASONS: Season[] = [
  {
    id: 'season-1',
    name: 'Spring 2026',
    start_date: '2026-01-01',
    end_date: '2026-06-30',
    is_active: true,
  },
  {
    id: 'season-2',
    name: 'Fall 2026',
    start_date: '2026-07-01',
    end_date: '2026-12-31',
    is_active: false,
  },
];

export const MENTORS: Mentor[] = [
  {
    id: 'user-a',
    capacity: 3,
    active_mentees: 2,
    career_track: ['Software Engineering', 'System Architecture'],
    skills: ['Java', 'Cloud', 'System Design'],
    is_intake_open: true,
  },
];

export const EVENTS = [
  {
    id: 'ev-1',
    title: 'AI in E-commerce Workshop',
    date: '28 Tháng 4, 2026',
    time: '10:00',
    type: 'Chuyên môn',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    description: 'Tìm hiểu cách AI đang thay đổi bộ mặt của TMĐT năm 2026.'
  },
  {
    id: 'ev-2',
    title: 'Networking Night 2026',
    date: '05 Tháng 5, 2026',
    time: '18:30',
    type: 'Kết nối',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    description: 'Đêm tiệc kết nối giữa các thế hệ cựu sinh viên và sinh viên.'
  },
  {
    id: 'ev-3',
    title: 'Soft Skills for Managers',
    date: '12 Tháng 5, 2026',
    time: '14:00',
    type: 'Kỹ năng',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    description: 'Khóa học ngắn về kỹ năng quản lý dành cho các Mentor mới.'
  },
  {
    id: 'ev-become-mentor',
    title: 'Trở thành Mentor của UEL',
    date: 'Season 2026',
    time: 'Open',
    type: 'CƠ HỘI',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200',
    description: 'Chia sẻ kiến thức, dẫn dắt thế hệ đàn em và xây dựng cộng đồng Alumni vững mạnh.',
    isSpecial: true,
    link: '/dashboard/become-mentor'
  }
];

export const COMMUNITY_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Lê Hoàng Nam',
    action: 'vừa trả lời bài viết',
    target: 'Làm thế nào để bắt đầu với E-commerce?',
    time: '5 phút trước',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    link: '/dashboard/forum/post-1'
  },
  {
    id: 'act-2',
    user: 'Nguyễn Thị Thu',
    action: 'đã đăng ký season mới',
    target: 'Fall 2026',
    time: '2 giờ trước',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thu'
  },
  {
    id: 'act-3',
    user: 'Phạm Minh Đức',
    action: 'đã hoàn thành buổi mentoring với',
    target: 'Trần Văn B',
    time: '4 giờ trước',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc'
  }
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author_id: 'user-a',
    title: 'Làm thế nào để bắt đầu với E-commerce?',
    content: 'Kinh nghiệm của tôi sau 5 năm làm việc tại Shopee. Điều quan trọng nhất không phải là công nghệ, mà là sự thấu hiểu khách hàng và chuỗi cung ứng...',
    tags: ['E-commerce', 'Career'],
    category: 'Chia sẻ kinh nghiệm',
    created_at: '2026-04-25T10:00:00Z',
    likes: 124,
    replies_count: 18,
    edit_history: [
      { content: 'Làm thế nào để bắt đầu với E-commerce? (Bản nháp)', edited_at: '2026-04-25T09:30:00Z' },
      { content: 'Kinh nghiệm 5 năm làm Shopee...', edited_at: '2026-04-25T10:00:00Z' }
    ]
  },
  {
    id: 'post-2',
    author_id: 'mentor-2',
    title: 'Lộ trình học Data Analysis cho người mới bắt đầu',
    content: 'Nhiều bạn hỏi tôi về SQL hay Python trước. Thực tế, tư duy logic và kỹ năng đặt câu hỏi mới là thứ quyết định...',
    tags: ['Data Analyst', 'Skills'],
    category: 'Hướng dẫn học tập',
    created_at: '2026-04-26T08:30:00Z',
    likes: 85,
    replies_count: 12,
  },
  {
    id: 'post-3',
    author_id: 'mentor-1',
    title: 'Cơ hội nghề nghiệp trong mảng IT Audit năm 2026',
    content: 'Thị trường đang rất khát nhân lực mảng bảo mật và kiểm toán hệ thống. Đây là một ngách rất tiềm năng cho các bạn sinh viên K62-K63...',
    tags: ['IT Audit', 'Career'],
    category: 'Việc làm & Tuyển dụng',
    created_at: '2026-04-24T15:20:00Z',
    likes: 42,
    replies_count: 5,
  },
  {
    id: 'post-4',
    author_id: 'mentor-3',
    title: 'Tại sao Business Analyst cần hiểu về ERP?',
    content: 'Hầu hết các doanh nghiệp lớn hiện nay đều sử dụng hệ thống quản trị nguồn lực SAP hoặc Oracle...',
    tags: ['BA', 'ERP'],
    category: 'Kiến thức chuyên ngành',
    created_at: '2026-04-20T09:00:00Z',
    likes: 210,
    replies_count: 45,
  },
  {
    id: 'guide-mentor',
    author_id: 'mentor-1',
    title: 'Quy trình dành cho Mentor',
    content: `
# QUY TRÌNH HƯỚNG DẪN DÀNH CHO MENTOR (SEASON 2026)

Chào mừng bạn đồng hành cùng cộng đồng Alumni UEL. Để đảm bảo chất lượng Mentoring, vui lòng tuân thủ quy trình 4 giai đoạn dưới đây:

### 🚀 Giai đoạn 1: Chuẩn bị & Kết nối (Tuần 1-2)
*   **Hoàn thiện Profile:** Cập nhật kỹ năng chuyên môn và kinh nghiệm làm việc để Mentee dễ dàng tìm thấy bạn.
*   **Duyệt đơn đăng ký:** Kiểm tra mục "Applications" để xem danh sách sinh viên muốn kết nối. Bạn nên ưu tiên những bạn có mục tiêu phù hợp với thế mạnh của mình.
*   **Buổi gặp mặt đầu tiên (Kick-off):** Thiết lập sự tin tưởng và thống nhất cách thức liên lạc.

### 🎯 Giai đoạn 2: Thiết lập mục tiêu (Tuần 3-4)
*   **Xác định OKRs:** Mentor cùng Mentee thảo luận để đưa ra ít nhất 3 mục tiêu cụ thể (ví dụ: Hoàn thiện kỹ năng SQL, Sửa CV, Mock Interview).
*   **Xây dựng Roadmap:** Sử dụng công cụ "Interactive Roadmap" trên Portal để phân chia các mốc thời gian (Milestones).

### 📝 Giai đoạn 3: Thực hiện & Theo dõi (Hàng tháng)
*   **Duy trì lịch họp:** Khuyến nghị gặp mặt ít nhất 2 lần/tháng (trực tiếp hoặc online).
*   **Cập nhật nhiệm vụ (Tasks):** Giao bài tập nhỏ cho Mentee sau mỗi buổi họp để duy trì đà học tập.
*   **Ghi nhật ký buổi học:** Mentor nên dành 5 phút sau mỗi buổi để ghi lại các điểm chính (Key Takeaways).

### 🏁 Giai đoạn 4: Tổng kết & Đánh giá (Cuối Season)
*   **Báo cáo tổng kết:** Đánh giá sự tiến bộ của Mentee dựa trên Roadmap đã đề ra.
*   **Phản hồi hệ thống:** Đóng góp ý kiến để Ban điều hành cải thiện Portal trong mùa sau.
    `,
    tags: ['Quy trình', 'Mentor'],
    category: 'Hướng dẫn',
    created_at: '2026-04-01T08:00:00Z',
    likes: 150,
    replies_count: 0,
  },
  {
    id: 'guide-portal',
    author_id: 'mentor-1',
    title: 'Hướng dẫn sử dụng Portal',
    content: `
# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG MENTOR PORTAL

Hệ thống Mentor Portal 2026 tích hợp các công cụ AI và quản lý dự án để tối ưu hóa thời gian cho Mentor.

### 1. Dashboard (Bảng điều khiển)
*   **Thông tin hoạt động:** Theo dõi nhanh các thông báo từ Ban điều hành và hoạt động mới của cộng đồng.
*   **Thống kê:** Xem tổng số Mentee đang hỗ trợ, số giờ đã Mentoring và tiến độ chung của các nhóm.

### 2. Quản lý Mentee (My Mentees)
*   **Profile Detail:** Xem hồ sơ, kỹ năng và lịch sử học tập của Mentee.
*   **Roadmap:** Công cụ kéo thả để quản lý lộ trình học tập.
*   **Resource Center:** Nơi lưu trữ tài liệu dùng chung giữa Mentor và Mentee.

### 3. Quản lý Lịch hẹn (Schedule)
*   **Tạo lịch hẹn:** Chọn Mentee, thời gian và địa điểm. Hệ thống sẽ tự động gửi nhắc lịch qua email.
*   **Trạng thái buổi học:** Đánh dấu "Completed" để hệ thống ghi nhận giờ Mentoring của bạn.

### 4. Diễn đàn & Kết nối (Forum)
*   Nơi Mentor chia sẻ các bài viết chuyên môn hoặc cơ hội việc làm cho sinh viên.
*   Hệ thống phân loại theo Tag để bạn dễ dàng tìm kiếm nội dung quan tâm.
    `,
    tags: ['Hướng dẫn', 'Tech'],
    category: 'Hướng dẫn',
    created_at: '2026-04-01T08:00:00Z',
    likes: 230,
    replies_count: 0,
  },
  {
    id: 'guide-conduct',
    author_id: 'mentor-1',
    title: 'Bộ quy tắc ứng xử Alumni',
    content: `
# BỘ QUY TẮC ỨNG XỬ CỘNG ĐỒNG ALUMNI UEL

Nhằm xây dựng văn hóa Mentor-Mentee chuyên nghiệp và bền vững, tất cả thành viên cam kết thực hiện các quy tắc sau:

### 🔒 Điều 1: Tính Bảo mật
*   Mọi thông tin về dự án, chiến lược kinh doanh hoặc câu chuyện cá nhân được chia sẻ trong buổi Mentoring phải được giữ bí mật tuyệt đối.
*   Không ghi âm, ghi hình buổi học khi chưa có sự đồng ý của đối phương.

### 🤝 Điều 2: Cam kết về Thời gian
*   **Mentor:** Phản hồi tin nhắn/email của Mentee trong vòng tối đa 48 giờ làm việc.
*   **Mentee:** Thông báo hủy/dời lịch hẹn trước ít nhất 24 giờ (trừ trường hợp khẩn cấp).

### 🎓 Điều 3: Giới hạn Mối quan hệ
*   Mối quan hệ Mentoring dựa trên sự hướng dẫn kiến thức và kỹ năng.
*   Tuyệt đối không sử dụng mối quan hệ này để lôi kéo vào các hoạt động đa cấp, thương mại không chính đáng hoặc các hành vi thiếu chuẩn mực đạo đức.

### 💬 Điều 4: Văn hóa Phản hồi
*   Sử dụng ngôn từ lịch sự, mang tính xây dựng.
*   Tập trung vào vấn đề và giải pháp, không công kích cá nhân.

*Sự tham gia của bạn đóng góp vào uy tín của mạng lưới Alumni trường Đại học Kinh tế - Luật.*
    `,
    tags: ['Quy tắc', 'Văn hóa'],
    category: 'Quy định',
    created_at: '2026-04-01T08:00:00Z',
    likes: 180,
    replies_count: 0,
  }
];

export const REPLIES = [
  {
    id: 'rep-1',
    post_id: 'post-1',
    author_id: 'mentor-2',
    content: 'Bài viết rất hữu ích! Tôi bổ sung thêm là mảng Payment Gateway cũng đang cực kỳ hot trong E-commerce.',
    created_at: '2026-04-25T11:00:00Z',
    likes: 12
  },
  {
    id: 'rep-2',
    post_id: 'post-1',
    author_id: 'mentee-1',
    content: 'Cảm ơn anh! Cho em hỏi lộ trình cho sinh viên năm 3 muốn thực tập mảng này?',
    created_at: '2026-04-25T12:30:00Z',
    likes: 5
  },
  {
    id: 'rep-3',
    post_id: 'post-1',
    author_id: 'mentor-1',
    content: 'Chào em, em nên bắt đầu bằng việc hiểu các chỉ số vận hành (GMV, NMV, Cancel Rate...) trước nhé.',
    created_at: '2026-04-25T13:00:00Z',
    likes: 8
  }
];

export const MATCHES: MentorshipMatch[] = [
  {
    id: 'match-1',
    mentor_id: 'user-a',
    mentee_id: 'mentee-1',
    status: 'active',
    applied_at: '2026-02-01T08:00:00Z',
    season_id: 'season-1',
  },
];

export const ROADMAPS: Record<string, Milestone[]> = {
  'match-1': [
    { id: 'ms-1', title: 'Hoàn thiện CV & Portfolio', description: 'Cập nhật các dự án đã tham gia vào CV.', status: 'completed', deadline: '2026-03-01', completed_at: '2026-02-28', order: 1 },
    { id: 'ms-2', title: 'Kiến thức SQL Cơ bản', description: 'Nắm vững Select, Join, Group By.', status: 'completed', deadline: '2026-03-15', completed_at: '2026-03-10', order: 2 },
    { id: 'ms-3', title: 'Mock Interview lần 1', description: 'Phỏng vấn thử vị trí Intern Ops.', status: 'in_progress', deadline: '2026-04-30', order: 3 },
    { id: 'ms-4', title: 'Thực tập tại doanh nghiệp', description: 'Bắt đầu kỳ thực tập thực tế.', status: 'pending', deadline: '2026-06-01', order: 4 },
  ]
};

export const MOCK_ACTIVE_MENTEES_DATA = [
  {
    id: 'mentee-1',
    matchId: 'MATCH-2026-001',
    progress: 65,
    sessionConfig: { total: 10, completed: 6 },
    lastSession: '2026-04-20',
    nextSession: '2026-04-28 10:00',
    tasks: [
      { id: 1, title: 'Cập nhật Resume theo template', status: 'completed', deadline: '2026-04-20', priority: 'high', eventId: '1' },
      { id: 2, title: 'Chuẩn bị 3 câu hỏi cho Mentor', status: 'pending', deadline: '2026-04-28', priority: 'medium', eventId: '1' },
      { id: 3, title: 'Đăng ký LinkedIn Premium', status: 'pending', deadline: '2026-05-01', priority: 'low' },
    ],
    history: [
      { 
        id: 1, 
        date: '2026-04-10', 
        topic: 'Giới thiệu lộ trình', 
        duration: '60 min', 
        outcome: 'Nắm vững roadmap', 
        type: 'Meeting',
        journal: {
          reflection: 'Buổi đầu tiên rất bổ ích, anh Mentor đã giúp em hiểu rõ các bước cần đi.',
          key_takeaways: ['Hiểu về Roadmap', 'Biết cách tối ưu LinkedIn'],
          next_steps: 'Cập nhật lại Profile LinkedIn',
          mentee_mood: 'inspired'
        }
      },
      { 
        id: 2, 
        date: '2026-04-15', 
        topic: 'Review CV bản thảo', 
        duration: '45 min', 
        outcome: 'CV đã sẵn sàng cho intern', 
        type: 'Review',
        journal: {
          reflection: 'CV của em còn nhiều lỗi trình bày, anh đã sửa rất kỹ?',
          key_takeaways: ['Action Verbs in CV', 'Quantifying results'],
          next_steps: 'Gửi CV cho 3 công ty mục tiêu',
          mentee_mood: 'happy'
        }
      },
    ],
    resources: [
      { id: 'folder-1', name: 'Tài liệu hướng dẫn', type: 'folder', author: 'Mentor', uploadedAt: '2026-04-10', parentId: null },
      { id: 'folder-2', name: 'Bài tập & Project', type: 'folder', author: 'Mentor', uploadedAt: '2026-04-10', parentId: null },
      { id: 'folder-3', name: 'CV & Portfolio', type: 'folder', author: 'Mentor', uploadedAt: '2026-04-10', parentId: null },
      { id: 'doc-1', name: 'Roadmap_BA_2026.pdf', type: 'file', fileType: 'pdf', size: '1.2MB', uploadedAt: '2026-04-10', author: 'Mentor', parentId: 'folder-1', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 'doc-2', name: 'SQL_Practice_Set.zip', type: 'file', fileType: 'zip', size: '4.5MB', uploadedAt: '2026-04-15', author: 'Mentee', parentId: 'folder-2', url: '#' },
    ]
  },
];

export const NETWORK_METRICS = {
  totalAlumni: '15,000+',
  activeMentors: '500+',
  menteesSupported: '2,500+',
  jobOpportunities: '120+'
};

export const NEWS_ITEMS = [
  {
    id: 'news-1',
    title: 'Nâng cao năng lực số cho tân cử nhân: Lớp học Ứng dụng AI',
    date: '19/04/2026',
    category: 'CUỘC SỐNG UEL ALUMNI',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    description: 'UEL Alumni phối hợp cùng trung tâm CNTT tổ chức lớp học Ứng dụng AI trong học tập và công việc.'
  },
  {
    id: 'news-2',
    title: '[CLB BÓNG ĐÁ UEL ALUMNI] Trận Giao Hữu Đầu Tiên',
    date: '18/04/2026',
    category: 'THỂ THAO',
    image: 'https://images.unsplash.com/photo-1518605368461-1e12d18cb013?auto=format&fit=crop&q=80&w=800',
    description: 'Nơi kết nối các thế hệ trên sân cỏ, trận giao hữu đầu tiên đã diễn ra thành công tốt đẹp.'
  },
  {
    id: 'news-3',
    title: 'Trang bị hành trang nghề nghiệp cho tân cử nhân',
    date: '28/03/2026',
    category: 'HƯỚNG NGHIỆP',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    description: 'Lớp học Xây dựng hồ sơ nghề nghiệp & Kỹ năng trả lời phỏng vấn dành cho các bạn sinh viên năm cuối.'
  }
];

export const SPOTLIGHT_ALUMNI = [
  {
    id: 'alumni-1',
    name: 'Nguyễn Văn A',
    batch: 'Khóa 15',
    role: 'Giám đốc Marketing @ Techcombank',
    quote: '"Thành công không phải là đích đến, mà là hành trình bạn tạo ra giá trị cho cộng đồng."',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'alumni-2',
    name: 'Trần Thị B',
    batch: 'Khóa 12',
    role: 'Founder & CEO @ Startup Viet',
    quote: '"UEL không chỉ cho tôi kiến thức, mà còn là một gia đình thứ hai."',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'alumni-3',
    name: 'Lê Hoàng C',
    batch: 'Khóa 18',
    role: 'Senior Product Manager @ Shopee',
    quote: '"Mentoring là cách tốt nhất để trả lại cho thế hệ sau những gì mình đã nhận được."',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  }
];
