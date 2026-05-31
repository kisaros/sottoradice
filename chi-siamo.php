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
                    <h6 class="text-uppercase text-left mx-auto">
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
                    <img src="assets/images/idea.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>


    <!-- Perché sottoradice -->

    <section>
        <div class="bg-secondary-25 py-5">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-school fa-3x mr-3"></i>
                        <div>
                            <p class="mb-0">I.I.S. "Benedetto Radice" – Bronte (CT)</p>
                            <a href="https://www.isradice.edu.it/" title="IIS Benedetto Radice" target="_blank">
                                <small>Visita il sito della nostra scuola</small>
                            </a>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <div class="d-flex flex-column align-items-center justify-content-center mr-5">
                            <span class="text-pink text-h3">2026</span>
                            <small>Anno di lancio</small>
                        </div>

                        <div class="d-flex flex-column align-items-center justify-content-center">
                            <span class="text-success text-h3">&infin;</span>
                            <small>Crescita</small>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container border-top mt-4">
                <h2 class="text-left">
                    Perché <span class="font-weight-300">sotto</span><span class="text-primary">radice</span>?
                </h2>
                <h6 class="font-weight-300 mb-5">
                    Il nome viene dall'IIS Benedetto Radice — siamo letteralmente "sotto la Radice". Ma √ è anche dove
                    nascono i numeri irrazionali: l'inaspettato, la scoperta, quello che non ti aspetti. Il sito nasce
                    per
                    raccogliere e condividere i progetti matematici degli studenti dell'istituto,
                    per tutte le classi che vorranno partecipare.
                </h6>
                <div class="d-flex align-items-center justify-content-center justify-content-lg-between">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                        <i class="fas fa-drafting-compass fa-2x text-orange"></i>
                        <div class="ml-lg-3">
                            <p class="mb-0">Imparare facendo</p>
                            <small class="text-secondary mb-0">Ogni progetto nasce da un problema reale in
                                classe.</small>
                        </div>
                    </div>

                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                        <i class="fa-solid fa-hexagon-nodes fa-2x text-teal"></i>
                        <div class="ml-lg-3">
                            <p class="mb-0">Aperto a tutti</p>
                            <small class="text-secondary mb-0">Pubblichiamo online perché la matematica è di
                                tutti.</small>
                        </div>
                    </div>

                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                        <i class="fa-solid fa-chart-line fa-2x text-purple"></i>
                        <div class="ml-lg-3">
                            <p class="mb-0">Cresce ogni anno</p>
                            <small class="text-secondary mb-0">Ogni classe aggiunge qualcosa di nuovo al sito.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>


    <!-- team -->

    <section class="py-5">


        <div class="container">

            <h2>Il team</h2>

            <h6 class="text-uppercase">La Docente</h6>

            <div class="row card-img-large align-items-center mx-0 mt-4 mb-2">
                <div class="col-12 col-md-8 pl-md-0">
                    <div class="d-block d-md-flex align-items-center justify-content-start mb-4">
                        <img class="profile-img"
                             src="assets/images/ol.jpg"
                             alt="Prof.ssa Ornella Leanza">
                        <div class="ml-3">
                            <p class="text-h3 text-center text-md-left font-weight-400 mb-0">Prof.ssa Ornella Leanza</p>
                            <p class="text-secondary text-center text-md-left mb-0">Docente di Matematica – Web
                                Designer</p>
                        </div>
                    </div>
                    <quote class="sans-serif-italic text-center text-md-left">
                        “La matematica appare come un riflesso o una sintesi della bellezza dell’universo: è armonia
                        come l’universo è armonia”.
                    </quote>
                </div>

                <div class="col-12 col-md-4 pr-md-0">
                    <div class="bg-secondary-15 rounded-lg p-3 mb-2">
                        <p class="text-h4 font-weight-600 text-pink mb-0">Matematica</p>
                        <small class="">Disciplina insegnata all'IIS "Benedetto Radice"</small>
                    </div>

                    <div class="bg-secondary-15 rounded-lg p-3">
                        <p class="text-h4 font-weight-600 text-teal mb-0">2025/26 <span
                                    class="text-teal fa fa-arrow-right"></span></p>
                        <small class="">Anno di avvio e realizzazione progetto</small>
                    </div>
                </div>

            </div>


            <h6 class="text-uppercase mt-5">La classe</h6>


            <p>La classe 2A IT è la classe apripista di Sottoradice. Ogni studente ha contribuito ad almeno un progetto.
                Ogni studente ha fortemente voluto la realizzazione di Sottoradice.</p>

            <div class="d-flex align-items-center w-100 mt-4 mb-3">
                <small class="bg-warning-25 text-warning-plus text-uppercase py-1 px-3 mr-3 rounded-pill"><span
                            class="fa fa-star mr-2"></span>classe fondatrice</small>
                <small class="text-secondary mr-3">Classe 2AIT – a.s. 2025/26</small>
                <small class="d-block bg-secondary-50" style="flex: 1; height: 1px;"> </small>
            </div>

            <div class="row-card row mx-n2">

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/1.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Gabriele G.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/2.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Gioele M.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/3.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Gabriele T.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/4.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Samuele I.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/5.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Vincenzo M.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/6.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Leonardo C.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/7.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Gabriele V.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/8.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Anita P.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/9.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Giorgia M.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/10.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Antonio A.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/11.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Manuel G.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/12.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Andrea T.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/13.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Matteo M.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/14.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Enrico M.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/15.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Salvatore S.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/16.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Matteo L.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>

                <div class="card-img col-2 d-flex flex-column align-items-center justify-content-center border rounded-lg p-3 m-2">
                    <img class="profile-img"
                         src="<?php echo $dominio ?>assets/images/17.jpg"
                         alt="">
                    <p class="font-weight-400 mb-1">Mattia P.</p>
                    <small class="text-secondary text-center">Maestro del raccoglimento</small>
                </div>




            </div>
        </div>
    </section>


    <!-- collabora con noi -->

    <section class="bg-primary py-5">
        <div class="container">
            <h6 class="text-white-50 font-weight-400 text-uppercase text-left mx-auto">
                Unisciti al progetto
            </h6>
            <h2 class="text-white serif font-weight-700 text-center text-md-left px-4 pb-3 px-md-0">
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
