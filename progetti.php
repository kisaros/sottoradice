<?php include 'config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Progetti | Sottoradice, la matematica fatta da noi.";
$desc = "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica.";
$ogImage = $dominio . "assets/images/og-home.jpg";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once 'partials/head.php';

?>

<body>


<?php include 'partials/navbar.php'; ?>

<main class="container">
    <header class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
        <div class="col-12 col-md-6">
            <h6 class="text-uppercase text-left mx-auto">
                Progetti
            </h6>
            <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">
                <span class="text-pink">18 studenti,</span><br>
                <span class="">Un sacco di idee.</span>
            </h1>
            <h2 class="serif font-weight-300 text-secondary text-center text-md-left pb-4 px-4 px-md-0">Siamo la classe
                2A dell'indirizzo Informatica e Telecomunicazioni dell'IIS Benedetto Radice di Bronte. Questi progetti
                nascono nelle ore di matematica, ma vivono qui — per tutti.</h2>
        </div>
        <figure class="col-12 col-md-6">
            <img src="assets/images/cloud_library.svg"
                 class="h-100 w-100 object-cover"
                 alt="Sottoradice, la matematica fatta da noi.">
        </figure>

    </header>

    <!-- barra di ricerca -->

    <section class="project-search row">
        <div class="row justify-content-center w-100 mx-0 position-relative">

            <div class="col-10 col-lg-8 position-relative">

                <hr class="border-top-dark position-center-center w-100 z-index-0 m-0">

                <div class="border bg-secondary-15 form-group d-flex align-items-center rounded-lg z-index-1">
                        <div class="w-75 d-flex align-items-center">
                            <input class="form-control ml-2 mr-2 mr-md-4" placeholder="Cerca un progetto..." type="text" name="" value="" id="inputFrase" required>
                        </div>
                        <div class="d-flex justify-content-center w-25">
                            <button id="submit" class="btn btn-warning btn-bible-height w-100 px-0" type="button" data-toggle="dropdown" aria-expanded="false">
                                <span class="icon icon-search"></span>
                                <span class="d-none d-md-block ml-2">Cerca</span>
                            </button>
                        </div>

                </div>
            </div>
        </div>
    </section>

    <?php include 'partials/home/progetti.php'; ?>
</main>



<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>
