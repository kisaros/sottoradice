<?php include 'config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Sottoradice, la matematica fatta da noi.";
$desc = "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica.";
$ogImage = $dominio . "assets/images/og-home.jpg";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once 'partials/head.php';

?>

<body>


<?php include 'partials/navbar.php'; ?>


<main class="">
    <header class="">
        <div class="container">
            <div class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
                <div class="col-12 col-md-6">
                    <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">
                        <span class="font-weight-300">sotto</span><span class="text-primary">radice</span>, la <span
                                class="text-success">matematica</span> fatta da noi.
                    </h1>
                    <h2 class="serif font-weight-300 text-secondary text-center text-md-left pb-4 px-4 px-md-0">Progetti
                        interattivi e guide realizzati dagli studenti dell'IIS "Benedetto Radice" di Bronte. Per capire
                        davvero
                        la matematica.</h2>
                    <div class="d-flex align-item-center justify-content-start">
                        <a href="/progetti.php" title="Progetti | Sottoradice"
                           class="btn btn-outline-success rounded-lg mr-3">Esplora i progetti</a>
                        <a href="/chi-siamo.php" title="Chi siamo | Sottoradice"
                           class="btn btn-outline-success rounded-lg">Chi
                            siamo</a>
                    </div>
                </div>
                <figure class="col-12 col-md-6">
                    <img src="https://sottoradice.altervista.org/assets/images/calcolatrice.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>


    <!-- Il progetto in numeri -->

    <?php include 'partials/home/numeri.php'; ?>

    <!-- Chi siamo -->

    <?php include 'partials/home/chi-siamo.php'; ?>

    <!-- Progetti -->

    <section class="container py-5">

        <?php include 'partials/home/progetti.php'; ?>

    </section>


</main>


<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>