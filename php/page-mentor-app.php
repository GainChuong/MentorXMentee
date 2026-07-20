<?php
/**
 * Template Name: Mentor App (Full React)
 * Description: Blank canvas template that renders the React MentorXMentee app without WordPress header/footer.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/giangk244111398/mentor-app/static/css/main.6eff5aee.css">
    <style>
        /* Reset any WordPress residual styles */
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', sans-serif !important; }
        html, body { width: 100%; height: 100%; overflow-x: hidden; font-family: 'Roboto', sans-serif !important; }
        #app { width: 100%; min-height: 100vh; }
    </style>
    <?php wp_head(); ?>
</head>
<body style="margin:0;padding:0;">
    <div id="app"></div>
    <script defer src="/giangk244111398/mentor-app/static/js/main.d14fa69d.js"></script>
    <?php wp_footer(); ?>
</body>
</html>
