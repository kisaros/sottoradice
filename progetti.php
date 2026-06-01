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

<main class="">
    <header class="bg-waves-purple">
        <div class="container">
            <div class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
                <div class="col-12 col-md-6">
                    <h6 class="text-uppercase text-left mx-auto">
                        Progetti
                    </h6>
                    <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">
                        <span class="text-pink">18 studenti,</span><br>
                        <span class="">Un sacco di idee.</span>
                    </h1>
                    <h2 class="serif font-weight-300 text-black-80 text-center text-md-left pb-4 px-4 px-md-0 mb-0">Siamo la classe
                        2A dell'indirizzo Informatica e Telecomunicazioni dell'IIS Benedetto Radice di Bronte. Questi progetti
                        nascono nelle ore di matematica, ma vivono qui — per tutti.</h2>
                </div>
                <figure class="col-12 col-md-6">
                    <img src="<?php echo $dominio ?>assets/images/cloud_library.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>

            </div>
        </div>
    </header>

    <section class="container progetti my-5">
        <?php include 'partials/home/progetti.php'; ?>
    </section>
</main>



<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>
