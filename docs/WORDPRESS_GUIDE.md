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

Chỉnh sửa cấu hình đường dẫn ở 2 nơi sau:
1. Trong file **`package.json`**, đặt giá trị `homepage` là `.` (để khi chạy local `npm run dev` không bị lỗi đường dẫn ảnh):
   ```json
   "homepage": ".",
   ```
2. Mở file **`patch_build_paths.js`**, sửa biến `TARGET_PREFIX` ở đầu file thành đường dẫn WordPress thực tế của bạn (đây là nơi script sẽ vá ảnh khi build):
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

## Ⅳ. UPLOAD & NHÚNG VÀO WORDPRESS BẰNG FILE PHP TEMPLATE (KHÔNG CẦN PLUGIN)

Phương pháp này tạo một **Page Template riêng bằng PHP** trực tiếp trong Theme của WordPress. Đây là cách làm tối ưu và chuyên nghiệp nhất, giúp ứng dụng React chạy độc lập, mượt mà và không phụ thuộc vào bất kỳ plugin bên thứ ba nào.

### Bước 1: Upload thư mục Build lên WordPress
1. Mở quản lý tệp tin của WordPress (XAMPP hoặc File Manager trên Hosting).
2. Tại thư mục gốc của WordPress (nơi chứa thư mục `wp-content`, `wp-admin`...), tạo một thư mục mới tên là **`mentor-app`** (trùng với folder bạn cấu hình ở Bước 1 của phần III).
3. Tải toàn bộ nội dung nằm **bên trong** thư mục `build/` của React lên thư mục `mentor-app` vừa tạo.

### Bước 2: Tạo file Page Template trong Theme WordPress
1. Truy cập vào thư mục giao diện (theme) đang hoạt động trên WordPress của bạn:
   * *Đường dẫn cục bộ (XAMPP):* `C:\xampp\htdocs\giangk244111398\wp-content\themes\twentytwentyfive\`
   * *Đường dẫn trên hosting:* `/wp-content/themes/tên-theme-đang-dùng/`
2. Tạo một file mới đặt tên là **`page-mentor-app.php`**.
3. Dán toàn bộ nội dung code PHP dưới đây vào file đó và lưu lại:

```php
<?php
/**
 * Template Name: Mentor App (Full React)
 * Description: Renders the React MentorXMentee app without WordPress header/footer (Blank Canvas).
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MentorXMentee - Khoa Hệ Thống Thông Tin - UEL</title>
    
    <!-- Liên kết file CSS của React (Lưu ý: Luôn kiểm tra và cập nhật mã hash .css thực tế trong thư mục mentor-app/static/css/) -->
    <link rel="stylesheet" href="/giangk244111398/mentor-app/static/css/main.3b5ebeb9.css">
    
    <style>
        /* Reset các style dư thừa của WordPress để React hiển thị tràn màn hình */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow-x: hidden; }
        #app { width: 100%; min-height: 100vh; }
    </style>
    <?php wp_head(); ?>
</head>
<body style="margin: 0; padding: 0;">
    <!-- React App sẽ render vào thẻ div này -->
    <div id="app"></div>

    <!-- Liên kết file JS của React (Lưu ý: Luôn kiểm tra và cập nhật mã hash .js thực tế trong thư mục mentor-app/static/js/) -->
    <script defer src="/giangk244111398/mentor-app/static/js/main.7e18508f.js"></script>
    
    <?php wp_footer(); ?>
</body>
</html>
```

> [!IMPORTANT]
> **Lưu ý về mã Hash (tên file):** Mỗi lần bạn chạy `npm run build`, React có thể sinh ra tên file CSS và JS với các mã hash mới (ví dụ: `main.a1b2c3d4.css`). Bạn cần kiểm tra trong thư mục `mentor-app/static/css/` và `static/js/` trên host để cập nhật tên file chính xác vào file `page-mentor-app.php` tương ứng.

### Bước 3: Kích hoạt Trang trên WordPress Admin
1. Đăng nhập vào trang quản lý WordPress (`wp-admin`).
2. Vào mục **Trang (Pages)** ở menu bên trái -> chọn **Thêm trang mới (Add New Page)**.
3. Đặt tiêu đề cho trang (Ví dụ: `mentor-app`).
4. Nhìn sang cột cấu hình bên phải:
   * Tại phần **Bản mẫu (Template)**, nhấp vào menu thả xuống và chọn **`Mentor App (Full React)`** (Đây là template do file `page-mentor-app.php` tự động đăng ký với WordPress).
5. Nhấp nút **Đăng (Publish)** ở góc trên bên phải.
6. Truy cập đường dẫn trang vừa tạo (Ví dụ: `yourdomain.com/mentor-app`) để trải nghiệm ứng dụng React hiển thị độc lập hoàn toàn, mượt mà và cực kỳ chuyên nghiệp!


