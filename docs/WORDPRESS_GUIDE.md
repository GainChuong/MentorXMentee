# HƯỚNG DẪN ĐỒNG BỘ GIAO DIỆN UEL & NHÚNG ỨNG DỤNG REACT VÀO WORDPRESS

Tài liệu này tổng hợp toàn bộ các thay đổi giao diện đã thực hiện và hướng dẫn chi tiết cách build, cấu hình, nhúng ứng dụng React này vào bất kỳ website WordPress nào.

---

## Ⅰ. CÁC THAY ĐỔI GIAO DIỆN ĐÃ THỰC HIỆN (UEL BRANDING)

Ứng dụng đã được tinh chỉnh đồng bộ giao diện theo nhận diện thương hiệu của **Đại học Kinh tế - Luật (UEL)**:
* **Typography:** Tích hợp phông chữ chuẩn Google Font **Montserrat** (từ font-weight 300 đến 900) hiển thị tiếng Việt sắc nét.
* **Hệ màu UEL:** Thay thế toàn bộ màu gốc bằng màu Xanh dương đậm UEL (`#0f325f`, `#0a2240`) làm chủ đạo và màu Cam tươi UEL (`#f97316`) làm điểm nhấn.
* **Cải tiến Layout:**
  * Góc thẻ tin tức/sự kiện/cựu sinh viên được bo tròn mềm mại (`16px`) kèm hiệu ứng hover đổ bóng và dịch chuyển dọc mượt mà.
  * Thêm vạch kẻ đứng màu cam đậm ở phía trái tiêu đề các mục (Section Header) theo đúng phong cách UEL.
* **Sửa lỗi Dev Server:** Đã cấu hình `craco.config.js` để Webpack Dev Server phục vụ thư mục `public` tại root `/`. Khi chạy `npm run dev` ở `localhost:3000`, toàn bộ ảnh thường và ảnh nền CSS đều hiển thị chuẩn xác.

---

## Ⅱ. CẤU HÌNH TRÊN TRANG WORDPRESS ADMIN (BẮT BUỘC)

Trước khi nhúng, bạn cần điều chỉnh cài đặt trong trang quản trị WordPress để tránh lỗi điều hướng (React Router):

### Cấu hình Đường dẫn tĩnh (Permalinks)
1. Đăng nhập vào trang quản trị WordPress (`wp-admin`).
2. Nhìn vào menu bên trái, tìm mục **Cài đặt (Settings)** -> click chọn **Đường dẫn tĩnh (Permalinks)**.
3. Tại phần *Cấu hình thông thường*, tích chọn mục **Tiêu đề bài viết (Post name)**.
4. Click nút **Lưu thay đổi (Save Changes)** ở cuối trang.

---

## Ⅲ. CẤU HÌNH & BUILD DỰ ÁN REACT

### Bước 1: Cấu hình Subfolder URL tương ứng với WordPress
Bạn cần khai báo cho React biết thư mục chứa app React trên WordPress của bạn:
* *Ví dụ:* Nếu trang WordPress chạy tại local là `http://localhost/giangk244111398/` và bạn muốn app chạy tại `/mentor-app/`, thì Subfolder URL là: `/giangk244111398/mentor-app/`.
* *Ví dụ trên host thật:* Nếu website là `https://tenmiencuaban.com/` và muốn chạy app tại `/mentor-app/`, thì Subfolder URL là: `/mentor-app/`.

Chỉnh sửa Subfolder URL này ở 2 nơi sau:
1. Mở file **`package.json`**, sửa dòng `homepage` (dòng 5):
   ```json
   "homepage": "/giangk244111398/mentor-app/",
   ```
2. Mở file **`patch_build_paths.js`**, sửa biến `TARGET_PREFIX` ở đầu file tương ứng:
   ```javascript
   const TARGET_PREFIX = '/giangk244111398/mentor-app/';
   ```

### Bước 2: Build dự án
Mở terminal tại thư mục gốc của dự án React và chạy:
```bash
npm run build
```
Lệnh này biên dịch code vào thư mục `/build` và chạy script tự động vá toàn bộ đường dẫn ảnh tĩnh, logo, font chữ... trong file JS/CSS cho khớp với đường dẫn WordPress của bạn.

---

## Ⅳ. UPLOAD & NHÚNG VÀO WORDPRESS BẰNG PLUGIN (WPCode)

Hiện tại hệ thống sử dụng plugin **WPCode** để chèn ứng dụng React vào trang. Đây là các bước thao tác chi tiết:

### Bước 1: Upload thư mục Build lên WordPress
1. Mở quản lý tệp tin của WordPress (XAMPP hoặc File Manager trên Hosting).
2. Tại thư mục gốc của WordPress (nơi chứa thư mục `wp-content`, `wp-admin`...), tạo một thư mục mới tên là **`mentor-app`** (trùng với folder bạn cấu hình ở Bước 1).
3. Tải toàn bộ nội dung nằm **bên trong** thư mục `build/` của React lên thư mục `mentor-app` vừa tạo.

### Bước 2: Cài đặt Plugin WPCode trên WordPress
1. Đăng nhập vào trang quản lý WordPress (`yourdomain/wp-admin`).
2. Nhấn vào **Gói mở rộng (Plugins)** ở menu bên trái -> click chọn **Cài mới (Add New)**.
3. Tại ô tìm kiếm ở góc trên bên phải, gõ từ khóa: **`WPCode`**.
4. Tìm đúng plugin có tên **`WPCode – Insert Headers and Footers + Custom Code Snippets`** -> click vào nút **Cài đặt ngay (Install Now)**.
5. Sau khi cài xong, click nút **Kích hoạt (Activate)**.

### Bước 3: Thiết lập Code Snippet trong WPCode
1. Nhìn menu bên trái WordPress, tìm và click vào mục **Code Snippets** -> chọn **Add Snippet**.
2. Di chuột đến phần **Add Your Custom Code (New Snippet)** -> click chọn nút **Use Snippet**.
3. Thiết lập các mục sau:
   * **Tiêu đề (Title):** Nhập tên tùy ý, ví dụ: `Nhúng App MentorXMentee`.
   * **Code Type (Kiểu code):** Click vào menu thả xuống và chọn **`HTML Snippet`**.
   * **Code Preview (Ô viết code):** Dán đoạn mã HTML liên kết ứng dụng React dưới đây vào:
     ```html
     <!-- Thẻ HTML gốc để React render giao diện -->
     <div id="app"></div>

     <!-- Liên kết file CSS của React (Lưu ý kiểm tra và cập nhật mã hash .3b5ebeb9.css theo file CSS thực tế trong mentor-app/static/css) -->
     <link rel="stylesheet" href="/giangk244111398/mentor-app/static/css/main.3b5ebeb9.css">

     <!-- Liên kết file JS của React (Lưu ý kiểm tra và cập nhật mã hash .7e18508f.js theo file JS thực tế trong mentor-app/static/js) -->
     <script defer src="/giangk244111398/mentor-app/static/js/main.7e18508f.js"></script>
     ```
4. Cuộn xuống phần **Cài đặt chèn (Insertion)** bên dưới:
   * Tại mục **Insert Method** (Phương thức chèn), click chọn **`Shortcode`**.
5. Cuộn lên đầu trang:
   * Gạt công tắc bên cạnh nút Save từ **Inactive** (Chưa kích hoạt) sang **Active** (Kích hoạt).
   * Nhấn nút **Save Snippet** (Lưu Snippet).
6. Sau khi lưu, plugin sẽ hiển thị một đoạn Shortcode ở bên phải (Ví dụ: `[wpcode id="123"]`). Bạn hãy **sao chép (Copy)** đoạn Shortcode này.

### Bước 4: Tạo trang mới và nhúng Shortcode để chạy ứng dụng
1. Nhấp vào **Trang (Pages)** ở menu bên trái -> chọn **Thêm trang mới (Add New Page)**.
2. Đặt tiêu đề cho trang (Ví dụ: `mentor-app`).
3. Click vào nút **dấu cộng (+)** trong trình soạn thảo trang để thêm Block mới -> tìm kiếm và click chọn block **Shortcode**.
4. Dán đoạn mã Shortcode bạn vừa sao chép ở Bước 3 (Ví dụ: `[wpcode id="123"]`) vào ô nhập liệu của block Shortcode.
5. Click vào nút **Đăng (Publish)** ở góc trên bên phải màn hình.
6. Click vào **Xem trang (View Page)** để trải nghiệm ứng dụng React đã nhúng thành công và chạy mượt mà ngay trên WordPress của bạn!

