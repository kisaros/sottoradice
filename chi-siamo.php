<?php include 'config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Chi siamo | Sottoradice, la matematica fatta da noi.";
$desc = "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica.";
$ogImage = $dominio . "assets/images/idea.svg";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once 'partials/head.php';

?>

<body>


<?php include 'partials/navbar.php'; ?>

<main>
    <header class="">
        <div class="container">
            <div class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
                <div class="col-12 col-md-6">
                    <h6 class="text-uppercase text-center text-md-left mx-auto">
                        Chi siamo
                    </h6>
                    <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">
                        <span class="text-success">18 studenti,</span><br>
                        <span class="">Un sacco di idee.</span>
                    </h1>
                    <h2 class="serif font-weight-300 text-secondary text-center text-md-left pb-4 px-4 px-md-0">Un
                        progetto che
                        nasce con la classe 2A IT nell'a.s. 2025/2026 e cresce con ogni anno scolastico. Matematica
                        fatta dagli
                        studenti, per
                        tutti.</h2>
                </div>
                <figure class="col-12 col-md-6">
                    <img src="<?php echo $dominio ?>assets/images/idea.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>


    <!-- Perché sottoradice -->

    <section class="intro">
        <?php include 'partials/chi-siamo/intro.php'; ?>
    </section>


    <!-- team -->

    <section class="team mb-5">
        <?php include 'partials/chi-siamo/team.php'; ?>
    </section>


    <!-- collabora con noi -->

    <section class="bg-primary py-5">
        <div class="container">
            <h6 class="text-white-50 font-weight-400 text-uppercase text-left mx-auto">
                Unisciti al progetto
            </h6>
            <h2 class="text-white serif font-weight-700 text-left pb-3">
                Vuoi far parte di <span class="font-weight-300">sotto</span><span class="text-warning">radice</span>?
            </h2>
            <p class="text-white-50 mb-0">
                Sei un docente del Benedetto Radice e vuoi portare la tua classe nel progetto?<br>
                O sei uno studente con un'idea? Scrivici — Sottoradice cresce con chi ha voglia di contribuire.
            </p>
            <a class="btn btn-outline btn-outline-light rounded-lg mt-4"
               href="mailto:prof.ornella.leanza@isradice.edu.it"><span>Scrivici una mail</span><span
                        class="fa fa-arrow-right ml-2"></span></a>
        </div>
    </section>
</main>


<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>
