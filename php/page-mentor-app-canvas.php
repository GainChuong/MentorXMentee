<?php
/**
 * Template Name: Mentor App (Blank Canvas - Fullscreen)
 * Description: Hiển thị toàn màn hình độc lập hoàn toàn (không có Header và Footer của WordPress).
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MentorXMentee - Khoa Hệ Thống Thông Tin - UEL</title>
    
    <!-- Tự động nạp CSS chính của ứng dụng -->
    <link rel="stylesheet" href="<?php echo get_site_url(); ?>/mentor-app/static/css/main.css">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow-x: hidden; }
        #app { width: 100%; min-height: 100vh; }
    </style>
    <?php wp_head(); ?>
</head>
<body style="margin: 0; padding: 0;">
    <div id="app"></div>

    <!-- Tự động nạp JavaScript Bundle của ứng dụng -->
    <script defer src="<?php echo get_site_url(); ?>/mentor-app/static/js/main.js"></script>
    
    <?php wp_footer(); ?>
</body>
</html>
