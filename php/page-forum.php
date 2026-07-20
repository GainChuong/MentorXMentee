<?php
/**
 * Template Name: Mentor Forum (Full WordPress Integrated)
 * Description: Tích hợp hoàn toàn Diễn đàn Thảo luận (Forum) vào giao diện WordPress (giữ nguyên Header, Menu và Footer của Theme WordPress).
 */

get_header(); ?>

<!-- Vùng nhúng Diễn đàn Forum tương thích hoàn toàn với Theme WordPress -->
<div id="mentor-forum-wrapper" class="entry-content mentor-forum-wp-container" style="width: 100%; min-height: 80vh; padding: 20px 0;">
    <!-- Tự động nạp CSS chính của ứng dụng -->
    <link rel="stylesheet" href="<?php echo get_site_url(); ?>/mentor-app/static/css/main.css">
    
    <style>
        #mentor-forum-wrapper #app {
            width: 100%;
            min-height: 600px;
        }
    </style>

    <!-- Thẻ div root để React render Forum vào -->
    <div id="app"></div>

    <!-- Tự động nạp JavaScript Bundle của ứng dụng -->
    <script defer src="<?php echo get_site_url(); ?>/mentor-app/static/js/main.js"></script>
</div>

<?php
get_footer();
