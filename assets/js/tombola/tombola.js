document.addEventListener('DOMContentLoaded', function () {

    'use strict';


    // =====================================================
    // ARCHIVIO DOMANDE
    // =====================================================

    const allQuestions = window.TOMBOLA_QUESTIONS;

    if (!allQuestions) {
        console.error(
            'Tombola: archivio domande non trovato.'
        );
        return;
    }


    // =====================================================
    // STATO DEL GIOCO
    // =====================================================

    let gameQuestions = {};

    let extractedNumbers = [];
    let markedNumbers = [];

    let tombolaPool = [];
    let tombolaUsedQuestions = [];
    let tombolaQuestions = [];

    let tombolaIndex = 0;
    let tombolaCorrect = 0;
    let tombolaErrors = 0;

    let isExtracting = false;

    /*
     * Timer usato per il flip automatico
     * della domanda.
     */
    let questionFlipTimeout = null;


    // =====================================================
    // ELEMENTI DOM
    // =====================================================

    const extractButton =
        document.getElementById('extract-number');

    const currentNumberWrapper =
        document.getElementById('current-number-wrapper');

    const currentNumber =
        document.getElementById('current-number');

    const extractedCount =
        document.getElementById('extracted-count');

    const extractedNumbersBox =
        document.getElementById('extracted-numbers');

    const board =
        document.getElementById('tombola-board');


    // -----------------------------------------------------
    // QUESITO
    // -----------------------------------------------------

    const questionModal =
        document.getElementById('question-modal');

    const questionNumber =
        document.getElementById('question-number');

    const questionDifficulty =
        document.getElementById('question-difficulty');

    const questionText =
        document.getElementById('question-text');

    const questionFlipInner =
        document.querySelector(
            '#question-modal .tombola-flip-inner'
        );

    const questionBackDifficulty =
        document.getElementById(
            'question-back-difficulty'
        );

    const questionBackNumber =
        document.getElementById(
            'question-back-number'
        );


    // -----------------------------------------------------
    // MODALITÀ SFIDA
    // -----------------------------------------------------

    const challengeButton =
        document.getElementById('challenge-mode');

    const challengeModal =
        document.getElementById('challenge-modal');

    const challengeQuestion =
        document.getElementById('challenge-question');

    const newChallengeButton =
        document.getElementById('new-challenge');


    // -----------------------------------------------------
    // SFIDA TOMBOLA
    // -----------------------------------------------------

    const tombolaButton =
        document.getElementById('tombola-challenge');

    const tombolaModal =
        document.getElementById(
            'tombola-challenge-modal'
        );

    const tombolaQuestionText =
        document.getElementById(
            'tombola-question-text'
        );

    const tombolaQuestionIndex =
        document.getElementById(
            'tombola-question-index'
        );

    const tombolaErrorsElement =
        document.getElementById(
            'tombola-errors'
        );

    const tombolaCorrectButton =
        document.getElementById(
            'tombola-correct'
        );

    const tombolaWrongButton =
        document.getElementById(
            'tombola-wrong'
        );


    // -----------------------------------------------------
    // NUOVA PARTITA
    // -----------------------------------------------------

    const newGameButton =
        document.getElementById('new-game');

    const newGameTransition =
        document.getElementById(
            'new-game-transition'
        );


    // -----------------------------------------------------
    // VITTORIA / FALLIMENTO
    // -----------------------------------------------------

    const victoryScreen =
        document.getElementById(
            'tombola-victory'
        );

    const victoryNewGameButton =
        document.getElementById(
            'victory-new-game'
        );

    const failureScreen =
        document.getElementById(
            'tombola-failure'
        );

    const failureCloseButton =
        document.getElementById(
            'failure-close'
        );


    // =====================================================
    // UTILITÀ
    // =====================================================

    function shuffle(array) {

        const result = [...array];

        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                result[i],
                result[j]
            ] = [
                result[j],
                result[i]
            ];
        }

        return result;
    }


    function getDifficulty(number) {

        if (number <= 20) {

            return {
                key: 'easy',
                label: 'FACILE'
            };
        }

        if (number <= 40) {

            return {
                key: 'medium',
                label: 'MEDIA'
            };
        }

        if (number <= 60) {

            return {
                key: 'hard',
                label: 'DIFFICILE'
            };
        }

        return {
            key: 'puzzle',
            label: 'ROMPICAPO'
        };
    }


    // =====================================================
    // INIZIALIZZAZIONE PARTITA
    // =====================================================

    function initializeGame() {

        const easy =
            shuffle(allQuestions.facili);

        const medium =
            shuffle(allQuestions.medie);

        const hard =
            shuffle(allQuestions.difficili);

        const puzzle =
            shuffle(allQuestions.rompicapo);


        gameQuestions = {};


        // 1–20
        for (
            let number = 1;
            number <= 20;
            number++
        ) {

            gameQuestions[number] =
                easy[number - 1];
        }


        // 21–40
        for (
            let number = 21;
            number <= 40;
            number++
        ) {

            gameQuestions[number] =
                medium[number - 21];
        }


        // 41–60
        for (
            let number = 41;
            number <= 60;
            number++
        ) {

            const index =
                (number - 41) %
                hard.length;

            gameQuestions[number] =
                hard[index];
        }


        // 61–90
        for (
            let number = 61;
            number <= 90;
            number++
        ) {

            gameQuestions[number] =
                puzzle[number - 61];
        }


        /*
         * I rompicapo non utilizzati
         * sul tabellone vengono riservati
         * alla Sfida Tombola.
         */
        tombolaPool =
            puzzle.slice(30);

        tombolaUsedQuestions = [];
    }


    // =====================================================
    // MODAL
    // =====================================================

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add('is-open');

        modal.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add(
            'tombola-modal-open'
        );
    }


    function resetQuestionFlip() {

        if (questionFlipTimeout) {

            clearTimeout(
                questionFlipTimeout
            );

            questionFlipTimeout = null;
        }

        if (questionFlipInner) {

            questionFlipInner.classList.remove(
                'is-flipped'
            );
        }
    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }


        /*
         * Se chiudiamo il quesito,
         * prepariamo la card per
         * l'estrazione successiva.
         */
        if (modal === questionModal) {

            resetQuestionFlip();
        }


        modal.classList.remove(
            'is-open'
        );

        modal.setAttribute(
            'aria-hidden',
            'true'
        );


        const openModals =
            document.querySelectorAll(
                '.tombola-modal.is-open'
            );


        if (openModals.length === 0) {

            document.body.classList.remove(
                'tombola-modal-open'
            );
        }
    }


    document
        .querySelectorAll(
            '[data-close-modal]'
        )
        .forEach(function (button) {

            button.addEventListener(
                'click',
                function () {

                    const modal =
                        button.closest(
                            '.tombola-modal'
                        );


                    /*
                     * Se chiudiamo il quesito,
                     * il numero viene considerato
                     * utilizzato.
                     */
                    if (
                        modal === questionModal &&
                        questionNumber.textContent
                    ) {

                        const number =
                            Number(
                                questionNumber
                                    .textContent
                            );

                        markNumber(number);
                    }


                    closeModal(modal);
                }
            );
        });


    // =====================================================
    // TABELLONE
    // =====================================================

    function openQuestion(number) {

        const difficulty =
            getDifficulty(number);


        /*
         * Contenuti del fronte.
         */
        questionNumber.textContent =
            number;

        questionDifficulty.textContent =
            difficulty.label;

        questionDifficulty.dataset.difficulty =
            difficulty.key;


        /*
         * Contenuto del retro.
         */
        questionText.textContent =
            gameQuestions[number];

        questionBackNumber.textContent =
            number;

        questionBackDifficulty.textContent =
            difficulty.label;


        /*
         * Colore dell'intera card
         * in base alla difficoltà.
         */
        questionModal.classList.remove(
            'difficulty-easy',
            'difficulty-medium',
            'difficulty-hard',
            'difficulty-puzzle'
        );

        questionModal.classList.add(
            'difficulty-' +
            difficulty.key
        );


        /*
         * Ogni domanda deve partire
         * mostrando il FRONTE.
         */
        resetQuestionFlip();


        /*
         * Apre il modal:
         *
         * numero
         * difficoltà
         * decorazioni natalizie
         */
        openModal(questionModal);


        /*
         * Dopo 1,2 secondi:
         *
         * FLIP
         *
         * e appare la domanda.
         */
        questionFlipTimeout =
            setTimeout(function () {

                if (questionFlipInner) {

                    questionFlipInner
                        .classList
                        .add('is-flipped');
                }

                questionFlipTimeout = null;

            }, 1200);
    }


    function markNumber(number) {

        if (
            !markedNumbers.includes(number)
        ) {

            markedNumbers.push(number);
        }


        const button =
            board.querySelector(
                '[data-number="' +
                number +
                '"]'
            );


        if (!button) {
            return;
        }


        button.classList.remove(
            'is-extracted'
        );

        button.classList.add(
            'is-marked'
        );


        const span =
            button.querySelector('span');


        if (span) {

            span.textContent = '🎄';
        }
    }


    board.addEventListener(
        'click',
        function (event) {

            const button =
                event.target.closest(
                    '.tombola-number'
                );

            if (!button) {
                return;
            }

            const number =
                Number(
                    button.dataset.number
                );


            /*
             * Il quesito può essere aperto
             * soltanto se il numero
             * è già stato estratto.
             */
            if (
                !extractedNumbers.includes(number)
            ) {
                return;
            }


            openQuestion(number);
        }
    );


    // =====================================================
    // ESTRAZIONE
    // =====================================================

    function extractNumber() {

        if (isExtracting) {
            return;
        }


        const availableNumbers = [];


        for (
            let number = 1;
            number <= 90;
            number++
        ) {

            if (
                !extractedNumbers.includes(
                    number
                )
            ) {

                availableNumbers.push(
                    number
                );
            }
        }


        if (
            availableNumbers.length === 0
        ) {

            alert(
                'Tutti i numeri sono stati estratti!'
            );

            return;
        }


        isExtracting = true;

        extractButton.disabled = true;

        currentNumberWrapper.hidden =
            false;


        let counter = 0;


        const interval =
            setInterval(function () {

                const random =
                    availableNumbers[
                        Math.floor(
                            Math.random() *
                            availableNumbers.length
                        )
                        ];


                currentNumber.textContent =
                    random;


                const difficulty =
                    getDifficulty(random);


                currentNumberWrapper
                    .dataset
                    .difficulty =
                    difficulty.key;


                counter++;


                if (counter >= 15) {

                    clearInterval(
                        interval
                    );


                    const finalNumber =
                        availableNumbers[
                            Math.floor(
                                Math.random() *
                                availableNumbers.length
                            )
                            ];


                    currentNumber.textContent =
                        finalNumber;


                    currentNumberWrapper
                        .dataset
                        .difficulty =
                        getDifficulty(
                            finalNumber
                        ).key;


                    extractedNumbers.push(
                        finalNumber
                    );

                    const extractedButton =
                        board.querySelector(
                            '[data-number="' + finalNumber + '"]'
                        );

                    if (extractedButton) {
                        extractedButton.classList.add('is-extracted');
                    }


                    renderExtractedNumbers();


                    setTimeout(
                        function () {

                            isExtracting =
                                false;

                            extractButton.disabled =
                                false;

                        },
                        600
                    );
                }

            }, 100);
    }


    function renderExtractedNumbers() {

        extractedCount.textContent =
            extractedNumbers.length;


        extractedNumbersBox.innerHTML =
            '';


        extractedNumbers.forEach(
            function (number) {

                const item =
                    document.createElement(
                        'span'
                    );


                const difficulty =
                    getDifficulty(number);


                item.className =
                    'tombola-extracted-number ' +
                    'tombola-extracted-number--' +
                    difficulty.key;


                item.textContent =
                    number;


                extractedNumbersBox
                    .appendChild(item);
            }
        );
    }


    extractButton.addEventListener(
        'click',
        extractNumber
    );


    // =====================================================
    // MODALITÀ SFIDA
    // =====================================================

    function generateChallenge() {

        const questions =
            shuffle(
                allQuestions.sfida
            );


        challengeQuestion.textContent =
            questions[0];


        openModal(
            challengeModal
        );
    }


    challengeButton.addEventListener(
        'click',
        generateChallenge
    );


    newChallengeButton.addEventListener(
        'click',
        generateChallenge
    );


    // =====================================================
    // SFIDA TOMBOLA
    // =====================================================

    function getAvailableTombolaQuestions() {

        return tombolaPool.filter(
            function (question) {

                return !tombolaUsedQuestions
                    .includes(question);
            }
        );
    }


    function createTombolaRound() {

        const available =
            getAvailableTombolaQuestions();


        if (available.length < 3) {

            alert(
                'Non ci sono abbastanza ' +
                'rompicapo disponibili ' +
                'per una nuova sfida.'
            );

            return false;
        }


        const selected =
            shuffle(available)
                .slice(0, 3);


        tombolaQuestions =
            selected;


        selected.forEach(
            function (question) {

                tombolaUsedQuestions.push(
                    question
                );
            }
        );


        tombolaIndex = 0;
        tombolaCorrect = 0;


        renderTombolaQuestion();


        return true;
    }


    function startTombolaChallenge() {

        tombolaErrors = 0;


        if (
            !createTombolaRound()
        ) {

            return;
        }


        updateTombolaProgress();

        openModal(
            tombolaModal
        );
    }


    function renderTombolaQuestion() {

        if (
            !tombolaQuestions[
                tombolaIndex
                ]
        ) {

            return;
        }


        tombolaQuestionIndex
            .textContent =
            tombolaIndex + 1;


        tombolaQuestionText
            .textContent =
            tombolaQuestions[
                tombolaIndex
                ];
    }


    function updateTombolaProgress() {

        const dots =
            document.querySelectorAll(
                '.tombola-progress-dot'
            );


        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    'is-complete',
                    index <
                    tombolaCorrect
                );
            }
        );


        tombolaErrorsElement
            .textContent =
            tombolaErrors;
    }


    function handleCorrectAnswer() {

        tombolaCorrect++;


        updateTombolaProgress();


        if (
            tombolaCorrect >= 3
        ) {

            closeModal(
                tombolaModal
            );


            victoryScreen
                .classList
                .add('is-open');


            victoryScreen.setAttribute(
                'aria-hidden',
                'false'
            );


            return;
        }


        tombolaIndex++;

        renderTombolaQuestion();
    }


    function handleWrongAnswer() {

        tombolaErrors++;


        updateTombolaProgress();


        /*
         * PRIMO ERRORE:
         *
         * la corsa riparte da zero
         * con tre nuove domande.
         */
        if (
            tombolaErrors === 1
        ) {

            if (
                !createTombolaRound()
            ) {

                closeModal(
                    tombolaModal
                );

                return;
            }


            /*
             * createTombolaRound()
             * azzera tombolaCorrect
             * ma NON tombolaErrors.
             */
            updateTombolaProgress();


            const panel =
                tombolaModal
                    .querySelector(
                        '.tombola-modal-panel'
                    );


            if (panel) {

                panel.classList.add(
                    'tombola-shake'
                );


                setTimeout(
                    function () {

                        panel.classList.remove(
                            'tombola-shake'
                        );

                    },
                    500
                );
            }


            return;
        }


        /*
         * SECONDO ERRORE:
         *
         * Tombola fallita.
         */
        closeModal(
            tombolaModal
        );


        failureScreen
            .classList
            .add('is-open');


        failureScreen.setAttribute(
            'aria-hidden',
            'false'
        );
    }


    tombolaButton.addEventListener(
        'click',
        startTombolaChallenge
    );


    tombolaCorrectButton.addEventListener(
        'click',
        handleCorrectAnswer
    );


    tombolaWrongButton.addEventListener(
        'click',
        handleWrongAnswer
    );


    // =====================================================
    // NUOVA PARTITA
    // =====================================================

    function resetBoard() {

        /*
         * Ferma eventualmente
         * il flip ancora in corso.
         */
        resetQuestionFlip();


        extractedNumbers = [];
        markedNumbers = [];

        tombolaQuestions = [];

        tombolaIndex = 0;
        tombolaCorrect = 0;
        tombolaErrors = 0;


        currentNumber.textContent =
            '';

        currentNumberWrapper.hidden =
            true;


        extractedCount.textContent =
            '0';

        extractedNumbersBox.innerHTML =
            '';


        board
            .querySelectorAll(
                '.tombola-number'
            )
            .forEach(
                function (button) {

                    button.classList.remove(
                        'is-marked',
                        'is-extracted'
                    );


                    const span =
                        button.querySelector(
                            'span'
                        );


                    if (span) {

                        span.textContent =
                            button.dataset.number;
                    }
                }
            );


        closeModal(
            questionModal
        );

        closeModal(
            challengeModal
        );

        closeModal(
            tombolaModal
        );


        victoryScreen
            .classList
            .remove('is-open');

        failureScreen
            .classList
            .remove('is-open');


        victoryScreen.setAttribute(
            'aria-hidden',
            'true'
        );

        failureScreen.setAttribute(
            'aria-hidden',
            'true'
        );


        initializeGame();

        updateTombolaProgress();
    }


    function startNewGame() {

        /*
         * Fallback:
         * se l'overlay natalizio
         * non esiste, reset immediato.
         */
        if (!newGameTransition) {

            resetBoard();

            return;
        }


        /*
         * Mostra la schermata
         * "NUOVA PARTITA!"
         */
        newGameTransition
            .classList
            .add('is-open');


        newGameTransition.setAttribute(
            'aria-hidden',
            'false'
        );


        /*
         * Dopo l'animazione:
         *
         * - reset
         * - chiusura overlay
         * - ritorno all'estrazione
         */
        setTimeout(
            function () {

                resetBoard();


                newGameTransition
                    .classList
                    .remove('is-open');


                newGameTransition
                    .setAttribute(
                        'aria-hidden',
                        'true'
                    );


                const extraction =
                    document.querySelector(
                        '.tombola-extraction'
                    );


                if (extraction) {

                    extraction.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }

            },
            1900
        );
    }


    newGameButton.addEventListener(
        'click',
        startNewGame
    );


    victoryNewGameButton
        .addEventListener(
            'click',
            startNewGame
        );


    failureCloseButton
        .addEventListener(
            'click',
            function () {

                failureScreen
                    .classList
                    .remove('is-open');


                failureScreen
                    .setAttribute(
                        'aria-hidden',
                        'true'
                    );
            }
        );


    // =====================================================
    // ESC
    // =====================================================

    document.addEventListener(
        'keydown',
        function (event) {

            if (
                event.key !== 'Escape'
            ) {

                return;
            }


            const openModalElement =
                document.querySelector(
                    '.tombola-modal.is-open'
                );


            if (openModalElement) {

                /*
                 * Stesso comportamento
                 * del pulsante X:
                 * il numero viene segnato
                 * come utilizzato.
                 */
                if (
                    openModalElement ===
                    questionModal &&
                    questionNumber.textContent
                ) {

                    const number =
                        Number(
                            questionNumber
                                .textContent
                        );

                    markNumber(number);
                }


                closeModal(
                    openModalElement
                );
            }
        }
    );


    // =====================================================
    // AVVIO
    // =====================================================

    initializeGame();

});