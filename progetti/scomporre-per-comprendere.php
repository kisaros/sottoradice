<?php include '../config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Scomporre per comprendere | Sottoradice";
$desc = "Wizard interattivo sui metodi di scomposizione dei polinomi.";
$ogImage = $dominio . "assets/images/sottoradice_scomporre_per_comprendere.png";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici, polinomi, scomposizioni";
include_once '../partials/head.php';

?>

<body>

<?php include '../partials/navbar.php'; ?>

<main>

    <header class="">
        <div class="container pt-5">
            <div class="hero mb-4">
                <small class="text-success font-weight-500 d-flex align-items-center justify-content-start mb-2">
                    <span class="rounded-xsmall bg-success mr-3"></span>
                    <span class="text-uppercase">Interattivo</span>
                </small>
                <h1 class="serif font-weight-700 text-left px-0">Scomporre <span class="text-primary">per comprendere</span></h1>
                <h2 class="serif font-weight-300 text-secondary text-left pb-4 px-0">
                    Wizard guidato alla scomposizione dei polinomi. Con appunti PDF della
                    classe inclusi.
                </h2>
                <div class="d-flex flex-wrap align-items-center justify-content-start">
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-2 mr-3">Prof.ssa Ornella Leanza</small>
                    <small class="bg-success-25 text-success px-3 rounded-pill mb-2">Classe 2AIT – a.s. 2025/26</small>
                </div>
            </div>

            <div class="hero bg-waves-success mb-5">
                <figure class="project-image">
                    <img src="../assets/images/sottoradice_scomporre_per_comprendere.png"
                         class="h-100 w-100 object-contain object-center"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>

    <section class="container">
        <h2 class="text-purple text-left mb-0 pb-3">Cos'è</h2>
        <p class="text-p-plus mb-4">
            <span class="font-weight-700">Scomporre per comprendere</span> nasce da un’idea semplice: capire davvero
            qualcosa significa riuscire a
            vedere da quali parti è costruita.
            Partendo dalla scomposizione dei polinomi, il progetto collega matematica, informatica e
            progettazione web per aiutare gli studenti a leggere le strutture, riconoscere relazioni e costruire
            un metodo di ragionamento più consapevole.
        </p>
    </section>

    <!-- wizard -->

    <section class="container">
        <h2 class="text-warning text-left mb-0 pb-3">L'app</h2>
        <p class="text-p-plus mb-4">
            La nostra app ti guiderà nella scelta dei metodi da applicare e nell'applicazione delle procedure. Non
            risolve i tuoi esercizi, bensì i tuoi problemi!
        </p>


        <h4 class="">Pronto a iniziare?</h4>
        <ul class="text-p-plus">
            <li>Inserisci il polinomio.</li>
            <li>Analizza la struttura dell’espressione.</li>
            <li>Scegli la strategia di scomposizione più adatta.</li>
            <li>Verifica ogni passaggio.</li>
            <li>Continua finché il polinomio non è completamente scomposto.</li>
        </ul>
    </section>

    <?php include '../partials/progetti/scomporre-per-comprendere/scompolab_wizard.php'; ?>

    <!-- risorse e materiali -->

    <section class="container mb-5">
        <h2 class="text-left mb-0 pb-3"><span class="text-teal">Risorse</span> e materiali</h2>
        <?php include '../partials/progetti/scomporre-per-comprendere/risorse.php'; ?>
    </section>


    <!-- gallery -->


    <section class="container mb-5">
        <h2 class="text-left mb-0 pb-3">Studenti <span class="text-pink">in azione</span></h2>
        <?php include '../partials/progetti/scomporre-per-comprendere/gallery.php'; ?>
    </section>


</main>

<?php include '../partials/footer.php'; ?>
<?php include '../partials/scripts.php'; ?>


<!-- Nerdamer -->
<script src="https://cdn.jsdelivr.net/npm/nerdamer@latest/nerdamer.core.js"></script>
<script src="https://cdn.jsdelivr.net/npm/nerdamer@latest/Algebra.js"></script>

<script src="../assets/js/scompolab.js"></script>


<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

<script>
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true
    });
</script>