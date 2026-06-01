<navbar id="navbar-full" class="navbar-full">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between w-100 position-relative py-md-3">

            <a href="<?php echo $dominioHome ?>" class="logo" title="Homepage - Sottoradice"></a>

            <!-- MENU MOBILE -->

            <!-- MENU MOBILE -->
            <div class="d-xl-none" id="menu-mobile">

                <button type="button" class="btn-menu-sr" id="srMenuOpen" aria-label="Apri menu">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <line x1="3" y1="14" x2="13" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>


            <!-- MENU DESKTOP -->

            <ul class="list-inline menu-list-inline mb-0 d-none d-xl-flex w-100 justify-content-end">
                <li class="list-inline-item">
                    <a href="<?php echo $dominioHome ?>" title="Sottoradice - Homepage" class="text-color menu-item-underline">
                        Home
                    </a>
                </li>

                <li class="list-inline-item">
                    <a href="<?php echo $dominio ?>chi-siamo.php"
                       title="Sottoradice – Chi siamo" class="text-color menu-item-underline">
                        Chi siamo
                    </a>
                </li>

                <li class="list-inline-item">
                    <a href="<?php echo $dominio ?>progetti.php" title="Sottoradice – Progetti" class="text-color menu-item-underline">
                        Progetti
                    </a>
                </li>

            </ul>

        </div>
    </div>
</navbar>


<!-- OVERLAY -->
<div class="sr-menu-overlay" id="srMenuOverlay" role="dialog" aria-modal="true" aria-label="Menu principale">

    <div class="sr-menu-top">
        <a href="<?php echo $dominioHome ?>" class="logo logo-white sr-menu-logo" title="Sottoradice - Homepage">

        </a>
        <button type="button" class="sr-menu-close" id="srMenuClose" aria-label="Chiudi menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
    </div>

    <nav class="sr-menu-links">

        <a href="<?php echo $dominioHome ?>home.php"
           title="Sottoradice – Homepage"
           class="sr-menu-link <?php echo (basename($_SERVER['PHP_SELF']) == 'home.php') ? 'sr-menu-link--active' : '' ?>">
            <div class="sr-menu-link-left">
                <span class="sr-menu-link-num">01</span>
                <span class="sr-menu-link-name">Home</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="sr-menu-link-arrow">
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <polyline points="9,4 13,8 9,12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        </a>

        <a href="<?php echo $dominio ?>chi-siamo.php"
           title="Sottoradice – Chi siamo"
           class="sr-menu-link <?php echo (basename($_SERVER['PHP_SELF']) == 'chi-siamo.php') ? 'sr-menu-link--active' : '' ?>">
            <div class="sr-menu-link-left">
                <span class="sr-menu-link-num">02</span>
                <span class="sr-menu-link-name">Chi siamo</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="sr-menu-link-arrow">
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <polyline points="9,4 13,8 9,12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        </a>

        <div class="sr-menu-link sr-menu-link--has-sub <?php echo (basename($_SERVER['PHP_SELF']) == 'progetti.php') ? 'sr-menu-link--active' : '' ?>"
             id="srProgettiToggle" role="button" tabindex="0" aria-expanded="false">
            <div class="sr-menu-link-left">
                <span class="sr-menu-link-num">03</span>
                <span class="sr-menu-link-name">Progetti</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="sr-menu-link-chevron" id="srProgettiChevron">
                <polyline points="4,6 8,10 12,6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        </div>

        <div class="sr-menu-sub" id="srMenuSub">
            <a href="<?php echo $dominio ?>progetti/scomporre-per-comprendere.php" class="sr-menu-sub-item" title="Scomporre per comprendere">
                <span class="sr-menu-sub-dot bg-primary"></span>
                <span class="sr-menu-sub-name">Scomporre per comprendere</span>
            </a>
            <a href="<?php echo $dominio ?>progetti/tombola-matematica.php" class="sr-menu-sub-item" title="Tombola matematica">
                <span class="sr-menu-sub-dot bg-success"></span>
                <span class="sr-menu-sub-name">Tombola matematica</span>
            </a>
            <a href="<?php echo $dominio ?>progetti/scuola-pitagorica.php" class="sr-menu-sub-item" title="La scuola pitagorica e √2">
                <span class="sr-menu-sub-dot bg-pink"></span>
                <span class="sr-menu-sub-name">Scuola pitagorica e √2</span>
            </a>
            <a href="<?php echo $dominio ?>progetti/pacman-3d.php" class="sr-menu-sub-item" title="Pac-Man 3D">
                <span class="sr-menu-sub-dot bg-purple"></span>
                <span class="sr-menu-sub-name">Pac-Man 3D</span>
            </a>
            <a href="<?php echo $dominio ?>progetti/super-mario.php" class="sr-menu-sub-item" title="Super Mario e i vettori">
                <span class="sr-menu-sub-dot bg-warning"></span>
                <span class="sr-menu-sub-name">Super Mario e i vettori</span>
            </a>
        </div>

    </nav>

    <div class="sr-menu-bottom">
        <div class="sr-menu-slogan">
            <span>Se sì, perché?</span>
            <span>Se no, perché?</span>
            <span class="sr-menu-slogan-accent">Motiva la risposta.</span>
        </div>
        <div class="sr-menu-bottom-links">
            <a href="https://www.iubenda.com/privacy-policy/97615000" class="sr-menu-bottom-link">Privacy</a>
            <a href="https://www.iubenda.com/privacy-policy/97615000/cookie-policy" class="sr-menu-bottom-link">Cookie</a>
            <a href="https://isradice.edu.it" title="IIS Benedetto Radice" class="sr-menu-bottom-link">IIS B. Radice</a>
        </div>
    </div>

</div>
<!-- fine overlay -->

<script>
    (function () {
        const overlay   = document.getElementById('srMenuOverlay');
        const openBtn   = document.getElementById('srMenuOpen');
        const closeBtn  = document.getElementById('srMenuClose');
        const toggle    = document.getElementById('srProgettiToggle');
        const sub       = document.getElementById('srMenuSub');
        const chevron   = document.getElementById('srProgettiChevron');

        if (!overlay || !openBtn || !closeBtn) return;

        function openMenu() {
            overlay.classList.add('sr-open');
            document.body.classList.add('sr-menu-is-open');
            closeBtn.focus();
        }

        function closeMenu() {
            overlay.classList.remove('sr-open');
            document.body.classList.remove('sr-menu-is-open');
            openBtn.focus();
        }

        openBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);

        // chiudi con tasto ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('sr-open')) {
                closeMenu();
            }
        });

        // toggle sotto-menu Progetti
        if (toggle && sub && chevron) {
            let subOpen = false;

            toggle.addEventListener('click', function () {
                subOpen = !subOpen;
                sub.classList.toggle('sr-open', subOpen);
                chevron.classList.toggle('sr-rotated', subOpen);
                toggle.setAttribute('aria-expanded', String(subOpen));
            });

            // accessibilità: invio/spazio aprono il toggle
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
            });
        }
    })();
</script>