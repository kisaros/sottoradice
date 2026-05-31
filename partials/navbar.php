<navbar id="navbar-full" class="navbar-full">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between w-100 position-relative py-3">

            <a href="<?php echo $dominioHome ?>" class="logo z-index-1" title="Homepage - Sottoradice"></a>

            <!-- MENU MOBILE -->

            <div class="d-xl-none" id="menu-mobile">
                <button type="button" class="btn-menu fa-bars-staggered fa-solid" data-toggle="modal" data-target="#menuModal">

                </button>

                <div class="modal fade come-from-modal right  min-vh-100" id="menuModal" tabindex="-1" role="dialog"
                     aria-labelledby="menuModalLabel">
                    <div class="modal-dialog min-vh-100" role="document">
                        <div class="modal-content bg-footer p-0">
                            <div class="modal-header justify-content-between align-items-center border-bottom">
                                <a href="<?php echo $dominioHome ?>" class="logo-menu-mobile" title="Sottoradice - Homepage"></a>

                                <button type="button" class="close icon icon-times" data-dismiss="modal"
                                        aria-label="Close"><span
                                        aria-hidden="true"></span></button>
                            </div>
                            <div class="modal-body d-flex flex-column justify-content-start">
                                <a href="<?php echo $dominioHome ?>home.php" title="Sottoradice – Homepage" class="font-weight-600 text-color pb-2">
                                    Home
                                </a>

                                <a href="<?php echo $dominio ?>chi-siamo.php"
                                   title="Sottoradice – Chi siamo" class="font-weight-600 text-color  py-2">
                                    Chi siamo
                                </a>

                                <a href="<?php echo $dominio ?>progetti.php" title="Sottoradice – Progetti" class="font-weight-600 text-color  py-2">
                                    Progetti
                                </a>

                            </div>

                        </div>
                    </div>
                </div>
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
