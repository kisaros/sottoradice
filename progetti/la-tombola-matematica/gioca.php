<?php
include '../../config/database.php';

$title = 'Gioca | La tombola matematica | Sottoradice';
$desc = 'Gioca alla Tombola matematica di Sottoradice.';
$keywords = 'tombola matematica, matematica, gioco didattico';
$ogImage = $dominio . 'assets/images/tombola-matematica-hero.png';

include_once '../../partials/head.php';
?>

<body class="tombola-page">

<?php include '../../partials/navbar.php'; ?>

<main class="tombola-game">

    <!-- =========================
         HEADER
    ========================== -->

    <header class="container pt-5 pb-4">

        <div class="d-flex align-items-center mb-3">
            <span class="rounded-xsmall bg-warning mr-3"></span>
            <small class="text-warning font-weight-500 text-uppercase">
                Gioca
            </small>
        </div>

        <h1 class="serif font-weight-700 text-left px-0 mb-2">
            La tombola matematica
        </h1>

        <p class="text-p-plus text-secondary mb-0">
            Estrai un numero, scopri il quesito e... che la
            <strong>matemagica</strong> abbia inizio!
        </p>

    </header>


    <!-- =========================
         AREA DI GIOCO
    ========================== -->

    <section class="container pb-5">

        <div class="tombola-board-wrapper">

            <!-- ESTRAZIONE -->

            <div class="tombola-extraction">

                <div class="tombola-extraction-action">

                    <button
                        type="button"
                        id="extract-number"
                        class="btn btn-warning tombola-main-button">

                        <i class="fas fa-dice mr-2"></i>
                        Estrai numero

                    </button>

                </div>


                <div
                    id="current-number-wrapper"
                    class="tombola-current-wrapper"
                    hidden>

                    <small>Numero estratto</small>

                    <div id="current-number"
                         class="tombola-current-number">
                    </div>

                </div>

            </div>


            <!-- CONTATORE -->

            <div class="tombola-counter">

                Numeri estratti:
                <strong>
                    <span id="extracted-count">0</span>/90
                </strong>

            </div>


            <!-- NUMERI GIÀ ESTRATTI -->

            <div
                id="extracted-numbers"
                class="tombola-extracted-numbers">
            </div>


            <!-- =========================
                 TABELLONE
            ========================== -->

            <div
                id="tombola-board"
                class="tombola-board"
                aria-label="Tabellone della tombola">

                <?php for ($number = 1; $number <= 90; $number++): ?>

                    <?php
                    if ($number <= 20) {
                        $difficulty = 'easy';
                    } elseif ($number <= 40) {
                        $difficulty = 'medium';
                    } elseif ($number <= 60) {
                        $difficulty = 'hard';
                    } else {
                        $difficulty = 'puzzle';
                    }
                    ?>

                    <button
                        type="button"
                        class="tombola-number tombola-number--<?= $difficulty ?>"
                        data-number="<?= $number ?>">

                        <span><?= $number ?></span>

                    </button>

                <?php endfor; ?>

            </div>


            <!-- =========================
                 COMANDI
            ========================== -->

            <div class="tombola-controls">

                <button
                    type="button"
                    id="tombola-challenge"
                    class="btn tombola-control tombola-control--tombola">

                    <i class="fas fa-bullseye"></i>
                    <span>Sfida Tombola</span>

                </button>


                <button
                    type="button"
                    id="challenge-mode"
                    class="btn tombola-control tombola-control--challenge">

                    <i class="fas fa-trophy"></i>
                    <span>Modalità Sfida</span>

                </button>


                <button
                    type="button"
                    id="new-game"
                    class="btn tombola-control tombola-control--reset">

                    <i class="fas fa-redo-alt"></i>
                    <span>Nuova partita</span>

                </button>

            </div>

        </div>

    </section>

</main>


<!-- ==================================================
     MODAL QUESITO — FLIP
=================================================== -->

<div
        id="question-modal"
        class="tombola-modal tombola-question-modal"
        aria-hidden="true">

    <button
            type="button"
            class="tombola-question-close"
            data-close-modal
            aria-label="Chiudi">

        <i class="fas fa-times"></i>

    </button>


    <div class="tombola-flip-card">

        <div class="tombola-flip-inner">

            <!-- =========================================
                 FRONTE
            ========================================== -->

            <div class="tombola-flip-face tombola-flip-front">

                <div class="tombola-flip-decoration">
                    🎄
                </div>

                <div
                        id="question-number"
                        class="tombola-flip-number">
                </div>

                <div
                        id="question-difficulty"
                        class="tombola-flip-difficulty">
                </div>

                <div class="tombola-flip-character">
                    🎅
                </div>

            </div>


            <!-- =========================================
                 RETRO
            ========================================== -->

            <div class="tombola-flip-face tombola-flip-back">

                <div class="tombola-flip-character">
                    🤔
                </div>

                <div
                        id="question-text"
                        class="tombola-flip-question">
                </div>

                <div class="tombola-flip-sparkles">
                    ✨
                </div>

                <div class="tombola-flip-info">

                    <span id="question-back-difficulty"></span>

                    <span class="tombola-flip-separator">·</span>

                    N° <span id="question-back-number"></span>

                </div>

            </div>

        </div>

    </div>

</div>


<!-- ==================================================
     MODAL MODALITÀ SFIDA
=================================================== -->

<div
    id="challenge-modal"
    class="tombola-modal tombola-modal--challenge"
    aria-hidden="true">

    <div class="tombola-modal-panel tombola-challenge-panel">

        <button
            type="button"
            class="tombola-modal-close"
            data-close-modal
            aria-label="Chiudi">

            <i class="fas fa-times"></i>

        </button>


        <div class="tombola-modal-icon">
            <i class="fas fa-trophy"></i>
        </div>

        <h2 class="text-center">Modalità Sfida!</h2>

        <p class="tombola-challenge-intro">
            Troppi vincitori? Solo uno conquisterà il premio.
        </p>


        <div
            id="challenge-question"
            class="tombola-challenge-question">
        </div>


        <button
            type="button"
            id="new-challenge"
            class="btn btn-warning mt-4">

            <i class="fas fa-random mr-2"></i>
            Nuova sfida

        </button>

    </div>

</div>


<!-- ==================================================
     MODAL SFIDA TOMBOLA
=================================================== -->

<div
    id="tombola-challenge-modal"
    class="tombola-modal tombola-modal--final"
    aria-hidden="true">

    <div class="tombola-modal-panel tombola-final-panel">

        <button
            type="button"
            class="tombola-modal-close"
            data-close-modal
            aria-label="Chiudi">

            <i class="fas fa-times"></i>

        </button>


        <div class="tombola-modal-icon">
            <i class="fas fa-bullseye"></i>
        </div>

        <h2 class="text-center">Sfida Tombola!</h2>

        <p>
            Tre risposte corrette consecutive per conquistare
            la Tombola.
        </p>


        <!-- PROGRESSO -->

        <div class="tombola-progress">

            <span class="tombola-progress-dot"></span>
            <span class="tombola-progress-dot"></span>
            <span class="tombola-progress-dot"></span>

        </div>


        <div class="tombola-error-counter">
            Errori:
            <strong id="tombola-errors">0</strong>/1
        </div>


        <!-- DOMANDA -->

        <div class="tombola-final-question">

            <small>
                Domanda
                <span id="tombola-question-index">1</span>/3
            </small>

            <div id="tombola-question-text"></div>

        </div>


        <!-- VALUTAZIONE DOCENTE -->

        <div class="tombola-answer-controls">

            <button
                type="button"
                id="tombola-correct"
                class="btn tombola-answer-correct">

                <i class="fas fa-check mr-2"></i>
                Risposta corretta

            </button>


            <button
                type="button"
                id="tombola-wrong"
                class="btn tombola-answer-wrong">

                <i class="fas fa-times mr-2"></i>
                Risposta errata

            </button>

        </div>

    </div>

</div>


<!-- ==================================================
     NUOVA PARTITA
=================================================== -->

<div
        id="new-game-transition"
        class="tombola-new-game-transition"
        aria-hidden="true">

    <div class="tombola-new-game-content">

        <div class="tombola-new-game-tree">
            🎄
        </div>

        <h2>NUOVA PARTITA!</h2>

        <div class="tombola-new-game-stars">
            ⭐ <span>🎅</span> ⭐
        </div>

        <p>Mescolamento in corso...</p>

    </div>

</div>



<!-- ==================================================
     SCHERMATA VITTORIA
=================================================== -->

<div
    id="tombola-victory"
    class="tombola-result tombola-result--victory"
    aria-hidden="true">

    <div>

        <div class="tombola-result-icon">
            🏆
        </div>

        <h2>TOMBOLA!</h2>

        <p>
            Tre risposte corrette.<br>
            La sfida è vinta!
        </p>

        <button
            type="button"
            id="victory-new-game"
            class="btn btn-light">

            Nuova partita

        </button>

    </div>

</div>


<!-- ==================================================
     SCHERMATA FALLIMENTO
=================================================== -->

<div
    id="tombola-failure"
    class="tombola-result tombola-result--failure"
    aria-hidden="true">

    <div>

        <div class="tombola-result-icon">
            ✕
        </div>

        <h2>Tombola fallita!</h2>

        <p>
            Secondo errore.<br>
            Si riprende il gioco.
        </p>

        <button
            type="button"
            id="failure-close"
            class="btn btn-light">

            Torna al tabellone

        </button>

    </div>

</div>


<?php include '../../partials/footer.php'; ?>
<?php include '../../partials/scripts.php'; ?>


<script src="<?= $dominio ?>assets/js/tombola/domande.js"></script>
<script src="<?= $dominio ?>assets/js/tombola/tombola.js"></script>

</body>
</html>