# HƯỚNG DẪN NHÚNG ỨNG DỤNG REACT VÀO WORDPRESS

---

## Bước 1: Cấu hình đường dẫn trước khi Build

Mở file **`react-app/patch_build_paths.js`**, sửa biến `TARGET_PREFIX` thành đường dẫn thực tế của bạn:

```javascript
// XAMPP local (ví dụ: http://localhost/giangk244111398/)
const TARGET_PREFIX = '/giangk244111398/mentor-app/';

// Hosting thật (ví dụ: https://tenmiencuaban.com/)
const TARGET_PREFIX = '/mentor-app/';
```

---

## Bước 2: Build dự án React

Mở terminal tại thư mục **`react-app/`** và chạy:

```bash
npm run build
```

Kết quả: thư mục **`react-app/build/`** sẽ được tạo ra, chứa toàn bộ file tĩnh đã sẵn sàng deploy.

---

## Bước 3: Upload file Build lên WordPress

### Trên XAMPP (Local)
1. Mở thư mục: `C:\xampp\htdocs\<tên-thư-mục-wordpress>\`
2. Tạo thư mục mới tên **`mentor-app`**
3. Copy toàn bộ nội dung bên trong **`react-app/build/`** vào thư mục `mentor-app` vừa tạo

### Trên Hosting
1. Vào **File Manager** hoặc dùng FTP
2. Tại thư mục gốc WordPress (cùng cấp với `wp-content/`), tạo thư mục **`mentor-app`**
3. Upload toàn bộ nội dung **`react-app/build/`** vào đó

---

## Bước 4: Thêm PHP Template vào Theme WordPress

Copy 2 file sau từ thư mục **`php/`** vào thư mục theme đang kích hoạt:

| File | Chức năng |
|------|-----------|
| `page-mentor-app.php` | Trang App chính (có Header & Footer WP) |
| `page-forum.php` | Trang Diễn đàn Forum (có Header & Footer WP) |
| `page-mentor-app-canvas.php` | Trang App tràn màn hình (không có Header/Footer) |

**Đường dẫn theme:**
- XAMPP: `C:\xampp\htdocs\<tên-wp>\wp-content\themes\<tên-theme>\`
- Hosting: `/wp-content/themes/<tên-theme>/`

---

## Bước 5: Tạo trang trên WordPress Admin

1. Vào **WP Admin** → **Trang (Pages)** → **Thêm trang mới**
2. Tạo trang **Forum**:
   - Tiêu đề: `Forum`
   - Slug: `forum`
   - Template: **Mentor Forum (Full WordPress Integrated)**
   - Bấm **Đăng (Publish)**
3. Tạo trang **Mentor App**:
   - Tiêu đề: `Mentor App`
   - Slug: `mentor-app`
   - Template: **Mentor App (Full WordPress Integrated)**
   - Bấm **Đăng (Publish)**

---

## Bước 6: Cấu hình Permalinks (Bắt buộc)

Vào **WP Admin** → **Cài đặt (Settings)** → **Đường dẫn tĩnh (Permalinks)** → Chọn **Tiêu đề bài viết (Post name)** → **Lưu thay đổi**.

> Bước này bắt buộc để React Router hoạt động đúng trên WordPress.

---

## Kết quả

Sau khi hoàn thành, ứng dụng sẽ chạy tại:
- **Forum:** `http://localhost/<tên-wp>/forum`
- **Mentor App:** `http://localhost/<tên-wp>/mentor-app`
