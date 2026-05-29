<?php include '../config/database.php'; ?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Scomporre per comprendere | Sottoradice, la matematica fatta da noi.";
$desc = "Wizard interattivo sui metodi di scomposizione dei polinomi.";
$ogImage = $dominio . "assets/images/sottoradice_scomporre_per_comprendere.png";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once '../partials/head.php';

?>

<body>

<?php include '../partials/navbar.php'; ?>

<main>

    <header class="">
        <div class="container pt-5">
            <div class="hero mb-4">
                <small class="text-success font-weight-500 d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                    <span class="rounded-xsmall bg-success mr-3"></span>
                    <span class="text-uppercase">Interattivo</span>
                </small>
                <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">Scomporre per comprendere</h1>
                <h2 class="serif font-weight-300 text-secondary text-center text-md-left pb-4 px-4 px-md-0">
                    Wizard guidato alla scomposizione dei polinomi. Con appunti PDF della
                    classe inclusi.
                </h2>
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
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
        <h2 class="text-left mb-0 pb-3">Cos'è</h2>
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
        <h2 class="text-left mb-0 pb-3">L'app</h2>
        <p class="text-p-plus mb-4">
            La nostra app ti guiderà nella scelta dei metodi da applicare e nell'applicazione delle procedure. Non
            risolve i tuoi esercizi, bensì i tuoi problemi!
        </p>


        <h4>Pronto a iniziare?</h4>
        <ul class="text-p-plus">
            <li>Inserisci il polinomio.</li>
            <li>Analizza la struttura dell’espressione.</li>
            <li>Scegli la strategia di scomposizione più adatta.</li>
            <li>Verifica ogni passaggio.</li>
            <li>Continua finché il polinomio non è completamente scomposto.</li>
        </ul>
    </section>

    <?php include '../partials/progetti/scompolab_wizard.php'; ?>

    <!-- risorse e materiali -->

    <section class="container mb-5">
        <h2 class="text-left mb-0 pb-3">Risorse e materiali</h2>

        <div class="appunti-pdf rounded-lg border">
            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/raccoglimento_totale.pdf"
               target="_blank"
               title="Appunti - Raccoglimento totale">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Raccoglimento totale</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>

            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/raccoglimento_parziale.pdf"
               target="_blank"
               title="Appunti - Raccoglimento parziale">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Raccoglimento parziale</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>

            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/quadrato_binomio+differenza_quadrati.pdf"
               target="_blank"
               title="Appunti - Quadrato di binomio e differenza di quadrati">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Quadrato di binomio e differenza di quadrati</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>

            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/quadrato_trinomio+cubo_binomio+somma_differenza_cubi.pdf"
               target="_blank"
               title="Appunti - Quadrato di trinomio, cubo di binomio e somma o differenza di cubi">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Quadrato di trinomio, cubo di binomio e somma o differenza di cubi</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>


            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/trinomio_speciale.pdf" target="_blank"
               title="Appunti - Trinomio speciale">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Trinomio speciale</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>

            <a class="row align-items-center justify-content-between mx-0 p-4"
               href="<?php echo $dominio ?>assets/pdf/scomporre-per-comprendere/ruffini.pdf" target="_blank"
               title="Appunti - Zeri di un polinomio e metodo di Ruffini">
                <div class="d-flex align-items-center">
                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>
                    <div class="mx-md-3 mb-2 mb-md-0">
                        <p class="pb-0">Zeri di un polinomio e metodo di Ruffini</p>
                        <small class="text-secondary">Appunti PDF, classe 2AIT a.s. 2025/26</small>
                    </div>
                </div>
                <div>
                    <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">PDF</small>
                    <span class="fa fa-download"></span>
                </div>
            </a>
        </div>
    </section>


    <!-- gallery -->


    <section class="container mb-5">
        <h2 class="text-left mb-0 pb-3">Studenti in azione</h2>

        <div class="insta-gallery">

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/1.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/1.jpg" alt="Foto 1">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/2.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/2.jpg" alt="Foto 2">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/3.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/3.jpg" alt="Foto 3">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/4.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/4.jpg" alt="Foto 4">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/5.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/5.jpg" alt="Foto 5">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/6.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/6.jpg" alt="Foto 6">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/7.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/7.jpg" alt="Foto 7">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/8.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/8.jpg" alt="Foto 8">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/9.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/9.jpg" alt="Foto 9">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/10.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/10.jpg" alt="Foto 10">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/11.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/11.jpg" alt="Foto 11">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/12.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/12.jpg" alt="Foto 12">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/13.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/13.jpg" alt="Foto 13">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/14.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/14.jpg" alt="Foto 14">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/15.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/15.jpg" alt="Foto 15">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/16.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/16.jpg" alt="Foto 16">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/17.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/17.jpg" alt="Foto 17">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/18.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/18.jpg" alt="Foto 18">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/19.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/19.jpg" alt="Foto 19">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/20.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/20.jpg" alt="Foto 20">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/21.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/21.jpg" alt="Foto 21">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/22.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/22.jpg" alt="Foto 22">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/23.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/23.jpg" alt="Foto 23">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/24.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/24.jpg" alt="Foto 24">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/25.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/25.jpg" alt="Foto 25">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/26.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/26.jpg" alt="Foto 26">
            </a>

            <a href="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/27.jpg" class="gallery-item glightbox"
               data-gallery="gallery-progetto">
                <img src="<?php echo $dominio ?>assets/images/progetti/scomporre-per-comprendere/27.jpg" alt="Foto 27">
            </a>

        </div>

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