<?php
/**
 * Template Name: Mentor App (Full WordPress Integrated)
 * Description: Tích hợp hoàn toàn ứng dụng MentorXMentee vào giao diện WordPress (giữ nguyên Header, Menu và Footer của Theme WordPress).
 */

get_header(); ?>

<!-- Vùng nhúng ứng dụng React tương thích hoàn toàn với Theme WordPress -->
<div id="mentor-app-wrapper" class="entry-content mentor-app-wp-container" style="width: 100%; min-height: 80vh; padding: 20px 0;">
    <!-- Tự động nạp Font Roboto Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    
    <!-- Tự động nạp CSS chính của ứng dụng -->
    <link rel="stylesheet" href="<?php echo get_site_url(); ?>/mentor-app/static/css/main.css">
    
    <style>
        * { font-family: 'Roboto', sans-serif !important; }
        #mentor-app-wrapper #app {
            width: 100%;
            min-height: 600px;
        }
    </style>

    <!-- Thẻ div root để React render ứng dụng vào -->
    <div id="app"></div>

    <!-- Tự động nạp JavaScript Bundle của ứng dụng -->
    <script defer src="<?php echo get_site_url(); ?>/mentor-app/static/js/main.js"></script>
</div>

<?php
get_footer();
