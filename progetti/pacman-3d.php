<?php include '../config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Pac-Man 3D | Sottoradice";
$desc = "La sfera nello spazio cartesiano. Esercitazione interattiva.";
$ogImage = $dominio . "assets/images/sottoradice_scomporre_per_comprendere.png";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici, sfera, spazio cartesiano, pacman";
include_once '../partials/head.php';

?>

<body>

<?php include '../partials/navbar.php'; ?>

<main class="under-construction position-relative">
    <header class="position-center-center container px-0">
        <div class="container pt-5" style="padding-left: 0 !important; padding-right: 0 !important;">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <div class="mr-0 mr-md-5 mb-5 mb-md-0">
                    <h1 class="font-weight-bold">
                        Pagina<br>
                        <span class="text-teal">in costruzione</span>
                    </h1>
                    <p>
                        Pac-Man 3D sarà presto online.
                    </p>
                </div>
                <figure class="">
                    <img src="<?php echo $dominio ?>assets/images/home_office.svg"
                         class="h-100 w-100 object-contain object-center"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>
</main>

<?php include '../partials/scripts.php'; ?>
