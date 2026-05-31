<style>
    :root {
        --ambienteLocale: <?php echo $ambienteLocale ? 'true' : 'false'; ?>;
        --dominioIcomoon: '<?php echo $dominioIcomoon; ?>';
        --dominio: '<?php echo $dominio; ?>';
    }
</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/>
    <meta http-equiv="cache-control" content="max-age=0"/>
    <meta http-equiv="cache-control" content="no-cache"/>
    <meta http-equiv="expires" content="0"/>
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>
    <meta http-equiv="pragma" content="no-cache"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="<?php echo $dominio; ?>assets/css/style.css?v=<?php echo time(); ?>"/>

    <!-- fontawesome -->
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/fontawesome.css" rel="stylesheet"/>
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/brands.css" rel="stylesheet"/>
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/solid.css" rel="stylesheet"/>
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/sharp-thin.css" rel="stylesheet"/>
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/sharp-duotone-thin.css" rel="stylesheet"/>

    <!-- tiny slider -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css">

    <!--[if (lt IE 9)]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.helper.ie8.js"></script>
    <![endif]-->

    <!-- start favicon -->
    <link rel="icon" type="image/png" href=" assets/images/favicon/favicon-96x96.png" sizes="96x96"/>
    <link rel="icon" type="image/svg+xml" href="<?php echo $dominio; ?>assets/images/favicon/favicon.svg"/>
    <link rel="shortcut icon" href="<?php echo $dominio; ?>assets/images/favicon/favicon.ico"/>
    <link rel="apple-touch-icon" sizes="180x180"
          href="<?php echo $dominio; ?>assets/images/favicon/apple-touch-icon.png"/>
    <meta name="apple-mobile-web-app-title" content="SottoRadice"/>
    <link rel="manifest" href="<?php echo $dominio; ?>assets/images/favicon/site.webmanifest"/>
    <!-- end favicon -->


    <?php
    global $title;
    global $desc;
    global $keywords;
    global $ogImage;
    ?>

    <meta name="title" content="<?php echo isset($title) ? $title : "Sottoradice, la matematica fatta da noi."; ?>">
    <meta name="description"
          content="<?php echo isset($desc) ? $desc : "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica."; ?>">
    <meta name="keywords"
          content="<?php echo isset($keywords) ? $keywords : "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici"; ?>">


    <meta itemprop="name" content="Sottoradice, la matematica fatta da noi">
    <meta itemprop="description"
          content="<?php echo isset($desc) ? $desc : "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica."; ?>">


    <meta name="twitter:card" content="summary">
    <meta name="twitter:description"
          content="<?php echo isset($desc) ? $desc : "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica."; ?>">
    <meta name="twitter:image"
          content="<?php echo isset($ogImage) ? $ogImage : "$dominio assets/images/og-home.jpg"; ?>">

    <meta name="twitter:site" content="@MonsDiBruno">

    <meta name="twitter:title"
          content="<?php echo isset($title) ? $title : "Sottoradice, la matematica fatta da noi."; ?>">

    <meta property="og:description"
          content="<?php echo isset($desc) ? $desc : "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica."; ?>">
    <meta property="og:image"
          content="<?php echo isset($ogImage) ? $ogImage : "$dominio assets/images/og-home.jpg"; ?>">
    <meta property="og:locale" content="it_IT">
    <meta property="og:site_name" content="Sottoradice, la matematica fatta da noi.">
    <meta property="og:title"
          content="<?php echo isset($title) ? $title : "Sottoradice, la matematica fatta da noi."; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url"
          content="<?php echo $ogUrl ?? ('https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']); ?>">
    <script src="https://kit.fontawesome.com/3aa3ed91dd.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">


    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>


    <title><?php echo isset($title) ? $title : "Sottoradice, la matematica fatta da noi."; ?></title>


    <?php if ($_SERVER['SERVER_NAME'] !== 'localhost') : ?>


        <script type="text/javascript">
            var _iub = _iub || [];
            _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"cookiePolicyInOtherWindow":true,"floatingPreferencesButtonDisplay":"anchored-center-left","perPurposeConsent":true,"siteId":4550094,"storage":{"useSiteId":true},"whitelabel":false,"cookiePolicyId":97615000,"banner":{"acceptButtonColor":"#28A745","acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonColor":"#464646","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":"https://sottoradice.altervista.org/assets/images/full-logo-white.svg","position":"float-bottom-right","rejectButtonColor":"#28A745","rejectButtonDisplay":true,"showTitle":false}};
            _iub.csLangConfiguration = {"it":{"cookiePolicyId":97615000}};
        </script>
        <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4550094.js"></script>
        <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>



    <?php endif ?>
</head>

