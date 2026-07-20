# 📘 TỔNG QUAN DỰ ÁN MENTORXMENTEE (UEL HTTT)

> **Dự án:** MentorXMentee - Hệ thống Kết nối Mentorship & Diễn đàn Học thuật  
> **Đơn vị:** Khoa Hệ thống Thông tin - Trường Đại học Kinh tế - Luật (UEL)  
> **Kiến trúc:** React SPA (Single Page Application) nhúng trực tiếp vào WordPress CMS qua PHP Template.

---

## 📑 1. Cấu Trúc Tổng Thể Dự Án (Directory Tree)

```
d:\Cựu SV\
├── docs/
│   └── WORDPRESS_GUIDE.md          # Hướng dẫn chi tiết thiết lập & triển khai ứng dụng lên WordPress
├── php/
│   ├── page-mentor-app.php          # File PHP Page Template dùng nhúng ứng dụng React vào Theme WordPress
│   ├── page-mentor-app-canvas.php   # Template canvas dạng Blank dành cho giao diện tràn viền
│   └── page-forum.php               # Template PHP dự phòng dành riêng cho Diễn đàn
├── react-app/                       # Mã nguồn ứng dụng Frontend React (SPA)
│   ├── build/                       # Kết quả biên dịch (Production Build) để đưa sang WordPress
│   ├── craco.config.js              # Cấu hình tùy biến CRACO cho build system
│   ├── package.json                 # Khai báo thư viện phụ thuộc, scripts và homepage config (`.`)
│   ├── patch_build_paths.js         # Script Node.js tự động vá đường dẫn tuyệt đối/tương đối trong build
│   └── src/
│       ├── index.js                 # Điểm khởi chạy React (Entry Point), cấu hình Router & Provider
│       ├── style.css                # Style chung toàn ứng dụng (Design System Navy #0f325f & Orange #f58220)
│       ├── context/
│       │   └── UserContext.js       # State quản lý Auth session, phân quyền (Admin, Mentor, Mentee, Guest)
│       ├── components/
│       │   └── layout/
│       │       ├── Header.js / .css        # Thanh điều hướng chính của hệ thống
│       │       ├── Footer.js / .css        # Chân trang với thông tin khoa HTTT & liên hệ
│       │       ├── Layout.js / .css        # Khung bao (Wrapper Layout) cho các trang
│       │       └── MentorSubNav.js / .css  # Thanh điều hướng phụ chuyên biệt cho nhóm tính năng Mentor
│       └── pages/
│           ├── Home.js / .css             # Trang chủ giới thiệu chương trình MentorXMentee
│           ├── Forum.js / .css            # Diễn đàn thảo luận (Vector Icon SVG, Đăng bài, Bình luận, Tệp đính kèm)
│           ├── Login.js / Auth.css        # Trang đăng nhập (Hỗ trợ Google Auth & Quick Demo Login)
│           ├── Register.js                # Trang đăng ký thành viên mới
│           ├── News.js / .css             # Trang tin tức & sự kiện học thuật của Khoa
│           ├── ComingSoon.js / .css       # Trang thông báo tính năng đang nâng cấp
│           ├── NotFound.js                # Trang hiển thị khi sai đường dẫn (404)
│           └── Mentor/                    # Cụm tính năng kết nối & quản lý Mentorship
│               ├── MenteeSearch.js / .css       # Tra cứu & tìm kiếm Mentor theo kỹ năng/lĩnh vực
│               ├── MenteeProfile.js / .css      # Xem hồ sơ chi tiết Mentor & gửi yêu cầu kết nối
│               ├── MenteeProfileSelf.js / .css  # Hồ sơ cá nhân của người dùng đang đăng nhập
│               ├── MenteeApplications.js / .css # Quản lý danh sách đơn xin kết nối Mentorship
│               ├── MenteeCalendar.js / .css     # Quản lý lịch hẹn & các buổi Mentorship (Sessions)
│               ├── MenteeManage.js / .css       # Bảng điều khiển (Dashboard) quản lý dành cho Mentor
│               └── MenteeManageSlots.js / .css  # Quản lý các khung giờ trống khả dụng của Mentor
└── project_overview.md              # Tài liệu tổng quan dự án (File này)
```

---

## 🔑 2. Chi Tiết Các Tệp Tin Nòng Cốt & Vai Trò

### ⚙️ A. Nhóm Khởi Chạy & Cấu Hình Hệ Thống

| Tệp tin | Đường dẫn | Chức năng & Vai trò nòng cốt |
| :--- | :--- | :--- |
| **`index.js`** | `react-app/src/index.js` | Điểm khởi chạy chính của React. Định tuyến toàn bộ các đường dẫn (`/`, `/forum`, `/login`, `/mentor-search`,...) bằng `react-router-dom`, bọc `UserProvider` để chia sẻ thông tin người dùng. |
| **`UserContext.js`** | `react-app/src/context/UserContext.js` | Quản lý trạng thái đăng nhập, lưu trữ phiên đăng nhập (`localStorage`), phân quyền rõ ràng giữa `guest`, `mentee`, `alumni_mentor`, `admin` và cung cấp các hàm chuyển đổi role giả lập. |
| **`patch_build_paths.js`** | `react-app/patch_build_paths.js` | Script tự động chạy sau `npm run build`. Sửa đổi toàn bộ các đường dẫn tệp tĩnh (`/static/...`) thành dạng thích hợp với môi trường WordPress (`/giangk244111398/mentor-app/static/...`). |
| **`package.json`** | `react-app/package.json` | Khai báo các gói phụ thuộc (React 17, React Router 5, React Helmet), thiết lập `"homepage": "."` giúp các tài nguyên tương đối không bị lỗi 404. |

---

### 🌐 B. Nhóm Tích Hợp WordPress (WordPress Integration)

| Tệp tin | Đường dẫn | Chức năng & Vai trò nòng cốt |
| :--- | :--- | :--- |
| **`page-mentor-app.php`** | `php/page-mentor-app.php` *(Được copy sang Theme WP: `wp-content/themes/twentytwentyfive/`)* | **File Template WordPress quan trọng nhất.** Nhúng toàn bộ ứng dụng React vào một trang WordPress trắng (Blank Canvas), gọi trực tiếp các tệp CSS/JS được biên dịch từ React mà không bị dính layout mặc định của WordPress. |
| **`WORDPRESS_GUIDE.md`** | `docs/WORDPRESS_GUIDE.md` | Tài liệu hướng dẫn cách tạo Trang (Page) trên WordPress Dashboard, chọn Template "Mentor App (Full React)", và quy trình cập nhật mã Hash CSS/JS khi có bản build mới. |

---

### 💬 C. Nhóm Giao Diện & Diễn Đàn Thảo Luận (Forum Module)

| Tệp tin | Đường dẫn | Chức năng & Vai trò nòng cốt |
| :--- | :--- | :--- |
| **`Forum.js`** | `react-app/src/pages/Forum.js` | **Module Diễn đàn hoàn chỉnh.** Tích hợp hệ thống icon chuẩn **SVG Vector Line** (thay thế hoàn toàn emoji cũ), phân loại theo 5 chuyên mục (Tất cả, Thảo luận chung, Góc Mentor-Mentee, Tài liệu học tập, Cơ hội việc làm), xem chi tiết bài đăng, đăng bài mới, đính kèm file, bình luận nhiều tầng, và modal báo cáo vi phạm. |
| **`Forum.css`** | `react-app/src/pages/Forum.css` | Hệ thống Style dành riêng cho Diễn đàn: Giao diện thẻ bài viết (Card-based UI), hiệu ứng hover mượt mà, phân màu badge theo Vai trò (Mentor Navy/Gold, Admin Red, Mentee Blue), Toast thông báo và giao diện Responsive chuẩn mobile. |

---

### 🤝 D. Nhóm Quản Lý Mentorship (`src/pages/Mentor/`)

| Tệp tin | Đường dẫn | Chức năng & Vai trò nòng cốt |
| :--- | :--- | :--- |
| **`MenteeSearch.js`** | `react-app/src/pages/Mentor/MenteeSearch.js` | Trang tìm kiếm Mentor. Hỗ trợ lọc theo chuyên môn (BA, Data Analysis, Software Engineering,...), tìm kiếm theo tên và hiển thị danh sách Mentor dạng lưới. |
| **`MenteeProfile.js`** | `react-app/src/pages/Mentor/MenteeProfile.js` | Xem trang cá nhân công khai của từng Mentor: Tiểu sử, kinh nghiệm làm việc, học vấn, đánh giá từ mentee trước, và nút đăng ký kết nối Mentorship. |
| **`MenteeCalendar.js`** | `react-app/src/pages/Mentor/MenteeCalendar.js` | Giao diện quản lý lịch hẹn (Sessions). Hiển thị danh sách các buổi trao đổi sắp tới, trạng thái duyệt, liên kết phòng họp trực tuyến (Google Meet/MS Teams). |
| **`MenteeApplications.js`** | `react-app/src/pages/Mentor/MenteeApplications.js` | Bảng duyệt đơn kết nối: Cho phép Mentor xem lý do đăng ký của Mentee, chấp nhận (Approve) hoặc từ chối (Reject) đơn. |
| **`MenteeManageSlots.js`** | `react-app/src/pages/Mentor/MenteeManageSlots.js` | Cho phép Mentor mở hoặc đóng các khung thời gian rảnh trong tuần để Mentee có thể chủ động đặt lịch. |

---

### 🎨 E. Nhóm Layout & Design System

| Tệp tin | Đường dẫn | Chức năng & Vai trò nòng cốt |
| :--- | :--- | :--- |
| **`Header.js`** | `react-app/src/components/layout/Header.js` | Thanh Menu chính chứa Logo UEL, các đường dẫn chuyển trang (`Trang chủ`, `Diễn đàn`, `Tin tức`, `Tìm Mentor`), nút Đăng nhập và Avatar tài khoản. |
| **`Footer.js`** | `react-app/src/components/layout/Footer.js` | Chân trang thông tin bản quyền Khoa HTTT - UEL, liên kết mạng xã hội và địa chỉ liên hệ. |
| **`MentorSubNav.js`** | `react-app/src/components/layout/MentorSubNav.js` | Sub-menu phụ xuất hiện phía dưới Header khi truy cập vào nhóm trang Mentorship (Lịch hẹn, Quản lý đơn, Quản lý slots). |
| **`style.css`** | `react-app/src/style.css` | Định nghĩa biến CSS (CSS Variables) chuẩn nhận diện UEL: `#0f325f` (Navy Blue primary), `#f58220` (Secondary Orange), Font chữ Montserrat/Inter. |

---

## 🔄 3. Quy Trình Cập Nhật & Triển Khai (Deployment Workflow)

Khi tiến hành chỉnh sửa mã nguồn React, quy trình đưa lên môi trường WordPress thực tế như sau:

1. **Phát triển & Kiểm thử:** Chạy `npm start` tại thư mục `react-app` để xem thay đổi tại `http://localhost:3000`.
2. **Biên dịch Production Build:** 
   ```bash
   cd react-app
   npm run build
   ```
   *Lưu ý: Quá trình build sẽ tự động kích hoạt `node patch_build_paths.js` để vá lại đường dẫn tài nguyên tệp tĩnh.*
3. **Đồng bộ sang WordPress (XAMPP):**
   Copy toàn bộ thư mục `react-app/build/*` sang thư mục máy chủ WordPress: `C:\xampp\htdocs\giangk244111398\mentor-app\`.
4. **Cập nhật mã Hash trong File Template PHP:**
   Kiểm tra tên mã hash của `main.[hash].js` và `main.[hash].css` trong thư mục `build/static/`, sau đó mở file `C:\xampp\htdocs\giangk244111398\wp-content\themes\twentytwentyfive\page-mentor-app.php` để cập nhật đúng đường dẫn asset tương ứng.

---
*Tài liệu được cập nhật tự động & chuẩn hóa theo kiến trúc dự án MentorXMentee - Khoa HTTT UEL.*
