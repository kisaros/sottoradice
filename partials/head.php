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
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/brands.css" rel="stylesheet" />
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/solid.css" rel="stylesheet" />
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/sharp-thin.css" rel="stylesheet" />
    <link href="<?php echo $dominio; ?>assets/fontawesome/css/sharp-duotone-thin.css" rel="stylesheet" />

    <!-- tiny slider -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css">

    <!--[if (lt IE 9)]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.helper.ie8.js"></script>
    <![endif]-->

    <!-- start favicon -->
    <link rel="icon" type="image/png" href="<?php echo $dominio; ?>assets/images/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="<?php echo $dominio; ?>assets/images/favicon/favicon.svg" />
    <link rel="shortcut icon" href="<?php echo $dominio; ?>assets/images/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $dominio; ?>assets/images/favicon/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="SottoRadice" />
    <link rel="manifest" href="<?php echo $dominio; ?>assets/images/favicon/site.webmanifest" />
    <!-- end favicon -->


    <?php
    global $title;
    global $desc;
    global $keywords;
    global $ogImage;
    ?>

    <meta name="title" content="<?php echo isset($title) ? $title : "Effatà, per aprirsi all'ascolto della Parola"; ?>">
    <meta name="description"
          content="<?php echo isset($desc) ? $desc : "Leggi il commento al Vangelo del giorno e scritti teologici su Effatà, a cura di Mons. Costantino Di Bruno"; ?>">
    <meta name="keywords"
          content="<?php echo isset($keywords) ? $keywords : "Effatà, DiBruno, Parola, Vangelo del giorno, teologia, fede"; ?>">


    <meta itemprop="name" content="Effatà - Pensieri quotidiani di Mons. Costantino Di Bruno">
    <meta itemprop="description"
          content="<?php echo isset($desc) ? $desc : "Leggi il commento al Vangelo del giorno e scritti teologici su Effatà, a cura di Mons. Costantino Di Bruno"; ?>">


    <meta name="twitter:card" content="summary">
    <meta name="twitter:description"
          content="<?php echo isset($desc) ? $desc : "Leggi il commento al Vangelo del giorno e scritti teologici su Effatà, a cura di Mons. Costantino Di Bruno"; ?>">
    <meta name="twitter:image"
          content="<?php echo isset($ogImage) ? $ogImage : "https://effata.altervista.org/assets/images/og-home.jpg"; ?>">

    <meta name="twitter:site" content="@MonsDiBruno">

    <meta name="twitter:title"
          content="<?php echo isset($title) ? $title : "Effatà, per aprirsi all'ascolto della Parola"; ?>">

    <meta property="og:description"
          content="<?php echo isset($desc) ? $desc : "Leggi il commento al Vangelo del giorno e scritti teologici su Effatà, a cura di Mons. Costantino Di Bruno"; ?>">
    <meta property="og:image"
          content="<?php echo isset($ogImage) ? $ogImage : "https://effata.altervista.org/assets/images/og-home.jpg"; ?>">
    <meta property="og:locale" content="it_IT">
    <meta property="og:site_name" content="Effatà - Pensieri quotidiani di Mons. Costantino Di Bruno">
    <meta property="og:title"
          content="<?php echo isset($title) ? $title : "Effatà, per aprirsi all'ascolto della Parola"; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $ogUrl ?? ('https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']); ?>">
    <script src="https://kit.fontawesome.com/3aa3ed91dd.js" crossorigin="anonymous"></script>


    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>


    <title><?php echo isset($title) ? $title : "Effatà, per aprirsi all'ascolto della Parola"; ?></title>


    <?php if ($_SERVER['SERVER_NAME'] !== 'localhost') : ?>

        <script type="text/javascript">
            var _iub = _iub || [];
            _iub.csConfiguration = {
                "askConsentAtCookiePolicyUpdate": true,
                "enableRemoteConsent": true,
                "floatingPreferencesButtonDisplay": "bottom-left",
                "localConsentDomain": "effata.altervista.org",
                "perPurposeConsent": true,
                "siteId": 3101014,
                "cookiePolicyId": 77134567,
                "i18n": {"it": {"banner": {"accept_button_caption": "Accetta", "reject_button_caption": "Rifiuta"}}},
                "banner": {
                    "acceptButtonColor": "#5C5C5E",
                    "acceptButtonDisplay": true,
                    "backgroundColor": "#FFFFFF",
                    "backgroundOverlay": true,
                    "brandBackgroundColor": "#FFFFFF",
                    "brandTextColor": "#212121",
                    "closeButtonDisplay": false,
                    "customizeButtonCaptionColor": "#212121",
                    "customizeButtonColor": "#F3F3F3",
                    "customizeButtonDisplay": true,
                    "explicitWithdrawal": true,
                    "linksColor": "#212121",
                    "listPurposes": true,
                    "logo": "https://effata.altervista.org/assets/images/logo.svg",
                    "ownerName": "effata.altervista.org",
                    "position": "bottom",
                    "rejectButtonColor": "#5C5C5E",
                    "rejectButtonDisplay": true,
                    "showPurposesToggles": true,
                    "showTotalNumberOfProviders": true,
                    "textColor": "#212121"
                }
            };
            _iub.csLangConfiguration = {"it": {"cookiePolicyId": 77134567}};
        </script>
        <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/3101014.js"></script>
        <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>


        <script>
            const iubendaCSSOverride = `
        .iubenda-cs-brand img {
            background-image: url("../images/logo.svg") !important;
            background-repeat: no-repeat !important;
            height: 30px !important;
            background-size: contain !important;
        }

        @media (min-width: 768px) {
            .iubenda-cs-brand img {
                height: 42px !important;
            }
        }

        #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-brand {
            padding: 16px 0 !important;
            margin: 0 !important;
        }

        #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale {
            margin: auto !important;
            position: relative !important;
            padding: 28px !important;
        }

        @media (min-width: 575px) {
            #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale {
                width: 540px !important;
                max-width: 540px !important;
            }
        }

        @media (min-width: 768px) {
            #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale {
                width: 720px !important;
                max-width: 720px !important;
            }
        }

        @media (min-width: 992px) {
            #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale {
                width: 960px !important;
                max-width: 960px !important;
            }
        }

        @media (min-width: 1200px) {
            #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale {
                width: 1140px !important;
                max-width: 1140px !important;
            }
        }

        #iubenda-cs-banner.iubenda-cs-default .iubenda-cs-rationale .iubenda-banner-content {
            padding: 0 !important;
        }

        #iubenda-cs-banner a {
            word-break: break-word !important;
            color: #212121 !important;
            text-decoration: underline !important;
            transition: all .2s ease-in-out !important;
            opacity: .7 !important;
        }

        #iubenda-cs-banner a:hover {
            color: #212121 !important;
            opacity: 1 !important;
            text-decoration: underline !important;
        }

        #iubenda-cs-banner .iubenda-cs-content {
            background-color: white !important;
            color: #212121 !important;
            font-size: 14px !important;
            position: fixed !important;
            bottom: 0 !important;
            width: 100% !important;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1) !important;
            z-index: 1111 !important;
        }

        #iubenda-cs-banner .iubenda-cs-close-btn {
            background-color: white !important;
            color: #212121 !important;
            border-color: white !important;
            position: absolute !important;
            top: 16px !important;
            right: 28px !important;
            font-size: 24px !important;
            -webkit-appearance: media-slider !important;
        }

        #iubenda-cs-banner #iubenda-cs-title {
            font-family: "Playfair Display", serif !important;
            font-size: 20px !important;
            font-weight: 600 !important;
            margin-bottom: 16px !important;
            text-align: left !important;
            margin-top: 0 !important;
            padding-bottom: 0 !important;
        }

        #iubenda-cs-banner #iubFooterBtn {
            height: 40px !important;
            min-width: 160px !important;
            width: auto !important;
            padding: 0 26px !important;
            background-color: transparent !important;
            border: 1px solid #5C5C5E !important;
            color: #5C5C5E !important;
        }

        #iubenda-cs-banner #iubFooterBtn:hover {
            background-color: #5C5C5E !important;
            border: 1px solid #5C5C5E !important;
            color: white !important;
        }

        #iubenda-cs-banner #iubFooterBtn:hover:focus {
            color: white !important;
        }

        #iubenda-cs-banner #iubFooterBtn:focus {
            color: #5C5C5E !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group {
            display: block !important;
            justify-content: space-between !important;
            margin: 0px !important;
        }

        @media (min-width: 768px) {
            #iubenda-cs-banner .iubenda-cs-opt-group {
                display: flex !important;
            }
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-customize-btn {
            height: 40px !important;
            min-width: 160px !important;
            width: 100% !important;
            padding: 0 26px !important;
            background-color: transparent !important;
            border: 1px solid #5C5C5E !important;
            color: #5C5C5E !important;
        }

        @media (min-width: 768px) {
            #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-customize-btn {
                width: auto !important;
            }
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-customize-btn:hover {
            background-color: #5C5C5E !important;
            border: 1px solid #5C5C5E !important;
            color: white !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-customize-btn:hover:focus {
            color: white !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-customize-btn:focus {
            color: #5C5C5E !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent {
            display: flex !important;
            justify-content: space-between !important;
        }

        @media (min-width: 768px) {
            #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent {
                justify-content: flex-end !important;
            }
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-accept-btn,
        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-reject-btn {
            height: 40px !important;
            width: calc(50% - 5px) !important;
            padding: 0 26px !important;
            background-color: #5C5C5E !important;
            border: 1px solid #5C5C5E !important;
            color: white !important;
            margin-top: 10px !important;
        }

        @media (min-width: 768px) {
            #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-accept-btn,
            #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-reject-btn {
                min-width: 160px !important;
                width: auto !important;
                margin-left: 10px !important;
                margin-top: 0 !important;
            }
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-accept-btn:hover,
        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-reject-btn:hover {
            background-color: #4a4a4a !important;
            border: 1px solid #4a4a4a !important;
            color: white !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-accept-btn:focus,
        #iubenda-cs-banner .iubenda-cs-opt-group .iubenda-cs-opt-group-consent .iubenda-cs-reject-btn:focus {
            color: white !important;
        }

        #iubenda-cs-banner .iubenda-banner-content:not(.iubenda-custom-content) *,
        #iubenda-cs-banner [class*=" iub"],
        #iubenda-cs-banner [class^=iub] {
            font-family: 'Open Sans', sans-serif !important;
        }

        #iubenda-cs-banner .iubenda-granular-controls-container {
            margin: 24px 0 32px -14px !important;
            display: flex !important;
            flex-wrap: wrap !important;
            flex-shrink: 0 !important;
            --iub-granular-background: none !important;
            --iub-granular-border: none !important;
            --iub-granular-toggle-background: none !important;
        }

        #iubenda-cs-banner .iub-toggle-checkbox,
        #iubenda-iframe .iub-toggle-checkbox {
            margin-left: 24px !important;
            margin-right: 24px !important;
        }

        #iubenda-iframe * {
            font-family: 'Open Sans', sans-serif !important;
        }

        #purposes-content-container .purposes-header .purposes-header-title {
            font-family: 'Playfair Display' !important;
            font-size: 30px !important;
        }

        #iubenda-iframe.iubenda-iframe-branded .iubenda-modal-navigation-brand,
        #iubenda-iframe.iubenda-iframe-branded .purposes-header,
        #iubenda-iframe.iubenda-iframe-branded .purposes-header .iub-btn-cp,
        #iubenda-iframe.iubenda-iframe-branded .purposes-header .iub-btn-back,
        #iubenda-iframe.iubenda-iframe-branded .iub-cmp-header,
        #purposes-content-container .purposes-header,
        #iubenda-cs-banner .iubenda-cs-brand {
            background-color: #FFFFFF !important;
            color: #212121 !important;
        }

        #iubenda-cs-banner .iubenda-cs-opt-group button {
            border-radius: 0px !important;
            font-weight: 400 !important;
        }

        #iubenda-iframe #iubFooterBtnContainer button {
            background-color: #5C5C5E !important;
        }

        @media (max-width: 991px) {
            #iubenda-cs-banner.iubenda-cs-default.iubenda-cs-bottom .iubenda-granular-controls-container .granular-control-checkbox {
                flex: 1 !important;
                flex-direction: column-reverse !important;
                padding: 0px 10px 0px 0px !important;
                border: 1px solid var(--iub-granular-border) !important;
                border-right: 0 !important;
                border-top: 0 !important;
                padding-top: 0px !important;
                align-items: flex-start !important;
                display: flex !important;
                margin-left: 14px !important;
                width: auto !important;
                max-width: 120px !important;
            }
        }
    `;

            function applyIubendaCustomCSS() {
                const banner = document.getElementById("iubenda-cs-banner");
                if (banner || document.querySelector("#iubenda-cs-banner")) {
                    const style = document.createElement("style");
                    style.innerText = iubendaCSSOverride;
                    document.head.appendChild(style);
                } else {
                    setTimeout(applyIubendaCustomCSS, 300);
                }
            }

            document.addEventListener("DOMContentLoaded", applyIubendaCustomCSS);
        </script>


    <?php endif ?>
</head>

