document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("scompolabApp");
    const resetButton = document.getElementById("scompolabReset");
    const currentPolyBox = document.getElementById("scompolabCurrentPoly");
    const builtFactorizationBox = document.getElementById("scompolabBuiltFactorization");
    const stepLabel = document.getElementById("scompolabStepLabel");
    const stepTitle = document.getElementById("scompolabStepTitle");
    const progressBar = document.getElementById("scompolabProgressBar");

    const state = {
        originalInput: "",
        currentPolynomial: "",
        analysis: null,
        builtFactors: [],
        remainingPolynomial: "",
        step: "input",
        progress: 10,
        selectedCommonFactors: [],
        selectedMethod: null
    };

    const methodNames = {
        totale: "Raccoglimento totale",
        differenza_quadrati: "Differenza di quadrati",
        differenza_cubi: "Differenza di cubi",
        somma_cubi: "Somma di cubi",
        quadrato_binomio: "Quadrato di binomio",
        trinomio_speciale: "Trinomio speciale",
        raccoglimento_parziale: "Raccoglimento parziale",
        cubo_binomio: "Cubo di binomio",
        quadrato_trinomio: "Quadrato di trinomio",
        ruffini: "Ruffini"
    };

    function normalize(value) {
        return value
            .replace(/\s+/g, "")
            .replace(/−/g, "-")
            .replace(/²/g, "^2")
            .replace(/³/g, "^3");
    }

    function pretty(value) {
        if (!value) return "—";
        return String(value)
            .replace(/\^2/g, "²")
            .replace(/\^3/g, "³")
            .replace(/\*/g, "");
    }

    function splitTerms(poly) {
        return normalize(poly)
            .replace(/-/g, "+-")
            .split("+")
            .filter(term => term !== "");
    }

    function parseTerm(term) {
        const parsed = parseMonomialText(term);
        const variables = parsed.variables || {};
        const degree = variables.x || 0;
        const totalDegree = Object.values(variables).reduce((sum, value) => sum + value, 0);

        return {
            raw: term,
            original: term,
            coefficient: parsed.coefficient,
            absCoefficient: parsed.absCoefficient,
            variables: variables,
            degree: degree,
            totalDegree: totalDegree
        };
    }

    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);

        while (b) {
            const temp = b;
            b = a % b;
            a = temp;
        }

        return a || 1;
    }
    function getProperNumericDivisor(n) {
        for (let divisor = 2; divisor <= Math.sqrt(n); divisor++) {
            if (n % divisor === 0) return divisor;
        }

        return 1;
    }


    function analyze(poly) {
        const normalized = normalize(poly);
        const terms = splitTerms(normalized).map(parseTerm);
        const coefficients = terms.map(t => t.absCoefficient).filter(n => !isNaN(n));

        let numericGcd = coefficients.length ? coefficients[0] : 1;
        coefficients.forEach(c => numericGcd = gcd(numericGcd, c));

        const allVariables = Array.from(new Set(
            terms.flatMap(term => Object.keys(term.variables || {}))
        )).sort();

        const commonVariables = {};

        allVariables.forEach(variable => {
            const exponents = terms.map(term => (term.variables && term.variables[variable]) || 0);
            const minExponent = Math.min(...exponents);

            if (minExponent > 0) {
                commonVariables[variable] = minExponent;
            }
        });

        const hasCommonLiteral = Object.keys(commonVariables).length > 0;
        const commonLiteralText = monomialToText(1, commonVariables);
        const commonMonomialText = monomialToText(numericGcd, commonVariables);

        const degrees = terms.map(t => t.degree || 0);
        const minDegree = degrees.length ? Math.min(...degrees) : 0;

        return {
            normalized,
            terms,
            termCount: terms.length,
            numericGcd,
            minDegree,
            commonVariables,
            commonLiteralText,
            commonMonomialText,
            hasNumericCommon: numericGcd > 1,
            hasCommonLiteral,
            hasCommonX: (commonVariables.x || 0) > 0,
            hasTotal: numericGcd > 1 || hasCommonLiteral
        };
    }

    function getCorrectCommonFactors(analysis) {
        const factors = [];

        if (analysis.hasNumericCommon) {
            factors.push(String(analysis.numericGcd));
        }

        Object.keys(analysis.commonVariables || {}).sort().forEach(variable => {
            const degree = analysis.commonVariables[variable];
            factors.push(degree > 1 ? variable + "^" + degree : variable);
        });

        if (factors.length === 0) {
            factors.push("nessuno");
        }

        return factors;
    }

    function getMcdText(analysis) {
        if (!analysis.hasTotal) return "1";
        return monomialToText(
            analysis.hasNumericCommon ? analysis.numericGcd : 1,
            analysis.commonVariables || {}
        );
    }

    function divideTermByMcd(term, analysis) {
        const factorText = getMcdText(analysis);
        return divideMonomialText(term.raw || term.original || String(term), factorText);
    }

    function buildTerm(coeff, degree) {
        if (degree === 0) return String(coeff);

        let coeffText = "";
        if (coeff === 1) coeffText = "";
        else if (coeff === -1) coeffText = "-";
        else coeffText = String(coeff);

        if (degree === 1) return coeffText + "x";
        return coeffText + "x^" + degree;
    }

    function joinTerms(terms) {
        let result = "";

        terms.forEach((term, index) => {
            if (index === 0) result += term;
            else if (term.startsWith("-")) result += term;
            else result += "+" + term;
        });

        return result;
    }

    function getMethodsByTermCount(count) {
        if (count === 2) return ["differenza_quadrati", "differenza_cubi", "somma_cubi", "ruffini"];
        if (count === 3) return ["quadrato_binomio", "trinomio_speciale", "ruffini"];
        if (count === 4) return ["raccoglimento_parziale", "cubo_binomio", "ruffini"];
        if (count === 5) return ["ruffini"];
        if (count === 6) return ["raccoglimento_parziale", "quadrato_trinomio", "ruffini"];
        if (count === 7) return ["ruffini"];
        if (count >= 8 && count % 2 === 0) return ["raccoglimento_parziale", "ruffini"];
        return ["ruffini"];
    }

    function updateHeader() {
        currentPolyBox.textContent = pretty(state.currentPolynomial || state.originalInput);
        builtFactorizationBox.textContent = state.builtFactors.length
            ? state.builtFactors.map(pretty).join(" · ") + (state.remainingPolynomial ? " · (" + pretty(state.remainingPolynomial) + ")" : "")
            : "—";

        stepLabel.textContent = "Step";
        stepTitle.textContent = getStepTitle();
        progressBar.style.width = state.progress + "%";
    }

    function getStepTitle() {
        const titles = {
            input: "Inserisci il polinomio",
            totalQuestion: "Controllo del raccoglimento totale",
            totalApply: "Applica il raccoglimento totale",
            countTerms: "Conta i termini",
            chooseMethod: "Scegli il metodo possibile",
            methodStub: "Metodo guidato",
            finalCheck: "Controllo finale"
        };
        return titles[state.step] || "ScompoLab";
    }

    function render() {
        updateHeader();

        if (state.step === "input") renderInput();
        if (state.step === "totalQuestion") renderTotalQuestion();
        if (state.step === "totalApply") renderTotalApply();
        if (state.step === "countTerms") renderCountTerms();
        if (state.step === "chooseMethod") renderChooseMethod();
        if (state.step === "methodStub") renderMethodStub();
        if (state.step === "finalCheck") renderFinalCheck();
    }

    function setStep(step, progress) {
        state.step = step;
        state.progress = progress;
        render();
    }

    function alertBox(type, text) {
        return "<div class='alert alert-" + type + " mb-0'>" + text + "</div>";
    }

    function isVisibleButton(button) {
        return button &&
            button.tagName === "BUTTON" &&
            !button.disabled &&
            button.offsetParent !== null;
    }

    function getKeyboardGroup(button) {
        return button.closest(
            ".scompolab-option-grid, .scompolab-methods, .scompolab-actions, .scompolab-poly-display, .scompolab-keyboard, .scompolab-examples"
        );
    }

    function focusSiblingButton(currentButton, direction) {
        const group = getKeyboardGroup(currentButton);
        if (!group) return;

        const buttons = Array.from(group.querySelectorAll("button")).filter(isVisibleButton);
        const currentIndex = buttons.indexOf(currentButton);

        if (currentIndex === -1 || buttons.length <= 1) return;

        const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
        buttons[nextIndex].focus();
    }

    function setupKeyboardNavigation() {
        app.querySelectorAll("button").forEach(button => {
            button.setAttribute("tabindex", button.disabled ? "-1" : "0");
        });
    }

    app.addEventListener("keydown", function (event) {
        const target = event.target;

        if (target && target.id === "polyInput" && event.key === "Enter") {
            const startButton = document.getElementById("startWizard");
            if (startButton && !startButton.disabled) {
                event.preventDefault();
                startButton.click();
            }
            return;
        }

        if (!target || target.tagName !== "BUTTON") return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!target.disabled) target.click();
            return;
        }

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            focusSiblingButton(target, 1);
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            focusSiblingButton(target, -1);
        }
    });

    const scompolabUiObserver = new MutationObserver(function () {
        setupActionBars();
        setupKeyboardNavigation();
    });

    scompolabUiObserver.observe(app, {
        childList: true,
        subtree: true
    });

    function setupActionBars() {
        app.querySelectorAll(".scompolab-actions").forEach(bar => {
            bar.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3");
        });
    }

    function addContinueButton(containerId, label, callback) {
        const feedbackContainer = document.getElementById(containerId);
        if (!feedbackContainer) return;

        let actionsBar = feedbackContainer.nextElementSibling;

        if (!actionsBar || !actionsBar.classList.contains("scompolab-actions")) {
            actionsBar = app.querySelector(".scompolab-actions");
        }

        if (!actionsBar) {
            feedbackContainer.insertAdjacentHTML(
                "afterend",
                "<div class='scompolab-actions d-flex justify-content-between align-items-center mt-3'></div>"
            );
            actionsBar = feedbackContainer.nextElementSibling;
        }

        setupActionBars();

        const buttonId = containerId + "Continue";

        actionsBar.querySelectorAll(".btn-success").forEach(button => {
            button.remove();
        });

        actionsBar.insertAdjacentHTML(
            "beforeend",
            "<button type='button' class='btn btn-success ml-auto' id='" + buttonId + "'>" +
            label +
            "</button>"
        );

        const continueButton = document.getElementById(buttonId);
        continueButton.addEventListener("click", callback);
        continueButton.focus();
        setupKeyboardNavigation();
    }

    function disableButtons(selector) {
        app.querySelectorAll(selector).forEach(button => {
            button.disabled = true;
            button.classList.add("disabled");
            button.setAttribute("tabindex", "-1");
        });
    }

    function renderTerms(terms, selectable = false, selected = []) {
        return "<div class='scompolab-poly-display small'>" +
            terms.map((term, index) => {
                const cls = selected.includes(index) ? " selected" : "";
                const attrs = selectable ? " data-term-index='" + index + "'" : "";
                return "<button type='button' class='scompolab-term" + cls + "'" + attrs + ">" + pretty(term.raw) + "</button>";
            }).join("") +
            "</div>";
    }

    function renderInput() {
        app.innerHTML = `
            <h3>Inserisci il polinomio</h3>
            <p class="font-weight-300">
                Scrivilo usando <code>x</code>, <code>^</code> per le potenze e i segni <code>+</code> e <code>-</code>.
            </p>
            
            <div class="scompolab-keyboard mb-3">
            <p class="font-weight-300 mb-0">Oppure clicca sui seguenti input: </p>
                <button type="button" data-insert="x">x</button>
                <button type="button" data-insert="^2">x²</button>
                <button type="button" data-insert="^3">x³</button>
                <button type="button" data-insert="+">+</button>
                <button type="button" data-insert="-">−</button>
                <button type="button" data-insert="(">(</button>
                <button type="button" data-insert=")">)</button>
            </div>

            <p class="font-weight-500 mb-0">Polinomio</p>
            <div class="d-flex align-items-center justify-content-center justify-content-md-between mb-3">
                <div class="form-group w-md-75">
                    <input type="text" class="form-control form-control-lg" id="polyInput" placeholder="Esempio: 6x^2 + 9x">
                </div>
                
                <div class="scompolab-actions w-md-25">
                    <button type="button" class="btn btn-secondary mt-0" id="startWizard">Inizia</button>
                </div>
            </div>

            

            <div class="scompolab-examples mb-4">
                <span class="small text-black-50 mr-2">Esempi rapidi:</span>
                <button type="button" data-example="6x^2 + 9x">Totale</button>
                <button type="button" data-example="x^2 - 16">Differenza quadrati</button>
                <button type="button" data-example="x^2 + 5x + 6">Trinomio speciale</button>
                <button type="button" data-example="ax + x + a + 1">Parziale</button>
                <button type="button" data-example="x^3 + 4x^2 - 7x - 10">Ruffini</button>
            </div>

            <div id="inputFeedback" class="scompolab-feedback"></div>

            
        `;

        const input = document.getElementById("polyInput");

        app.querySelectorAll("[data-insert]").forEach(btn => {
            btn.addEventListener("click", () => {
                input.value += btn.dataset.insert;
                input.focus();
            });
        });

        app.querySelectorAll("[data-example]").forEach(btn => {
            btn.addEventListener("click", () => {
                input.value = btn.dataset.example;
                input.focus();
            });
        });

        document.getElementById("startWizard").addEventListener("click", () => {
            const value = input.value.trim();
            const feedback = document.getElementById("inputFeedback");

            if (!value) {
                feedback.innerHTML = alertBox("warning", "Inserisci un polinomio prima di iniziare.");
                return;
            }

            state.originalInput = value;
            state.currentPolynomial = value;
            state.remainingPolynomial = value;
            state.analysis = analyze(value);
            state.builtFactors = [];
            state.selectedCommonFactors = [];
            state.selectedMethod = null;

            setStep("totalQuestion", 25);
        });
    }

    function renderTotalQuestion() {
        const a = state.analysis;
        const options = buildCommonFactorOptions(a);

        app.innerHTML = `
            <h3>Prima verifica: raccoglimento totale</h3>
            <p class="text-black-60">
                Prima di tutto controlliamo se esiste un fattore comune a <strong>tutti</strong> i termini.
            </p>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(a.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">Quali fattori sono comuni a tutti i termini?</p>
                <div class="scompolab-option-grid" id="commonFactorOptions">
                    ${options.map(opt => `
                        <button type="button" data-factor="${opt.value}">
                            ${opt.label}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="totalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToInput">Indietro</button>
            </div>
        `;

        const selected = new Set();

        function evaluateTotalSelection() {
            const feedback = document.getElementById("totalFeedback");
            const correct = getCorrectCommonFactors(a).sort().join("|");
            const answer = Array.from(selected).sort().join("|");

            if (!answer) {
                feedback.innerHTML = "";
                return;
            }

            if (answer === correct) {
                disableButtons("[data-factor]");

                if (a.hasTotal) {
                    feedback.innerHTML = alertBox(
                        "success",
                        "Corretto. Il fattore comune da raccogliere è <strong>" + pretty(getMcdText(a)) + "</strong>."
                    );

                    addContinueButton("totalFeedback", "Continua", () => setStep("totalApply", 40));
                } else {
                    feedback.innerHTML = alertBox(
                        "success",
                        "Corretto. Non c'è un fattore comune diverso da 1. Passiamo al conteggio dei termini."
                    );

                    addContinueButton("totalFeedback", "Continua", () => setStep("countTerms", 40));
                }
            } else {
                feedback.innerHTML = alertBox(
                    "warning",
                    "Non ancora. Ricontrolla: deve essere comune a <strong>tutti</strong> i termini, non solo ad alcuni."
                );
            }
        }

        app.querySelectorAll("[data-factor]").forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.dataset.factor;

                if (value === "nessuno") {
                    selected.clear();
                    selected.add("nessuno");
                    app.querySelectorAll("[data-factor]").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");
                    evaluateTotalSelection();
                    return;
                }

                if (selected.has("nessuno")) {
                    selected.delete("nessuno");
                    const noneButton = app.querySelector("[data-factor='nessuno']");
                    if (noneButton) noneButton.classList.remove("selected");
                }

                if (selected.has(value)) {
                    selected.delete(value);
                    btn.classList.remove("selected");
                } else {
                    selected.add(value);
                    btn.classList.add("selected");
                }

                evaluateTotalSelection();
            });
        });

        document.getElementById("backToInput").addEventListener("click", () => setStep("input", 10));
    }

    function buildCommonFactorOptions(a) {
        const options = [];

        if (a.numericGcd > 1) {
            options.push({ value: String(a.numericGcd), label: String(a.numericGcd) });
        }

        if (a.numericGcd > 2) {
            const smallerFactor = getProperNumericDivisor(a.numericGcd);
            if (smallerFactor > 1 && smallerFactor !== a.numericGcd) {
                options.push({ value: String(smallerFactor), label: String(smallerFactor) });
            }
        }

        Object.keys(a.commonVariables || {}).sort().forEach(variable => {
            const degree = a.commonVariables[variable];
            const value = degree > 1 ? variable + "^" + degree : variable;
            options.push({ value, label: pretty(value) });
        });

        const variablesInPolynomial = Array.from(new Set(
            a.terms.flatMap(term => Object.keys(term.variables || {}))
        )).sort();

        const firstNonCommonVariable = variablesInPolynomial.find(variable => !a.commonVariables || !a.commonVariables[variable]);

        if (firstNonCommonVariable) {
            options.push({ value: firstNonCommonVariable, label: firstNonCommonVariable });
        }

        if (!a.hasTotal && variablesInPolynomial.length > 0) {
            options.push({ value: variablesInPolynomial[0], label: variablesInPolynomial[0] });
        }

        options.push({ value: "nessuno", label: "Nessuno" });

        const seen = new Set();
        return options.filter(opt => {
            if (seen.has(opt.value)) return false;
            seen.add(opt.value);
            return true;
        });
    }

    function renderTotalApply() {
        const a = state.analysis;
        const mcd = getMcdText(a);
        const insideTerms = a.terms.map(term => divideTermByMcd(term, a));
        const insidePoly = joinTerms(insideTerms);
        const distractors = buildInsideParenthesisOptions(insidePoly, a);

        app.innerHTML = `
            <h3>Applichiamo il raccoglimento totale</h3>
            <p class="text-black-60">
                Abbiamo deciso di mettere in evidenza <strong>${pretty(mcd)}</strong>.
                Ora scegli quale polinomio deve rimanere dentro la parentesi.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ${pretty(mcd)}( ? )
            </div>

            <div class="scompolab-option-grid" id="insideOptions">
                ${distractors.map(opt => `
                    <button type="button" data-inside="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="insideFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToTotal">Indietro</button>
                <button type="button" class="btn btn-success" id="checkInside" disabled>Controlla</button>
            </div>
        `;

        let selectedInside = null;
        const checkBtn = document.getElementById("checkInside");

        app.querySelectorAll("[data-inside]").forEach(btn => {
            btn.addEventListener("click", () => {
                selectedInside = btn.dataset.inside;
                app.querySelectorAll("[data-inside]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                checkBtn.disabled = false;
                checkBtn.setAttribute("tabindex", "0");
            });
        });

        document.getElementById("backToTotal").addEventListener("click", () => setStep("totalQuestion", 25));

        checkBtn.addEventListener("click", () => {
            const feedback = document.getElementById("insideFeedback");

            if (selectedInside === insidePoly) {
                disableButtons("[data-inside], #checkInside");

                state.builtFactors.push(mcd);
                state.remainingPolynomial = insidePoly;
                state.currentPolynomial = insidePoly;
                state.analysis = analyze(insidePoly);

                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty(mcd) + "(" + pretty(insidePoly) + ")</strong>."
                );

                addContinueButton("insideFeedback", "Continua", () => setStep("finalCheck", 80));
            } else {
                feedback.innerHTML = alertBox(
                    "warning",
                    "Non ancora. Ricorda: ogni termine va diviso per il fattore raccolto."
                );
            }
        });
    }

    function buildInsideParenthesisOptions(correct, a) {
        const mcd = getMcdText(a);
        const firstCommonVariable = Object.keys(a.commonVariables || {})[0] || "";
        const literalOnly = firstCommonVariable ? firstCommonVariable : mcd;

        const wrongNoDivision = joinTerms(a.terms.map(t => t.raw));
        const wrongOnlyNumber = a.hasNumericCommon
            ? joinTerms(a.terms.map(t => monomialToText(t.coefficient / a.numericGcd, t.variables || {})))
            : wrongNoDivision;

        const wrongOnlyLiteral = firstCommonVariable
            ? joinTerms(a.terms.map(t => divideMonomialText(t.raw, literalOnly)))
            : wrongNoDivision;

        const values = [
            { value: correct, label: correct },
            { value: wrongOnlyNumber, label: wrongOnlyNumber },
            { value: wrongOnlyLiteral, label: wrongOnlyLiteral },
            { value: wrongNoDivision, label: wrongNoDivision }
        ];

        const seen = new Set();
        return values.filter(item => {
            if (!item.value || seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        }).slice(0, 4);
    }

    function renderCountTerms() {
        const a = state.analysis;
        const options = buildTermCountOptions(a.termCount);

        app.innerHTML = `
            <h3>Conta i termini</h3>
            <p class="text-black-60">
                Conta i blocchi separati dai segni <strong>+</strong> e <strong>−</strong>.
            </p>

            <div class="scompolab-analysis">
                ${renderTerms(a.terms)}
            </div>

            <div class="scompolab-option-grid mt-4" id="termCountOptions">
                ${options.map(n => `
                    <button type="button" data-count="${n}">
                        ${n} termini
                    </button>
                `).join("")}
            </div>

            <div id="countFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToTotalQuestion">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-count]").forEach(btn => {
            btn.addEventListener("click", () => {
                const answer = parseInt(btn.dataset.count, 10);
                const feedback = document.getElementById("countFeedback");

                app.querySelectorAll("[data-count]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (answer === a.termCount) {
                    disableButtons("[data-count]");

                    feedback.innerHTML = alertBox(
                        "success",
                        "Corretto: il polinomio ha <strong>" + a.termCount + "</strong> termini."
                    );

                    addContinueButton("countFeedback", "Continua", () => setStep("chooseMethod", 55));
                } else {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Guarda bene i segni: ogni blocco è un termine."
                    );
                }
            });
        });

        document.getElementById("backToTotalQuestion").addEventListener("click", () => setStep("totalQuestion", 25));
    }

    function buildTermCountOptions(correct) {
        const values = [correct, correct - 1, correct + 1, correct + 2].filter(n => n > 0);
        return Array.from(new Set(values)).sort((a, b) => a - b);
    }

    function renderChooseMethod() {
        const methods = getMethodsByTermCount(state.analysis.termCount);

        app.innerHTML = `
            <h3>Scegli il metodo possibile</h3>
            <p class="text-black-60">
                Ora non mostriamo tutti i metodi: filtriamo solo quelli compatibili con il numero di termini.
            </p>

            <div class="scompolab-methods" id="methodOptions">
                ${methods.map(method => `
                    <button type="button" data-method="${method}">
                        ${methodNames[method]}
                        <small>${getMethodHint(method)}</small>
                    </button>
                `).join("")}
            </div>

            <div id="methodFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToCount">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-method]").forEach(btn => {
            btn.addEventListener("click", () => {
                const method = btn.dataset.method;
                state.selectedMethod = method;

                app.querySelectorAll("[data-method]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                disableButtons("[data-method]");

                const feedback = document.getElementById("methodFeedback");
                feedback.innerHTML = alertBox(
                    "info",
                    "Hai scelto <strong>" + methodNames[method] + "</strong>. Ora passiamo al percorso guidato del metodo."
                );

                addContinueButton("methodFeedback", "Continua", () => {
                    if (method === "differenza_quadrati") {
                        renderDifferenceSquares();
                    } else if (method === "differenza_cubi") {
                        renderDifferenceCubes();
                    } else if (method === "somma_cubi") {
                        renderSumCubes();
                    } else if (method === "quadrato_binomio") {
                        renderSquareBinomial();
                    } else if (method === "quadrato_trinomio") {
                        renderSquareTrinomial();
                    } else if (method === "cubo_binomio") {
                        renderCubeBinomial();
                    } else if (method === "trinomio_speciale") {
                        renderSpecialTrinomial();
                    } else if (method === "raccoglimento_parziale") {
                        renderPartialPrototype();
                    } else if (method === "ruffini") {
                        renderRuffiniGuided();
                    } else {
                        setStep("methodStub", 70);
                    }
                });
            });
        });

        document.getElementById("backToCount").addEventListener("click", () => setStep("countTerms", 40));
    }

    function getMethodHint(method) {
        const hints = {
            differenza_quadrati: "2 termini: quadrati perfetti e sottrazione.",
            differenza_cubi: "2 termini: cubi perfetti e sottrazione.",
            somma_cubi: "2 termini: cubi perfetti e somma.",
            quadrato_binomio: "3 termini: due quadrati e doppio prodotto.",
            trinomio_speciale: "3 termini: somma e prodotto.",
            raccoglimento_parziale: "Numero pari di termini: gruppi con parentesi uguali.",
            cubo_binomio: "4 termini: sviluppo del cubo di binomio.",
            quadrato_trinomio: "6 termini: tre quadrati e tre doppi prodotti.",
            ruffini: "Cerco uno zero del polinomio."
        };
        return hints[method] || "";
    }

    function isPerfectSquareNumber(n) {
        const root = Math.sqrt(Math.abs(n));
        return Number.isInteger(root);
    }

    function getSquareBase(term) {
        const parsed = parseMonomialText(term.raw || term.original || String(term));

        if (!isPerfectSquareNumber(parsed.absCoefficient)) return null;

        const baseVariables = {};

        for (const variable of Object.keys(parsed.variables)) {
            const degree = parsed.variables[variable];
            if (degree % 2 !== 0) return null;
            baseVariables[variable] = degree / 2;
        }

        const coeffRoot = Math.sqrt(parsed.absCoefficient);

        return monomialToText(coeffRoot, baseVariables);
    }

    function analyzeDifferenceSquares(poly) {
        const terms = splitTerms(poly).map(term => {
            const parsed = parseMonomialText(term);
            return {
                raw: term,
                coefficient: parsed.coefficient,
                absCoefficient: parsed.absCoefficient,
                variables: parsed.variables
            };
        });

        if (terms.length !== 2) {
            return {
                valid: false,
                reason: "La differenza di quadrati si applica solo a polinomi con due termini."
            };
        }

        const positiveTerm = terms.find(t => t.coefficient > 0);
        const negativeTerm = terms.find(t => t.coefficient < 0);

        if (!positiveTerm || !negativeTerm) {
            return {
                valid: false,
                reason: "Serve una sottrazione tra due quadrati: un termine positivo e uno negativo."
            };
        }

        const baseA = getSquareBase(positiveTerm);
        const baseB = getSquareBase(negativeTerm);

        if (!baseA || !baseB) {
            return {
                valid: false,
                reason: "I due termini devono essere quadrati perfetti: coefficienti quadrati perfetti ed esponenti tutti pari."
            };
        }

        return {
            valid: true,
            positiveTerm,
            negativeTerm,
            baseA,
            baseB,
            factor1: baseA + "-" + baseB,
            factor2: baseA + "+" + baseB
        };
    }

    function renderDifferenceSquares() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const diff = analyzeDifferenceSquares(state.currentPolynomial);

        if (!diff.valid) {
            app.innerHTML = `
            <h3>Differenza di quadrati</h3>

            ${alertBox("warning", diff.reason)}

            <div class="scompolab-actions mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
            </div>
        `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const baseOptions = buildDifferenceSquareBaseOptions(diff);

        app.innerHTML = `
        <h3>Differenza di quadrati</h3>

        <p class="text-black-60">
            La forma da riconoscere è:
            <strong>a² − b² = (a − b)(a + b)</strong>.
        </p>

        <div class="scompolab-analysis">
            <p class="mb-2">Termini del polinomio:</p>
            ${renderTerms(state.analysis.terms)}
        </div>

        <div class="scompolab-question mt-4">
            <p class="mb-3">
                Quali sono le basi dei due quadrati?
            </p>

            <div class="scompolab-option-grid">
                ${baseOptions.map(opt => `
                    <button type="button" data-bases="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>
        </div>

        <div id="diffSquaresFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const answer = btn.dataset.bases;
                const correct = diff.baseA + "|" + diff.baseB;
                const feedback = document.getElementById("diffSquaresFeedback");

                app.querySelectorAll("[data-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (answer !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere la base del quadrato positivo e la base del quadrato sottratto."
                    );
                    return;
                }

                disableButtons("[data-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi sono <strong>" + pretty(diff.baseA) + "</strong> e <strong>" + pretty(diff.baseB) + "</strong>."
                );

                addContinueButton("diffSquaresFeedback", "Continua", () => renderDifferenceSquaresFormula(diff));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function buildDifferenceSquareBaseOptions(diff) {
        const correct = {
            value: diff.baseA + "|" + diff.baseB,
            label: diff.baseA + " e " + diff.baseB
        };

        const wrong1 = {
            value: diff.baseB + "|" + diff.baseA,
            label: diff.baseB + " e " + diff.baseA
        };

        const wrong2 = {
            value: diff.positiveTerm.raw + "|" + diff.negativeTerm.raw,
            label: diff.positiveTerm.raw + " e " + diff.negativeTerm.raw
        };

        const wrong3 = {
            value: diff.baseA + "|-" + diff.baseB,
            label: diff.baseA + " e -" + diff.baseB
        };

        const values = [correct, wrong1, wrong2, wrong3];
        const seen = new Set();

        return values.filter(item => {
            if (seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        });
    }

    function renderDifferenceSquaresFormula(diff) {
        const formulaOptions = [
            {
                value: "correct",
                label: "(" + diff.factor1 + ")(" + diff.factor2 + ")"
            },
            {
                value: "wrong_signs",
                label: "(" + diff.baseA + "-" + diff.baseB + ")(" + diff.baseA + "-" + diff.baseB + ")"
            },
            {
                value: "wrong_plus",
                label: "(" + diff.baseA + "+" + diff.baseB + ")(" + diff.baseA + "+" + diff.baseB + ")"
            },
            {
                value: "wrong_order",
                label: "(" + diff.baseB + "-" + diff.baseA + ")(" + diff.baseB + "+" + diff.baseA + ")"
            }
        ];

        app.innerHTML = `
        <h3>Costruisci la scomposizione</h3>

        <p class="text-black-60">
            Ora usa la formula della differenza di quadrati.
        </p>

        <div class="scompolab-formula mb-3">
            ${pretty(state.currentPolynomial)} = ?
        </div>

        <div class="scompolab-option-grid">
            ${formulaOptions.map(opt => `
                <button type="button" data-factorization="${opt.value}">
                    ${pretty(opt.label)}
                </button>
            `).join("")}
        </div>

        <div id="diffFormulaFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToDiffStart">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-factorization]").forEach(btn => {
            btn.addEventListener("click", () => {
                const answer = btn.dataset.factorization;
                const feedback = document.getElementById("diffFormulaFeedback");

                app.querySelectorAll("[data-factorization]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (answer !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Ricorda: nella differenza di quadrati servono due parentesi con segni opposti."
                    );
                    return;
                }

                disableButtons("[data-factorization]");

                state.builtFactors.push("(" + diff.factor1 + ")");
                state.builtFactors.push("(" + diff.factor2 + ")");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";
                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" +
                    pretty(state.originalInput) +
                    " = (" +
                    pretty(diff.factor1) +
                    ")(" +
                    pretty(diff.factor2) +
                    ")</strong>."
                );

                addContinueButton("diffFormulaFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToDiffStart").addEventListener("click", renderDifferenceSquares);
    }

    function renderCompletedFactorization() {
        state.step = "finalCheck";
        state.progress = 100;
        updateHeader();

        app.innerHTML = `
        <h3>Scomposizione conclusa</h3>

        <div class="scompolab-summary">
            <p><strong>Scomposizione ottenuta:</strong></p>
            <div class="scompolab-formula">
                ${pretty(state.originalInput)} = ${state.builtFactors.map(pretty).join(" · ")}
            </div>
        </div>

        ${alertBox("success", "La scomposizione è stata completata correttamente.")}

        <div class="scompolab-actions mt-3">
            <button type="button" class="btn btn-outline-success" id="tryAnother">Scomponi un altro polinomio</button>
        </div>
    `;

        document.getElementById("tryAnother").addEventListener("click", reset);
    }


    function buildTrinomialBase(baseDegree) {
        if (baseDegree === 1) return "x";
        return "x^" + baseDegree;
    }

    function formatSignedNumber(n) {
        if (n < 0) return String(n);
        return "+" + n;
    }

    function buildBinomialWithConstant(base, n) {
        if (n === 0) return base;
        return base + formatSignedNumber(n);
    }

    function getIntegerProductPairs(product, limit = 60) {
        const pairs = [];
        const seen = new Set();

        if (product === 0) {
            for (let i = -limit; i <= limit; i++) {
                const candidates = [[0, i], [i, 0]];

                candidates.forEach(pair => {
                    const key = pair.slice().sort((a, b) => a - b).join("|");
                    if (!seen.has(key)) {
                        seen.add(key);
                        pairs.push(pair);
                    }
                });
            }

            return pairs;
        }

        for (let i = -Math.abs(product); i <= Math.abs(product); i++) {
            if (i === 0) continue;

            if (product % i === 0) {
                const j = product / i;
                const key = [i, j].sort((a, b) => a - b).join("|");

                if (!seen.has(key)) {
                    seen.add(key);
                    pairs.push([i, j]);
                }
            }
        }

        return pairs;
    }

    function getSquareRootMonomialBaseFromParsed(parsed) {
        if (parsed.coefficient <= 0) return null;
        if (!isPerfectSquareNumber(parsed.absCoefficient)) return null;

        const baseVariables = {};

        for (const variable of Object.keys(parsed.variables)) {
            const degree = parsed.variables[variable];
            if (degree % 2 !== 0) return null;
            baseVariables[variable] = degree / 2;
        }

        const baseCoeff = Math.sqrt(parsed.absCoefficient);

        return {
            text: monomialToText(baseCoeff, baseVariables),
            coeff: baseCoeff,
            coefficient: baseCoeff,
            variables: baseVariables
        };
    }

    function getSpecialOtherBaseFromParsed(parsed) {
        const otherVariables = {};

        for (const variable of Object.keys(parsed.variables)) {
            const degree = parsed.variables[variable];
            if (degree % 2 !== 0) return null;
            otherVariables[variable] = degree / 2;
        }

        return {
            text: monomialToText(1, otherVariables),
            coeff: 1,
            coefficient: 1,
            variables: otherVariables,
            product: parsed.coefficient
        };
    }

    function addVariables(varsA, varsB) {
        const result = cloneVariables(varsA);

        Object.keys(varsB || {}).forEach(variable => {
            result[variable] = (result[variable] || 0) + varsB[variable];
        });

        Object.keys(result).forEach(variable => {
            if (result[variable] === 0) delete result[variable];
        });

        return result;
    }

    function buildBinomialWithMonomial(baseText, scalar, monomialBase) {
        const termText = monomialToText(scalar, monomialBase.variables || {});

        if (termText.startsWith("-")) {
            return baseText + termText;
        }

        return baseText + "+" + termText;
    }

    function analyzeSpecialTrinomial(poly) {
        const terms = splitTerms(poly).map(term => ({
            raw: term,
            parsed: parseMonomialText(term)
        }));

        if (terms.length !== 3) {
            return {
                valid: false,
                reason: "Il trinomio speciale richiede tre termini."
            };
        }

        for (let highIndex = 0; highIndex < terms.length; highIndex++) {
            const highTerm = terms[highIndex];
            const base = getSquareRootMonomialBaseFromParsed(highTerm.parsed);

            if (!base) continue;

            for (let lowIndex = 0; lowIndex < terms.length; lowIndex++) {
                if (lowIndex === highIndex) continue;

                const lowTerm = terms[lowIndex];
                const otherBase = getSpecialOtherBaseFromParsed(lowTerm.parsed);

                if (!otherBase) continue;

                const middleTerm = terms.find((_, index) => index !== highIndex && index !== lowIndex);
                const expectedMiddleVariables = addVariables(base.variables, otherBase.variables);

                if (variableSignature(middleTerm.parsed.variables) !== variableSignature(expectedMiddleVariables)) {
                    continue;
                }

                const denominator = base.coeff * otherBase.coeff;

                if (denominator === 0 || middleTerm.parsed.coefficient % denominator !== 0) {
                    continue;
                }

                const sum = middleTerm.parsed.coefficient / denominator;
                const product = otherBase.product;
                const productCandidates = getIntegerProductPairs(product);
                const validPairs = productCandidates.filter(pair => pair[0] + pair[1] === sum);

                if (validPairs.length === 0) continue;

                const baseDegreeLabel = Object.values(base.variables).reduce((total, degree) => total + degree, 0);
                const otherDegreeLabel = Object.values(otherBase.variables).reduce((total, degree) => total + degree, 0);

                return {
                    valid: true,
                    highDegree: baseDegreeLabel * 2,
                    middleDegree: baseDegreeLabel + otherDegreeLabel,
                    baseDegree: baseDegreeLabel,
                    base: base.text,
                    otherBase: otherBase.text,
                    otherBaseInfo: otherBase,
                    sum,
                    product,
                    roots: validPairs[0],
                    productCandidates,
                    highTerm: highTerm.raw,
                    middleTerm: middleTerm.raw,
                    lowTerm: lowTerm.raw,
                    generalized: true
                };
            }
        }

        return {
            valid: false,
            reason: "Non riconosco una forma del tipo A² + sAB + pB², con A e B monomi."
        };
    }

    function buildSpecialTrinomialPairOptions(trinomial) {
        const [correctA, correctB] = trinomial.roots;
        const options = [
            {
                value: correctA + "|" + correctB,
                label: correctA + " e " + correctB
            }
        ];

        trinomial.productCandidates.forEach(pair => {
            if (options.length >= 4) return;

            const [a, b] = pair;
            const value = a + "|" + b;

            if (value === options[0].value || (b + "|" + a) === options[0].value) return;

            options.push({
                value,
                label: a + " e " + b
            });
        });

        let filler = 1;
        while (options.length < 4) {
            const a = correctA + filler;
            const b = correctB - filler;
            const value = a + "|" + b;

            if (!options.some(opt => opt.value === value)) {
                options.push({
                    value,
                    label: a + " e " + b
                });
            }

            filler++;
        }

        return options;
    }

    function renderSpecialTrinomial() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const trinomial = analyzeSpecialTrinomial(state.currentPolynomial);

        if (!trinomial.valid) {
            app.innerHTML = `
                <h3>Trinomio speciale</h3>

                <div class="scompolab-rule-box mb-3">
                    <p class="mb-1"><strong>Regola generale</strong></p>
                    <p class="mb-1">Un trinomio speciale può avere forma:</p>
                    <div class="scompolab-formula">A² + sAB + pB²</div>
                    <p class="mb-0">A e B possono essere monomi: ad esempio x e a, oppure x² e y.</p>
                </div>

                ${alertBox("warning", trinomial.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        app.innerHTML = `
            <h3>Trinomio speciale</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <p class="mb-1">Un trinomio speciale ha forma:</p>
                <div class="scompolab-formula">xⁿ + sxⁿᐟ² + p</div>
                <p class="mb-0">Il grado centrale deve essere metà del grado massimo.</p>
            </div>

            <div class="scompolab-rule-box">
                <p class="mb-2">Nel nostro caso:</p>

                <ul class="mb-3">
                    <li>primo monomio base = <strong>${pretty(trinomial.base)}</strong></li>
                    <li>secondo monomio base = <strong>${pretty(trinomial.otherBase)}</strong></li>
                    <li>termine centrale = <strong>${pretty(trinomial.middleTerm)}</strong></li>
                    <li>coefficiente/prodotto davanti a B² = <strong>${trinomial.product}</strong></li>
                </ul>

                <p class="mb-0">
                    Ora dobbiamo trovare due numeri che abbiano
                    <strong>prodotto ${trinomial.product}</strong> e
                    <strong>somma ${trinomial.sum}</strong>.
                </p>
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Da quale dato conviene partire per cercare i due numeri?
                </p>

                <div class="scompolab-option-grid">
                    <button type="button" data-start-from="product">Dal prodotto ${trinomial.product}</button>
                    <button type="button" data-start-from="sum">Dalla somma ${trinomial.sum}</button>
                    <button type="button" data-start-from="degree">Dal grado massimo ${trinomial.highDegree}</button>
                </div>
            </div>

            <div id="trinomialStartFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-start-from]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("trinomialStartFeedback");

                app.querySelectorAll("[data-start-from]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.startFrom !== "product") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non conviene. Le coppie che hanno una certa somma sono infinite; invece le coppie che hanno prodotto " +
                        trinomial.product +
                        " sono finite."
                    );
                    return;
                }

                disableButtons("[data-start-from]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Esatto: partiamo dal prodotto, perché le coppie di numeri che moltiplicate danno " +
                    trinomial.product +
                    " sono finite. Poi controlleremo quale coppia ha somma " +
                    trinomial.sum +
                    "."
                );

                addContinueButton("trinomialStartFeedback", "Continua", () => renderSpecialTrinomialPairs(trinomial));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderSpecialTrinomialPairs(trinomial) {
        const options = buildSpecialTrinomialPairOptions(trinomial);
        const correctValues = [
            trinomial.roots[0] + "|" + trinomial.roots[1],
            trinomial.roots[1] + "|" + trinomial.roots[0]
        ];

        app.innerHTML = `
            <h3>Cerca la coppia giusta</h3>

            <p class="text-black-60">
                Tra le coppie con prodotto <strong>${trinomial.product}</strong>, scegli quella che ha somma
                <strong>${trinomial.sum}</strong>.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)}
            </div>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-trinomial-pair="${opt.value}">
                        ${opt.label}
                    </button>
                `).join("")}
            </div>

            <div id="trinomialPairFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToTrinomialStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-trinomial-pair]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("trinomialPairFeedback");

                app.querySelectorAll("[data-trinomial-pair]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (!correctValues.includes(btn.dataset.trinomialPair)) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Questa coppia può anche avere il prodotto corretto, ma devi controllare anche la somma."
                    );
                    return;
                }

                disableButtons("[data-trinomial-pair]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" +
                    trinomial.roots[0] +
                    "</strong> e <strong>" +
                    trinomial.roots[1] +
                    "</strong> hanno prodotto " +
                    trinomial.product +
                    " e somma " +
                    trinomial.sum +
                    "."
                );

                addContinueButton("trinomialPairFeedback", "Continua", () => renderSpecialTrinomialFormula(trinomial));
            });
        });

        document.getElementById("backToTrinomialStart").addEventListener("click", renderSpecialTrinomial);
    }

    function renderSpecialTrinomialFormula(trinomial) {
        const [a, b] = trinomial.roots;
        const base = trinomial.base;
        const otherBase = trinomial.otherBaseInfo || { variables: {} };
        const factor1 = buildBinomialWithMonomial(base, a, otherBase);
        const factor2 = buildBinomialWithMonomial(base, b, otherBase);

        const options = [
            {
                value: "correct",
                label: "(" + factor1 + ")(" + factor2 + ")"
            },
            {
                value: "wrong_same_sign",
                label: "(" + buildBinomialWithMonomial(base, -a, otherBase) + ")(" + buildBinomialWithMonomial(base, -b, otherBase) + ")"
            },
            {
                value: "wrong_base",
                label: "(" + base + formatSignedNumber(a) + ")(" + base + formatSignedNumber(b) + ")"
            },
            {
                value: "wrong_sum",
                label: "(" + buildBinomialWithMonomial(base, a + b, otherBase) + ")(" + buildBinomialWithMonomial(base, a * b, otherBase) + ")"
            }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Costruisci la scomposizione</h3>

            <p class="text-black-60">
                Usiamo la forma generale:
                <strong>A² + sAB + pB² = (A + mB)(A + nB)</strong>.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-trinomial-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="trinomialFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToTrinomialPairs">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-trinomial-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("trinomialFinalFeedback");

                app.querySelectorAll("[data-trinomial-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.trinomialFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Nelle due parentesi devi usare la base " +
                        pretty(base) +
                        " e i due numeri trovati."
                    );
                    return;
                }

                disableButtons("[data-trinomial-final]");

                state.builtFactors.push("(" + factor1 + ")");
                state.builtFactors.push("(" + factor2 + ")");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";

                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" +
                    pretty(state.originalInput) +
                    " = (" +
                    pretty(factor1) +
                    ")(" +
                    pretty(factor2) +
                    ")</strong>."
                );

                addContinueButton("trinomialFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToTrinomialPairs").addEventListener("click", () => renderSpecialTrinomialPairs(trinomial));
    }



    function getSquareBaseInfo(term) {
        const parsed = parseMonomialText(term.raw || term.original || String(term));

        if (parsed.coefficient <= 0) return null;
        if (!isPerfectSquareNumber(parsed.absCoefficient)) return null;

        const baseVariables = {};

        Object.keys(parsed.variables || {}).forEach(variable => {
            const degree = parsed.variables[variable];
            if (degree % 2 !== 0) {
                baseVariables.__invalid = true;
            } else {
                baseVariables[variable] = degree / 2;
            }
        });

        if (baseVariables.__invalid) return null;
        delete baseVariables.__invalid;

        const coeff = Math.sqrt(parsed.absCoefficient);
        const text = monomialToText(coeff, baseVariables);

        return {
            text,
            coeff,
            coefficient: coeff,
            variables: baseVariables,
            squareText: term.raw || term.original || String(term)
        };
    }

    function getDoubleProductText(baseA, baseB, sign) {
        return multiplyBaseMonomials(baseA, baseB, 2 * sign);
    }

    function analyzeSquareBinomial(poly) {
        const a = analyze(poly);

        if (a.termCount !== 3) {
            return {
                valid: false,
                reason: "Il quadrato di binomio richiede tre termini."
            };
        }

        const terms = a.terms;

        for (let i = 0; i < terms.length; i++) {
            for (let j = i + 1; j < terms.length; j++) {
                const firstSquare = getSquareBaseInfo(terms[i]);
                const secondSquare = getSquareBaseInfo(terms[j]);

                if (!firstSquare || !secondSquare) continue;

                const middle = terms.find((_, index) => index !== i && index !== j);
                const positiveDoubleProduct = getDoubleProductText(firstSquare, secondSquare, 1);
                const negativeDoubleProduct = getDoubleProductText(firstSquare, secondSquare, -1);

                let sign = null;

                if (sameMonomialText(middle.raw, positiveDoubleProduct)) {
                    sign = 1;
                } else if (sameMonomialText(middle.raw, negativeDoubleProduct)) {
                    sign = -1;
                }

                if (sign !== null) {
                    return {
                        valid: true,
                        squareTermA: terms[i],
                        squareTermB: terms[j],
                        middleTerm: middle,
                        baseA: firstSquare,
                        baseB: secondSquare,
                        sign,
                        doubleProduct: getDoubleProductText(firstSquare, secondSquare, sign),
                        factor: firstSquare.text + (sign > 0 ? "+" : "-") + secondSquare.text
                    };
                }
            }
        }

        return {
            valid: false,
            reason: "Non riconosco due quadrati perfetti e un doppio prodotto coerente. Controlla che coefficienti ed esponenti delle variabili permettano una radice esatta."
        };
    }

    function buildSquareBinomialBaseOptions(square) {
        const correct = {
            value: square.baseA.text + "|" + square.baseB.text,
            label: square.baseA.text + " e " + square.baseB.text
        };

        const wrong1 = {
            value: square.baseB.text + "|" + square.baseA.text,
            label: square.baseB.text + " e " + square.baseA.text
        };

        const wrong2 = {
            value: square.squareTermA.raw + "|" + square.squareTermB.raw,
            label: square.squareTermA.raw + " e " + square.squareTermB.raw
        };

        const wrong3 = {
            value: square.baseA.text + "|" + square.middleTerm.raw,
            label: square.baseA.text + " e " + square.middleTerm.raw
        };

        const seen = new Set();
        return [correct, wrong1, wrong2, wrong3].filter(item => {
            if (seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        });
    }

    function renderSquareBinomial() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const square = analyzeSquareBinomial(state.currentPolynomial);

        if (!square.valid) {
            app.innerHTML = `
                <h3>Quadrato di binomio</h3>

                ${alertBox("warning", square.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildSquareBinomialBaseOptions(square);

        app.innerHTML = `
            <h3>Quadrato di binomio</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <div class="scompolab-formula">A² ± 2AB + B² = (A ± B)²</div>
                <p class="mb-0">
                    Non deve essere per forza un trinomio di secondo grado: le basi possono essere anche x², x³, 2x², ecc.
                </p>
            </div>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(state.analysis.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Quali sono le basi dei due quadrati perfetti?
                </p>

                <div class="scompolab-option-grid">
                    ${options.map(opt => `
                        <button type="button" data-square-bases="${opt.value}">
                            ${pretty(opt.label)}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="squareBinomialFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-square-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("squareBinomialFeedback");
                const correct = square.baseA.text + "|" + square.baseB.text;

                app.querySelectorAll("[data-square-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.squareBases !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere le basi dei due quadrati perfetti, non i quadrati già sviluppati."
                    );
                    return;
                }

                disableButtons("[data-square-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi sono <strong>" + pretty(square.baseA.text) + "</strong> e <strong>" + pretty(square.baseB.text) + "</strong>."
                );

                addContinueButton("squareBinomialFeedback", "Continua", () => renderSquareBinomialProduct(square));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderSquareBinomialProduct(square) {
        const wrongSign = getDoubleProductText(square.baseA, square.baseB, -square.sign);
        const wrongSingleProduct = multiplyBaseMonomials(square.baseA, square.baseB, square.sign);
        const wrongSquareSum = joinTerms([square.squareTermA.raw, square.squareTermB.raw]);

        const options = [
            { value: "correct", label: square.doubleProduct },
            { value: "wrong_sign", label: wrongSign },
            { value: "wrong_single", label: wrongSingleProduct },
            { value: "wrong_squares", label: wrongSquareSum }
        ];

        app.innerHTML = `
            <h3>Controlla il doppio prodotto</h3>

            <p class="text-black-60">
                Ora verifichiamo il termine centrale: deve essere <strong>2AB</strong>, con il segno corretto.
            </p>

            <div class="scompolab-formula mb-3">
                A = ${pretty(square.baseA.text)}, &nbsp; B = ${pretty(square.baseB.text)}
            </div>

            <p class="mb-3">Qual è il doppio prodotto presente nel trinomio?</p>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-double-product="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="doubleProductFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToSquareStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-double-product]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("doubleProductFeedback");

                app.querySelectorAll("[data-double-product]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.doubleProduct !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Il termine centrale deve essere il doppio prodotto delle due basi, con il suo segno."
                    );
                    return;
                }

                disableButtons("[data-double-product]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: il doppio prodotto è <strong>" + pretty(square.doubleProduct) + "</strong>."
                );

                addContinueButton("doubleProductFeedback", "Continua", () => renderSquareBinomialFormula(square));
            });
        });

        document.getElementById("backToSquareStart").addEventListener("click", renderSquareBinomial);
    }

    function renderSquareBinomialFormula(square) {
        const correctLabel = "(" + square.factor + ")^2";
        const oppositeSign = square.baseA.text + (square.sign > 0 ? "-" : "+") + square.baseB.text;

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_opposite", label: "(" + oppositeSign + ")^2" },
            { value: "wrong_product", label: "(" + square.baseA.text + ")(" + square.baseB.text + ")" },
            { value: "wrong_no_square", label: "(" + square.factor + ")" }
        ];

        app.innerHTML = `
            <h3>Costruisci la scomposizione</h3>

            <p class="text-black-60">
                Se i due quadrati e il doppio prodotto sono coerenti, il trinomio è il quadrato di un binomio.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-square-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="squareFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToDoubleProduct">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-square-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("squareFinalFeedback");

                app.querySelectorAll("[data-square-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.squareFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Il segno del binomio deve essere quello del termine centrale e tutta la parentesi va elevata al quadrato."
                    );
                    return;
                }

                disableButtons("[data-square-final]");

                state.builtFactors.push("(" + square.factor + ")^2");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";
                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty("(" + square.factor + ")^2") + "</strong>."
                );

                addContinueButton("squareFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToDoubleProduct").addEventListener("click", () => renderSquareBinomialProduct(square));
    }



    function cloneVariables(vars) {
        return Object.assign({}, vars || {});
    }

    function variableSignature(variables) {
        return Object.keys(variables || {})
            .filter(variable => variables[variable] !== 0)
            .sort()
            .map(variable => variable + "^" + variables[variable])
            .join("|");
    }

    function monomialKeyFromParsed(parsed) {
        return parsed.coefficient + "#" + variableSignature(parsed.variables);
    }

    function monomialKeyFromText(text) {
        return monomialKeyFromParsed(parseMonomialText(text));
    }

    function sameMonomialText(a, b) {
        return monomialKeyFromText(a) === monomialKeyFromText(b);
    }

    function getPerfectSquareMonomialBase(termText) {
        const parsed = parseMonomialText(termText);

        if (parsed.coefficient <= 0) return null;
        if (!isPerfectSquareNumber(parsed.absCoefficient)) return null;

        const baseVariables = {};

        for (const variable of Object.keys(parsed.variables)) {
            const degree = parsed.variables[variable];
            if (degree % 2 !== 0) return null;
            baseVariables[variable] = degree / 2;
        }

        const baseCoeff = Math.sqrt(parsed.absCoefficient);

        return {
            text: monomialToText(baseCoeff, baseVariables),
            coefficient: baseCoeff,
            variables: baseVariables,
            squareText: termText
        };
    }

    function multiplyBaseMonomials(baseA, baseB, multiplier) {
        const variables = cloneVariables(baseA.variables);

        Object.keys(baseB.variables).forEach(variable => {
            variables[variable] = (variables[variable] || 0) + baseB.variables[variable];
        });

        return monomialToText(baseA.coefficient * baseB.coefficient * multiplier, variables);
    }

    function combinations(array, size) {
        const result = [];

        function step(start, combo) {
            if (combo.length === size) {
                result.push(combo.slice());
                return;
            }

            for (let i = start; i < array.length; i++) {
                combo.push(array[i]);
                step(i + 1, combo);
                combo.pop();
            }
        }

        step(0, []);
        return result;
    }

    function termMultisetMatches(actualTerms, expectedTerms) {
        const actual = actualTerms.map(monomialKeyFromText).sort();
        const expected = expectedTerms.map(monomialKeyFromText).sort();

        if (actual.length !== expected.length) return false;

        return actual.every((item, index) => item === expected[index]);
    }

    function joinSignedFactors(parts) {
        let text = parts[0].text;

        for (let i = 1; i < parts.length; i++) {
            text += parts[i].sign > 0 ? "+" : "-";
            text += parts[i].text;
        }

        return text;
    }

    function analyzeSquareTrinomial(poly) {
        const terms = splitTerms(poly);

        if (terms.length !== 6) {
            return {
                valid: false,
                reason: "Il quadrato di trinomio richiede sei termini: tre quadrati e tre doppi prodotti."
            };
        }

        const squareCandidates = terms
            .map((term, index) => ({ term, index, base: getPerfectSquareMonomialBase(term) }))
            .filter(item => item.base !== null);

        if (squareCandidates.length < 3) {
            return {
                valid: false,
                reason: "Non trovo tre termini che siano quadrati perfetti."
            };
        }

        const candidateGroups = combinations(squareCandidates, 3);

        for (const group of candidateGroups) {
            const squareIndexes = new Set(group.map(item => item.index));
            const mixedTerms = terms.filter((_, index) => !squareIndexes.has(index));
            const bases = group.map(item => item.base);

            const signOptions = [
                [1, 1, 1],
                [1, 1, -1],
                [1, -1, 1],
                [1, -1, -1]
            ];

            for (const signs of signOptions) {
                const expectedMixed = [
                    multiplyBaseMonomials(bases[0], bases[1], 2 * signs[0] * signs[1]),
                    multiplyBaseMonomials(bases[0], bases[2], 2 * signs[0] * signs[2]),
                    multiplyBaseMonomials(bases[1], bases[2], 2 * signs[1] * signs[2])
                ];

                if (termMultisetMatches(mixedTerms, expectedMixed)) {
                    const signedParts = bases.map((base, index) => ({
                        text: base.text,
                        sign: signs[index]
                    }));

                    return {
                        valid: true,
                        squareTerms: group.map(item => item.term),
                        mixedTerms,
                        bases,
                        signs,
                        signedParts,
                        expectedMixed,
                        factor: joinSignedFactors(signedParts)
                    };
                }
            }
        }

        return {
            valid: false,
            reason: "Trovo alcuni quadrati perfetti, ma i tre termini misti non corrispondono ai doppi prodotti."
        };
    }

    function buildSquareTrinomialBaseOptions(square) {
        const correctLabel = square.bases.map(base => base.text).join(" e ");
        const correctValue = square.bases.map(base => base.text).join("|");

        const wrongSquaresLabel = square.squareTerms.join(" e ");
        const wrongFirstMixed = square.bases.slice(0, 2).map(base => base.text).concat(square.mixedTerms[0]).join(" e ");
        const wrongReverse = square.bases.slice().reverse().map(base => base.text).join(" e ");

        const options = [
            { value: correctValue, label: correctLabel },
            { value: "wrong_squares", label: wrongSquaresLabel },
            { value: "wrong_mixed", label: wrongFirstMixed },
            { value: "wrong_reverse", label: wrongReverse }
        ];

        const seen = new Set();
        return options.filter(item => {
            if (seen.has(item.label)) return false;
            seen.add(item.label);
            return true;
        });
    }

    function renderSquareTrinomial() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const square = analyzeSquareTrinomial(state.currentPolynomial);

        if (!square.valid) {
            app.innerHTML = `
                <h3>Quadrato di trinomio</h3>

                ${alertBox("warning", square.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildSquareTrinomialBaseOptions(square);
        const correct = square.bases.map(base => base.text).join("|");

        app.innerHTML = `
            <h3>Quadrato di trinomio</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <div class="scompolab-formula">A² + B² + C² ± 2AB ± 2AC ± 2BC = (A ± B ± C)²</div>
                <p class="mb-0">
                    Anche qui non conta solo il grado 2: A, B e C possono essere monomi qualunque, anche con più variabili, purché i tre quadrati e i tre doppi prodotti siano coerenti.
                </p>
                <p class="mb-0 mt-2 small text-black-50">
                    Esempi: x² + y² + z² + 2xy + 2xz + 2yz oppure x² + 4a² + 9b² + 4ax + 6bx + 12ab.
                </p>
            </div>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(state.analysis.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Quali sono le basi dei tre quadrati perfetti?
                </p>

                <div class="scompolab-option-grid">
                    ${options.map(opt => `
                        <button type="button" data-square-trinomial-bases="${opt.value}">
                            ${pretty(opt.label)}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="squareTrinomialFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-square-trinomial-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("squareTrinomialFeedback");

                app.querySelectorAll("[data-square-trinomial-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.squareTrinomialBases !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere le basi dei tre quadrati perfetti, non i termini già elevati al quadrato."
                    );
                    return;
                }

                disableButtons("[data-square-trinomial-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi dei tre quadrati sono <strong>" + pretty(square.bases.map(base => base.text).join(", ")) + "</strong>."
                );

                addContinueButton("squareTrinomialFeedback", "Continua", () => renderSquareTrinomialProducts(square));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderSquareTrinomialProducts(square) {
        const correctLabel = square.expectedMixed.join("; ");
        const wrongNoDouble = [
            multiplyBaseMonomials(square.bases[0], square.bases[1], square.signs[0] * square.signs[1]),
            multiplyBaseMonomials(square.bases[0], square.bases[2], square.signs[0] * square.signs[2]),
            multiplyBaseMonomials(square.bases[1], square.bases[2], square.signs[1] * square.signs[2])
        ].join("; ");
        const wrongAllPositive = [
            multiplyBaseMonomials(square.bases[0], square.bases[1], 2),
            multiplyBaseMonomials(square.bases[0], square.bases[2], 2),
            multiplyBaseMonomials(square.bases[1], square.bases[2], 2)
        ].join("; ");
        const wrongSquares = square.squareTerms.join("; ");

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_no_double", label: wrongNoDouble },
            { value: "wrong_all_positive", label: wrongAllPositive },
            { value: "wrong_squares", label: wrongSquares }
        ];

        app.innerHTML = `
            <h3>Controlla i doppi prodotti</h3>

            <p class="text-black-60">
                Dopo aver trovato A, B e C, dobbiamo controllare i tre termini misti: <strong>2AB</strong>, <strong>2AC</strong> e <strong>2BC</strong>, con i segni corretti.
            </p>

            <div class="scompolab-formula mb-3">
                A = ${pretty(square.bases[0].text)}, &nbsp; B = ${pretty(square.bases[1].text)}, &nbsp; C = ${pretty(square.bases[2].text)}
            </div>

            <p class="mb-3">Quali sono i tre doppi prodotti presenti?</p>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-square-trinomial-products="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="squareTrinomialProductsFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToSquareTrinomialStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-square-trinomial-products]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("squareTrinomialProductsFeedback");

                app.querySelectorAll("[data-square-trinomial-products]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.squareTrinomialProducts !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Servono proprio i tre doppi prodotti, e i segni dipendono dai segni della parentesi."
                    );
                    return;
                }

                disableButtons("[data-square-trinomial-products]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: i termini misti sono <strong>" + pretty(correctLabel) + "</strong>."
                );

                addContinueButton("squareTrinomialProductsFeedback", "Continua", () => renderSquareTrinomialFormula(square));
            });
        });

        document.getElementById("backToSquareTrinomialStart").addEventListener("click", renderSquareTrinomial);
    }

    function renderSquareTrinomialFormula(square) {
        const correctLabel = "(" + square.factor + ")^2";
        const allPositive = "(" + square.bases.map(base => base.text).join("+") + ")^2";
        const noSquare = "(" + square.factor + ")";
        const productOnly = "(" + square.bases[0].text + ")(" + square.bases[1].text + ")(" + square.bases[2].text + ")";

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_all_positive", label: allPositive },
            { value: "wrong_no_square", label: noSquare },
            { value: "wrong_product", label: productOnly }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Costruisci la scomposizione</h3>

            <p class="text-black-60">
                Se i tre quadrati e i tre doppi prodotti sono coerenti, il polinomio è il quadrato di un trinomio.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-square-trinomial-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="squareTrinomialFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToSquareTrinomialProducts">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-square-trinomial-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("squareTrinomialFinalFeedback");

                app.querySelectorAll("[data-square-trinomial-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.squareTrinomialFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi costruire una sola parentesi con tre termini, elevata al quadrato."
                    );
                    return;
                }

                disableButtons("[data-square-trinomial-final]");

                state.builtFactors.push("(" + square.factor + ")^2");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";

                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty(correctLabel) + "</strong>."
                );

                addContinueButton("squareTrinomialFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToSquareTrinomialProducts").addEventListener("click", () => renderSquareTrinomialProducts(square));
    }


    function isPerfectCubeNumber(n) {
        const root = Math.round(Math.cbrt(Math.abs(n)));
        return root * root * root === Math.abs(n);
    }

    function getCubeBaseInfo(term) {
        const parsed = parseMonomialText(term.raw || term.original || String(term));

        if (!isPerfectCubeNumber(parsed.absCoefficient)) return null;

        const baseVariables = {};

        for (const variable of Object.keys(parsed.variables)) {
            const degree = parsed.variables[variable];
            if (degree % 3 !== 0) return null;
            baseVariables[variable] = degree / 3;
        }

        const coeff = Math.round(Math.cbrt(parsed.absCoefficient));
        const sign = parsed.coefficient < 0 ? -1 : 1;
        const text = monomialToText(coeff, baseVariables);

        return {
            text,
            coeff,
            coefficient: coeff,
            variables: baseVariables,
            sign
        };
    }

    function multiplyBasePowers(baseA, powerA, baseB, powerB, multiplier = 1) {
        const variables = {};

        Object.keys(baseA.variables || {}).forEach(variable => {
            variables[variable] = (variables[variable] || 0) + baseA.variables[variable] * powerA;
        });

        Object.keys(baseB.variables || {}).forEach(variable => {
            variables[variable] = (variables[variable] || 0) + baseB.variables[variable] * powerB;
        });

        Object.keys(variables).forEach(variable => {
            if (variables[variable] === 0) delete variables[variable];
        });

        const coeffA = Math.pow(baseA.coeff, powerA);
        const coeffB = Math.pow(baseB.coeff, powerB);

        return monomialToText(coeffA * coeffB * multiplier, variables);
    }

    function getCubeText(base, sign) {
        const dummyBase = {
            coeff: 1,
            variables: {}
        };

        return multiplyBasePowers(base, 3, dummyBase, 0, sign);
    }

    function getTripleProductA2B(baseA, baseB, sign) {
        return multiplyBasePowers(baseA, 2, baseB, 1, 3 * sign);
    }

    function getTripleProductAB2(baseA, baseB) {
        return multiplyBasePowers(baseA, 1, baseB, 2, 3);
    }

    function termMatches(term, expectedText) {
        return sameMonomialText(term.raw || term.original || String(term), expectedText);
    }

    function analyzeCubeBinomial(poly) {
        const a = analyze(poly);

        if (a.termCount !== 4) {
            return {
                valid: false,
                reason: "Il cubo di binomio richiede quattro termini."
            };
        }

        const terms = a.terms;

        for (let i = 0; i < terms.length; i++) {
            for (let j = 0; j < terms.length; j++) {
                if (i === j) continue;

                const cubeA = getCubeBaseInfo(terms[i]);
                const cubeB = getCubeBaseInfo(terms[j]);

                if (!cubeA || !cubeB) continue;
                if (cubeA.sign !== 1) continue;

                const sign = cubeB.sign;
                const remaining = terms.filter((_, index) => index !== i && index !== j);

                const expectedA2B = getTripleProductA2B(cubeA, cubeB, sign);
                const expectedAB2 = getTripleProductAB2(cubeA, cubeB);

                const hasA2B = remaining.some(term => termMatches(term, expectedA2B));
                const hasAB2 = remaining.some(term => termMatches(term, expectedAB2));

                if (hasA2B && hasAB2) {
                    return {
                        valid: true,
                        cubeTermA: terms[i],
                        cubeTermB: terms[j],
                        baseA: cubeA,
                        baseB: cubeB,
                        sign,
                        cubeAText: getCubeText(cubeA, 1),
                        cubeBText: getCubeText(cubeB, sign),
                        tripleA2B: expectedA2B,
                        tripleAB2: expectedAB2,
                        factor: cubeA.text + (sign > 0 ? "+" : "-") + cubeB.text
                    };
                }
            }
        }

        return {
            valid: false,
            reason: "Non riconosco due cubi perfetti e i due tripli prodotti coerenti. Controlla che i coefficienti siano 1, 3, 3, 1 e che gli esponenti delle variabili siano multipli di 3 nei cubi."
        };
    }

    function buildCubeBinomialBaseOptions(cube) {
        const correct = {
            value: cube.baseA.text + "|" + cube.baseB.text,
            label: cube.baseA.text + " e " + cube.baseB.text
        };

        const wrong1 = {
            value: cube.baseB.text + "|" + cube.baseA.text,
            label: cube.baseB.text + " e " + cube.baseA.text
        };

        const wrong2 = {
            value: cube.cubeTermA.raw + "|" + cube.cubeTermB.raw,
            label: cube.cubeTermA.raw + " e " + cube.cubeTermB.raw
        };

        const wrong3 = {
            value: cube.baseA.text + "|" + cube.tripleA2B,
            label: cube.baseA.text + " e " + cube.tripleA2B
        };

        const seen = new Set();
        return [correct, wrong1, wrong2, wrong3].filter(item => {
            if (seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        });
    }

    function renderCubeBinomial() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const cube = analyzeCubeBinomial(state.currentPolynomial);

        if (!cube.valid) {
            app.innerHTML = `
                <h3>Cubo di binomio</h3>

                ${alertBox("warning", cube.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildCubeBinomialBaseOptions(cube);

        app.innerHTML = `
            <h3>Cubo di binomio</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <div class="scompolab-formula">A³ ± 3A²B + 3AB² ± B³ = (A ± B)³</div>
                <p class="mb-0">
                    Non deve essere per forza un polinomio di grado 3: le basi possono essere anche x², 2x, 3x², numeri, ecc.
                </p>
            </div>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(state.analysis.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Quali sono le basi dei due cubi perfetti?
                </p>

                <div class="scompolab-option-grid">
                    ${options.map(opt => `
                        <button type="button" data-cube-bases="${opt.value}">
                            ${pretty(opt.label)}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="cubeBinomialFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-cube-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("cubeBinomialFeedback");
                const correct = cube.baseA.text + "|" + cube.baseB.text;

                app.querySelectorAll("[data-cube-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.cubeBases !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere le basi dei cubi perfetti, non i cubi già sviluppati."
                    );
                    return;
                }

                disableButtons("[data-cube-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi sono <strong>" + pretty(cube.baseA.text) + "</strong> e <strong>" + pretty(cube.baseB.text) + "</strong>."
                );

                addContinueButton("cubeBinomialFeedback", "Continua", () => renderCubeBinomialProducts(cube));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderCubeBinomialProducts(cube) {
        const wrongSignA2B = getTripleProductA2B(cube.baseA, cube.baseB, -cube.sign);
        const wrongSingleA2B = multiplyBasePowers(cube.baseA, 2, cube.baseB, 1, cube.sign);
        const wrongAB2Sign = multiplyBasePowers(cube.baseA, 1, cube.baseB, 2, -3);

        const options = [
            { value: "correct", label: cube.tripleA2B + " e " + cube.tripleAB2 },
            { value: "wrong_sign", label: wrongSignA2B + " e " + cube.tripleAB2 },
            { value: "wrong_single", label: wrongSingleA2B + " e " + cube.tripleAB2 },
            { value: "wrong_ab2", label: cube.tripleA2B + " e " + wrongAB2Sign }
        ];

        app.innerHTML = `
            <h3>Controlla i tripli prodotti</h3>

            <p class="text-black-60">
                Nel cubo di binomio non bastano i due cubi: devono comparire anche <strong>3A²B</strong> e <strong>3AB²</strong>, con i segni corretti.
            </p>

            <div class="scompolab-formula mb-3">
                A = ${pretty(cube.baseA.text)}, &nbsp; B = ${pretty(cube.baseB.text)}
            </div>

            <p class="mb-3">Quali sono i due tripli prodotti presenti?</p>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-cube-products="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="cubeProductsFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToCubeStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-cube-products]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("cubeProductsFeedback");

                app.querySelectorAll("[data-cube-products]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.cubeProducts !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Ricorda i coefficienti 1, 3, 3, 1 e controlla bene i segni."
                    );
                    return;
                }

                disableButtons("[data-cube-products]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: i tripli prodotti sono <strong>" + pretty(cube.tripleA2B) + "</strong> e <strong>" + pretty(cube.tripleAB2) + "</strong>."
                );

                addContinueButton("cubeProductsFeedback", "Continua", () => renderCubeBinomialFormula(cube));
            });
        });

        document.getElementById("backToCubeStart").addEventListener("click", renderCubeBinomial);
    }

    function renderCubeBinomialFormula(cube) {
        const correctLabel = "(" + cube.factor + ")^3";
        const oppositeSign = cube.baseA.text + (cube.sign > 0 ? "-" : "+") + cube.baseB.text;

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_opposite", label: "(" + oppositeSign + ")^3" },
            { value: "wrong_square", label: "(" + cube.factor + ")^2" },
            { value: "wrong_product", label: "(" + cube.baseA.text + ")(" + cube.baseB.text + ")" }
        ];

        app.innerHTML = `
            <h3>Costruisci la scomposizione</h3>

            <p class="text-black-60">
                Se i due cubi e i due tripli prodotti sono coerenti, il polinomio è il cubo di un binomio.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-cube-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="cubeFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToCubeProducts">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-cube-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("cubeFinalFeedback");

                app.querySelectorAll("[data-cube-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.cubeFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi costruire il cubo del binomio con lo stesso segno dei termini coerenti."
                    );
                    return;
                }

                disableButtons("[data-cube-final]");

                state.builtFactors.push("(" + cube.factor + ")^3");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";
                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = (" + pretty(cube.factor) + ")³</strong>."
                );

                addContinueButton("cubeFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToCubeProducts").addEventListener("click", () => renderCubeBinomialProducts(cube));
    }


    function squareOfCubeBase(base) {
        const dummyBase = {
            coeff: 1,
            variables: {}
        };

        return multiplyBasePowers(base, 2, dummyBase, 0, 1);
    }

    function productOfCubeBases(baseA, baseB, sign = 1) {
        return multiplyBasePowers(baseA, 1, baseB, 1, sign);
    }

    function getCubeTermObjects(poly) {
        return splitTerms(poly).map(term => {
            const parsed = parseMonomialText(term);

            return {
                raw: term,
                original: term,
                coefficient: parsed.coefficient,
                absCoefficient: parsed.absCoefficient,
                variables: parsed.variables
            };
        });
    }

    function analyzeSumCubes(poly) {
        const terms = getCubeTermObjects(poly);

        if (terms.length !== 2) {
            return {
                valid: false,
                reason: "La somma di cubi richiede due termini."
            };
        }

        const firstCube = getCubeBaseInfo(terms[0]);
        const secondCube = getCubeBaseInfo(terms[1]);

        if (!firstCube || !secondCube) {
            return {
                valid: false,
                reason: "I due termini devono essere cubi perfetti: il coefficiente deve essere un cubo perfetto e tutti gli esponenti delle variabili devono essere multipli di 3."
            };
        }

        if (firstCube.sign !== 1 || secondCube.sign !== 1) {
            return {
                valid: false,
                reason: "Per la somma di cubi i due cubi devono essere sommati. Se c'è una sottrazione, useremo la differenza di cubi."
            };
        }

        return {
            valid: true,
            termA: terms[0],
            termB: terms[1],
            baseA: firstCube,
            baseB: secondCube,
            firstFactor: firstCube.text + "+" + secondCube.text,
            secondFactor: squareOfCubeBase(firstCube) + "-" + productOfCubeBases(firstCube, secondCube) + "+" + squareOfCubeBase(secondCube)
        };
    }

    function buildSumCubesBaseOptions(sum) {
        const correct = {
            value: sum.baseA.text + "|" + sum.baseB.text,
            label: sum.baseA.text + " e " + sum.baseB.text
        };

        const wrong1 = {
            value: sum.baseB.text + "|" + sum.baseA.text,
            label: sum.baseB.text + " e " + sum.baseA.text
        };

        const wrong2 = {
            value: sum.termA.raw + "|" + sum.termB.raw,
            label: sum.termA.raw + " e " + sum.termB.raw
        };

        const wrong3 = {
            value: sum.baseA.text + "|-" + sum.baseB.text,
            label: sum.baseA.text + " e -" + sum.baseB.text
        };

        const seen = new Set();
        return [correct, wrong1, wrong2, wrong3].filter(item => {
            if (seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        });
    }

    function renderSumCubes() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const sum = analyzeSumCubes(state.currentPolynomial);

        if (!sum.valid) {
            app.innerHTML = `
                <h3>Somma di cubi</h3>

                <div class="scompolab-rule-box mb-3">
                    <p class="mb-1"><strong>Regola generale</strong></p>
                    <div class="scompolab-formula">A³ + B³ = (A + B)(A² − AB + B²)</div>
                    <p class="mb-0">
                        Anche qui A e B possono essere monomi: x, x², 2x, 3x², ecc.
                    </p>
                </div>

                ${alertBox("warning", sum.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildSumCubesBaseOptions(sum);
        const correct = sum.baseA.text + "|" + sum.baseB.text;

        app.innerHTML = `
            <h3>Somma di cubi</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <div class="scompolab-formula">A³ + B³ = (A + B)(A² − AB + B²)</div>
                <p class="mb-0">
                    La seconda parentesi ha i segni alternati: <strong>più, meno, più</strong>.
                </p>
            </div>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(state.analysis.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Quali sono le basi dei due cubi perfetti?
                </p>

                <div class="scompolab-option-grid">
                    ${options.map(opt => `
                        <button type="button" data-sum-cubes-bases="${opt.value}">
                            ${pretty(opt.label)}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="sumCubesFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-sum-cubes-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("sumCubesFeedback");

                app.querySelectorAll("[data-sum-cubes-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.sumCubesBases !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere le basi dei cubi perfetti, non i cubi già sviluppati."
                    );
                    return;
                }

                disableButtons("[data-sum-cubes-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi sono <strong>" + pretty(sum.baseA.text) + "</strong> e <strong>" + pretty(sum.baseB.text) + "</strong>."
                );

                addContinueButton("sumCubesFeedback", "Continua", () => renderSumCubesRule(sum));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderSumCubesRule(sum) {
        const a2 = squareOfCubeBase(sum.baseA);
        const ab = productOfCubeBases(sum.baseA, sum.baseB);
        const b2 = squareOfCubeBase(sum.baseB);

        const correctSecond = a2 + "-" + ab + "+" + b2;

        const options = [
            { value: "correct", label: correctSecond },
            { value: "wrong_all_plus", label: a2 + "+" + ab + "+" + b2 },
            { value: "wrong_middle_plus_last_minus", label: a2 + "+" + ab + "-" + b2 },
            { value: "wrong_missing_square", label: sum.baseA.text + "-" + ab + "+" + sum.baseB.text }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Costruisci il trinomio della formula</h3>

            <p class="text-black-60">
                Dopo la parentesi <strong>A + B</strong>, nella somma di cubi compare
                <strong>A² − AB + B²</strong>.
            </p>

            <div class="scompolab-formula mb-3">
                A = ${pretty(sum.baseA.text)}, &nbsp; B = ${pretty(sum.baseB.text)}
            </div>

            <p class="mb-3">Qual è la seconda parentesi?</p>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-sum-cubes-second="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="sumCubesRuleFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToSumCubesStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-sum-cubes-second]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("sumCubesRuleFeedback");

                app.querySelectorAll("[data-sum-cubes-second]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.sumCubesSecond !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Nella somma di cubi la seconda parentesi è A² − AB + B²: il termine centrale ha segno meno."
                    );
                    return;
                }

                disableButtons("[data-sum-cubes-second]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: la seconda parentesi è <strong>" + pretty(correctSecond) + "</strong>."
                );

                addContinueButton("sumCubesRuleFeedback", "Continua", () => renderSumCubesFormula(sum));
            });
        });

        document.getElementById("backToSumCubesStart").addEventListener("click", renderSumCubes);
    }

    function renderSumCubesFormula(sum) {
        const correctLabel = "(" + sum.firstFactor + ")(" + sum.secondFactor + ")";
        const wrongFirstMinus = "(" + sum.baseA.text + "-" + sum.baseB.text + ")(" + sum.secondFactor + ")";
        const wrongSecondSigns = "(" + sum.firstFactor + ")(" + squareOfCubeBase(sum.baseA) + "+" + productOfCubeBases(sum.baseA, sum.baseB) + "+" + squareOfCubeBase(sum.baseB) + ")";
        const wrongCube = "(" + sum.firstFactor + ")^3";

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_first_minus", label: wrongFirstMinus },
            { value: "wrong_second_signs", label: wrongSecondSigns },
            { value: "wrong_cube", label: wrongCube }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Completa la somma di cubi</h3>

            <p class="text-black-60">
                Ora scegli la scomposizione completa.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-sum-cubes-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="sumCubesFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToSumCubesRule">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-sum-cubes-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("sumCubesFinalFeedback");

                app.querySelectorAll("[data-sum-cubes-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.sumCubesFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Ricorda: A³ + B³ = (A + B)(A² − AB + B²)."
                    );
                    return;
                }

                disableButtons("[data-sum-cubes-final]");

                state.builtFactors.push("(" + sum.firstFactor + ")");
                state.builtFactors.push("(" + sum.secondFactor + ")");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";
                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty(correctLabel) + "</strong>."
                );

                addContinueButton("sumCubesFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToSumCubesRule").addEventListener("click", () => renderSumCubesRule(sum));
    }




    function analyzeDifferenceCubes(poly) {
        const terms = getCubeTermObjects(poly);

        if (terms.length !== 2) {
            return {
                valid: false,
                reason: "La differenza di cubi richiede due termini."
            };
        }

        const positiveTerm = terms.find(term => term.coefficient > 0);
        const negativeTerm = terms.find(term => term.coefficient < 0);

        if (!positiveTerm || !negativeTerm) {
            return {
                valid: false,
                reason: "Per la differenza di cubi serve un cubo positivo meno un cubo positivo."
            };
        }

        const firstCube = getCubeBaseInfo(positiveTerm);
        const secondCube = getCubeBaseInfo(negativeTerm);

        if (!firstCube || !secondCube) {
            return {
                valid: false,
                reason: "I due termini devono essere cubi perfetti: il coefficiente deve essere un cubo perfetto e tutti gli esponenti delle variabili devono essere multipli di 3."
            };
        }

        return {
            valid: true,
            termA: positiveTerm,
            termB: negativeTerm,
            baseA: firstCube,
            baseB: secondCube,
            firstFactor: firstCube.text + "-" + secondCube.text,
            secondFactor: squareOfCubeBase(firstCube) + "+" + productOfCubeBases(firstCube, secondCube) + "+" + squareOfCubeBase(secondCube)
        };
    }

    function buildDifferenceCubesBaseOptions(diff) {
        const correct = {
            value: diff.baseA.text + "|" + diff.baseB.text,
            label: diff.baseA.text + " e " + diff.baseB.text
        };

        const wrong1 = {
            value: diff.baseB.text + "|" + diff.baseA.text,
            label: diff.baseB.text + " e " + diff.baseA.text
        };

        const wrong2 = {
            value: diff.termA.raw + "|" + diff.termB.raw,
            label: diff.termA.raw + " e " + diff.termB.raw
        };

        const wrong3 = {
            value: diff.baseA.text + "|-" + diff.baseB.text,
            label: diff.baseA.text + " e -" + diff.baseB.text
        };

        const seen = new Set();
        return [correct, wrong1, wrong2, wrong3].filter(item => {
            if (seen.has(item.value)) return false;
            seen.add(item.value);
            return true;
        });
    }

    function renderDifferenceCubes() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const diff = analyzeDifferenceCubes(state.currentPolynomial);

        if (!diff.valid) {
            app.innerHTML = `
                <h3>Differenza di cubi</h3>

                <div class="scompolab-rule-box mb-3">
                    <p class="mb-1"><strong>Regola generale</strong></p>
                    <div class="scompolab-formula">A³ − B³ = (A − B)(A² + AB + B²)</div>
                    <p class="mb-0">
                        Anche qui A e B possono essere monomi: x, x², 2x, 3x², ecc.
                    </p>
                </div>

                ${alertBox("warning", diff.reason)}

                <div class="scompolab-actions mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildDifferenceCubesBaseOptions(diff);
        const correct = diff.baseA.text + "|" + diff.baseB.text;

        app.innerHTML = `
            <h3>Differenza di cubi</h3>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1"><strong>Regola generale</strong></p>
                <div class="scompolab-formula">A³ − B³ = (A − B)(A² + AB + B²)</div>
                <p class="mb-0">
                    Nella prima parentesi resta il segno meno; nella seconda parentesi i segni sono tutti positivi.
                </p>
            </div>

            <div class="scompolab-analysis">
                <p class="mb-2">Termini del polinomio:</p>
                ${renderTerms(state.analysis.terms)}
            </div>

            <div class="scompolab-question mt-4">
                <p class="mb-3">
                    Quali sono le basi dei due cubi perfetti?
                </p>

                <div class="scompolab-option-grid">
                    ${options.map(opt => `
                        <button type="button" data-difference-cubes-bases="${opt.value}">
                            ${pretty(opt.label)}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div id="differenceCubesFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-difference-cubes-bases]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("differenceCubesFeedback");

                app.querySelectorAll("[data-difference-cubes-bases]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.differenceCubesBases !== correct) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi prendere le basi dei cubi perfetti, non i cubi già sviluppati."
                    );
                    return;
                }

                disableButtons("[data-difference-cubes-bases]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: le basi sono <strong>" + pretty(diff.baseA.text) + "</strong> e <strong>" + pretty(diff.baseB.text) + "</strong>."
                );

                addContinueButton("differenceCubesFeedback", "Continua", () => renderDifferenceCubesRule(diff));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderDifferenceCubesRule(diff) {
        const a2 = squareOfCubeBase(diff.baseA);
        const ab = productOfCubeBases(diff.baseA, diff.baseB);
        const b2 = squareOfCubeBase(diff.baseB);

        const correctSecond = a2 + "+" + ab + "+" + b2;

        const options = [
            { value: "correct", label: correctSecond },
            { value: "wrong_middle_minus", label: a2 + "-" + ab + "+" + b2 },
            { value: "wrong_last_minus", label: a2 + "+" + ab + "-" + b2 },
            { value: "wrong_missing_square", label: diff.baseA.text + "+" + ab + "+" + diff.baseB.text }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Costruisci il trinomio della formula</h3>

            <p class="text-black-60">
                Dopo la parentesi <strong>A − B</strong>, nella differenza di cubi compare
                <strong>A² + AB + B²</strong>.
            </p>

            <div class="scompolab-formula mb-3">
                A = ${pretty(diff.baseA.text)}, &nbsp; B = ${pretty(diff.baseB.text)}
            </div>

            <p class="mb-3">Qual è la seconda parentesi?</p>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-difference-cubes-second="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="differenceCubesRuleFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToDifferenceCubesStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-difference-cubes-second]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("differenceCubesRuleFeedback");

                app.querySelectorAll("[data-difference-cubes-second]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.differenceCubesSecond !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Nella differenza di cubi la seconda parentesi è A² + AB + B²: i segni sono tutti positivi."
                    );
                    return;
                }

                disableButtons("[data-difference-cubes-second]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: la seconda parentesi è <strong>" + pretty(correctSecond) + "</strong>."
                );

                addContinueButton("differenceCubesRuleFeedback", "Continua", () => renderDifferenceCubesFormula(diff));
            });
        });

        document.getElementById("backToDifferenceCubesStart").addEventListener("click", renderDifferenceCubes);
    }

    function renderDifferenceCubesFormula(diff) {
        const correctLabel = "(" + diff.firstFactor + ")(" + diff.secondFactor + ")";
        const wrongFirstPlus = "(" + diff.baseA.text + "+" + diff.baseB.text + ")(" + diff.secondFactor + ")";
        const wrongSecondSigns = "(" + diff.firstFactor + ")(" + squareOfCubeBase(diff.baseA) + "-" + productOfCubeBases(diff.baseA, diff.baseB) + "+" + squareOfCubeBase(diff.baseB) + ")";
        const wrongCube = "(" + diff.firstFactor + ")^3";

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_first_plus", label: wrongFirstPlus },
            { value: "wrong_second_signs", label: wrongSecondSigns },
            { value: "wrong_cube", label: wrongCube }
        ];

        const seen = new Set();
        const filteredOptions = options.filter(opt => {
            if (seen.has(opt.label)) return false;
            seen.add(opt.label);
            return true;
        });

        app.innerHTML = `
            <h3>Completa la differenza di cubi</h3>

            <p class="text-black-60">
                Ora scegli la scomposizione completa.
            </p>

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${filteredOptions.map(opt => `
                    <button type="button" data-difference-cubes-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="differenceCubesFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToDifferenceCubesRule">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-difference-cubes-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("differenceCubesFinalFeedback");

                app.querySelectorAll("[data-difference-cubes-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.differenceCubesFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Ricorda: A³ − B³ = (A − B)(A² + AB + B²)."
                    );
                    return;
                }

                disableButtons("[data-difference-cubes-final]");

                state.builtFactors.push("(" + diff.firstFactor + ")");
                state.builtFactors.push("(" + diff.secondFactor + ")");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";
                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty(correctLabel) + "</strong>."
                );

                addContinueButton("differenceCubesFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToDifferenceCubesRule").addEventListener("click", () => renderDifferenceCubesRule(diff));
    }


    function parseUnivariatePolynomialInX(poly) {
        const terms = splitTerms(poly).map(parseTerm);
        const degreeMap = {};
        let maxDegree = 0;

        for (const term of terms) {
            const variables = term.variables || {};
            const otherVariables = Object.keys(variables).filter(variable => variable !== "x" && variables[variable] !== 0);

            if (otherVariables.length > 0) {
                return {
                    valid: false,
                    reason: "Ruffini, in questa versione guidata, lavora solo con polinomi in una variabile, cioè in x."
                };
            }

            const degree = variables.x || 0;
            maxDegree = Math.max(maxDegree, degree);
            degreeMap[degree] = (degreeMap[degree] || 0) + term.coefficient;
        }

        if (maxDegree < 1) {
            return {
                valid: false,
                reason: "Per applicare Ruffini serve un polinomio di grado almeno 1."
            };
        }

        const coefficients = [];

        for (let degree = maxDegree; degree >= 0; degree--) {
            coefficients.push(degreeMap[degree] || 0);
        }

        const leadingCoefficient = coefficients[0];

        if (leadingCoefficient === 0) {
            return {
                valid: false,
                reason: "Non riesco a individuare correttamente il coefficiente del termine di grado massimo."
            };
        }

        return {
            valid: true,
            terms,
            degree: maxDegree,
            coefficients,
            leadingCoefficient,
            constant: coefficients[coefficients.length - 1]
        };
    }

    function getIntegerDivisors(n) {
        n = Math.abs(n);

        if (n === 0) return [0];

        const values = [];

        for (let i = 1; i <= n; i++) {
            if (n % i === 0) values.push(i);
        }

        return values.sort((a, b) => a - b);
    }

    function gcdForFractions(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);

        while (b) {
            const temp = b;
            b = a % b;
            a = temp;
        }

        return a || 1;
    }

    function makeFraction(numerator, denominator = 1) {
        if (denominator === 0) {
            throw new Error("Denominatore nullo nella frazione.");
        }

        if (denominator < 0) {
            numerator = -numerator;
            denominator = -denominator;
        }

        if (numerator === 0) {
            return { numerator: 0, denominator: 1 };
        }

        const divisor = gcdForFractions(numerator, denominator);

        return {
            numerator: numerator / divisor,
            denominator: denominator / divisor
        };
    }

    function fractionFromValue(value) {
        if (typeof value === "object" && value !== null && "numerator" in value && "denominator" in value) {
            return makeFraction(value.numerator, value.denominator);
        }

        return makeFraction(Number(value), 1);
    }

    function addFractions(a, b) {
        a = fractionFromValue(a);
        b = fractionFromValue(b);
        return makeFraction(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
    }

    function multiplyFractions(a, b) {
        a = fractionFromValue(a);
        b = fractionFromValue(b);
        return makeFraction(a.numerator * b.numerator, a.denominator * b.denominator);
    }

    function negateFraction(a) {
        a = fractionFromValue(a);
        return makeFraction(-a.numerator, a.denominator);
    }

    function fractionEquals(a, b) {
        a = fractionFromValue(a);
        b = fractionFromValue(b);
        return a.numerator === b.numerator && a.denominator === b.denominator;
    }

    function fractionToNumber(a) {
        a = fractionFromValue(a);
        return a.numerator / a.denominator;
    }

    function fractionToKey(a) {
        a = fractionFromValue(a);
        return a.denominator === 1 ? String(a.numerator) : a.numerator + "/" + a.denominator;
    }

    function parseFractionKey(value) {
        const text = String(value);
        if (text.includes("/")) {
            const parts = text.split("/");
            return makeFraction(parseInt(parts[0], 10), parseInt(parts[1], 10));
        }

        return makeFraction(parseInt(text, 10), 1);
    }

    function fractionToText(a) {
        a = fractionFromValue(a);
        return a.denominator === 1 ? String(a.numerator) : a.numerator + "/" + a.denominator;
    }

    function signedFractionToText(a) {
        a = fractionFromValue(a);
        const text = fractionToText(a);
        return a.numerator < 0 ? text : "+" + text;
    }

    function fractionAbsText(a) {
        a = fractionFromValue(a);
        return fractionToText(makeFraction(Math.abs(a.numerator), a.denominator));
    }

    function formatCandidateList(candidates) {
        return candidates.map(fractionToText).join(", ");
    }

    function buildRationalCandidates(constant, leadingCoefficient) {
        const numeratorDivisors = getIntegerDivisors(constant);
        const denominatorDivisors = getIntegerDivisors(leadingCoefficient);
        const candidates = [];
        const seen = new Set();

        numeratorDivisors.forEach(numerator => {
            denominatorDivisors.forEach(denominator => {
                [1, -1].forEach(sign => {
                    const candidate = makeFraction(sign * numerator, denominator);
                    const key = fractionToKey(candidate);

                    if (!seen.has(key)) {
                        seen.add(key);
                        candidates.push(candidate);
                    }
                });
            });
        });

        return candidates.sort((a, b) => fractionToNumber(a) - fractionToNumber(b));
    }

    function evaluatePolynomialAt(coefficients, xValue) {
        const root = fractionFromValue(xValue);
        let accumulator = makeFraction(0, 1);

        coefficients.forEach(coefficient => {
            accumulator = addFractions(multiplyFractions(accumulator, root), makeFraction(coefficient, 1));
        });

        return accumulator;
    }

    function syntheticDivide(coefficients, root) {
        root = fractionFromValue(root);

        const bottomRow = [makeFraction(coefficients[0], 1)];
        const productRow = [null];

        for (let i = 1; i < coefficients.length; i++) {
            const product = multiplyFractions(bottomRow[bottomRow.length - 1], root);
            productRow.push(product);
            bottomRow.push(addFractions(makeFraction(coefficients[i], 1), product));
        }

        const quotient = bottomRow.slice(0, -1);
        const remainder = bottomRow[bottomRow.length - 1];

        return {
            quotient,
            remainder,
            productRow,
            bottomRow
        };
    }

    function buildTermFromFraction(coefficient, degree) {
        coefficient = fractionFromValue(coefficient);

        if (coefficient.numerator === 0) return "";

        const negative = coefficient.numerator < 0;
        const absCoefficient = makeFraction(Math.abs(coefficient.numerator), coefficient.denominator);

        if (degree === 0) {
            return (negative ? "-" : "") + fractionToText(absCoefficient);
        }

        let coeffText = "";

        if (!(absCoefficient.numerator === 1 && absCoefficient.denominator === 1)) {
            coeffText = fractionToText(absCoefficient);
        }

        const xText = degree === 1 ? "x" : "x^" + degree;
        return (negative ? "-" : "") + coeffText + xText;
    }

    function polynomialToTextFromCoefficients(coefficients) {
        const degree = coefficients.length - 1;
        const terms = [];

        coefficients.forEach((coefficient, index) => {
            const fraction = fractionFromValue(coefficient);
            if (fraction.numerator === 0) return;

            const currentDegree = degree - index;
            terms.push(buildTermFromFraction(fraction, currentDegree));
        });

        return terms.length ? joinTerms(terms) : "0";
    }

    function factorFromRoot(root) {
        root = fractionFromValue(root);

        if (root.numerator === 0) return "x";
        if (root.numerator > 0) return "x-" + fractionToText(root);
        return "x+" + fractionAbsText(root);
    }

    function renderRuffiniTable(ruffini, mode = "complete") {
        const coefficients = ruffini.coefficients;
        const products = ruffini.productRow;
        const bottom = ruffini.bottomRow;

        return `
            <div class="scompolab-ruffini-table-wrapper my-3">
                <table class="table table-bordered text-center scompolab-ruffini-table mb-2">
                    <tbody>
                        <tr>
                            <td rowspan="3" class="align-middle font-weight-bold">${fractionToText(ruffini.root)}</td>
                            ${coefficients.map(c => `<td>${c}</td>`).join("")}
                        </tr>
                        <tr>
                            ${products.map(product => `<td>${product ? fractionToText(product) : ""}</td>`).join("")}
                        </tr>
                        <tr>
                            ${bottom.map((value, index) => `<td class="font-weight-bold ${index === bottom.length - 1 ? "text-success" : ""}">${fractionToText(value)}</td>`).join("")}
                        </tr>
                    </tbody>
                </table>
                <p class="small text-black-50 mb-0">
                    Prima riga: coefficienti del polinomio. Seconda riga: prodotti successivi. Terza riga: somme ottenute. L'ultimo numero è il resto.
                </p>
            </div>
        `;
    }

    function analyzeRuffini(poly) {
        const parsed = parseUnivariatePolynomialInX(poly);

        if (!parsed.valid) return parsed;

        const numeratorDivisors = getIntegerDivisors(parsed.constant);
        const denominatorDivisors = getIntegerDivisors(parsed.leadingCoefficient);
        const candidates = buildRationalCandidates(parsed.constant, parsed.leadingCoefficient);
        const roots = candidates.filter(candidate => fractionEquals(evaluatePolynomialAt(parsed.coefficients, candidate), makeFraction(0, 1)));

        if (roots.length === 0) {
            return {
                valid: false,
                reason: "Non trovo zeri razionali tra i rapporti possibili tra i divisori del termine noto e i divisori del coefficiente del termine di grado massimo."
            };
        }

        const root = roots[0];
        const division = syntheticDivide(parsed.coefficients, root);
        const quotientText = polynomialToTextFromCoefficients(division.quotient);
        const factorText = factorFromRoot(root);

        return {
            valid: true,
            coefficients: parsed.coefficients,
            degree: parsed.degree,
            leadingCoefficient: parsed.leadingCoefficient,
            constant: parsed.constant,
            numeratorDivisors,
            denominatorDivisors,
            candidates,
            roots,
            root,
            rootKey: fractionToKey(root),
            factorText,
            quotientCoefficients: division.quotient,
            quotientText,
            remainder: division.remainder,
            productRow: division.productRow,
            bottomRow: division.bottomRow
        };
    }

    function buildCandidateSetOptions(ruffini) {
        const correct = formatCandidateList(ruffini.candidates);
        const numeratorOnly = ruffini.numeratorDivisors.flatMap(n => [n, -n])
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort((a, b) => a - b)
            .join(", ");
        const positiveOnly = ruffini.candidates.filter(candidate => candidate.numerator > 0).map(fractionToText).join(", ");
        const coefficients = ruffini.coefficients.filter(n => n !== 0).join(", ");

        const options = [
            { value: "correct", label: correct },
            { value: "numerator_only", label: numeratorOnly || "Solo i divisori del termine noto" },
            { value: "positive_only", label: positiveOnly || "Solo numeri positivi" },
            { value: "coefficients", label: coefficients || "I coefficienti del polinomio" }
        ];

        const seen = new Set();
        return options.filter(option => {
            if (seen.has(option.label)) return false;
            seen.add(option.label);
            return true;
        });
    }

    function buildRootOptions(ruffini) {
        const values = [ruffini.root];

        ruffini.candidates.forEach(candidate => {
            if (values.length >= 4) return;
            if (!values.some(value => fractionEquals(value, candidate))) values.push(candidate);
        });

        return values.sort((a, b) => fractionToNumber(a) - fractionToNumber(b));
    }

    function buildRuffiniQuotientOptions(ruffini) {
        const correct = ruffini.quotientText;
        const lastCoeff = ruffini.quotientCoefficients[ruffini.quotientCoefficients.length - 1];
        const wrongRemainder = polynomialToTextFromCoefficients(
            ruffini.quotientCoefficients.slice(0, -1).concat([addFractions(lastCoeff, ruffini.root)])
        );
        const wrongOriginal = polynomialToTextFromCoefficients(ruffini.coefficients.slice(1));
        const wrongSignRoot = polynomialToTextFromCoefficients(syntheticDivide(ruffini.coefficients, negateFraction(ruffini.root)).quotient);

        const options = [
            { value: "correct", label: correct },
            { value: "wrong_remainder", label: wrongRemainder },
            { value: "wrong_original", label: wrongOriginal },
            { value: "wrong_sign", label: wrongSignRoot }
        ];

        const seen = new Set();
        return options.filter(option => {
            if (seen.has(option.label)) return false;
            seen.add(option.label);
            return true;
        });
    }

    function renderRuffiniGuided() {
        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        const ruffini = analyzeRuffini(state.currentPolynomial);

        if (!ruffini.valid) {
            app.innerHTML = `
                <h3>Ruffini</h3>

                <div class="scompolab-rule-box mb-3">
                    <p class="mb-1"><strong>Idea del metodo</strong></p>
                    <p class="mb-0">
                        Con Ruffini cerchiamo uno zero del polinomio. Se P(k)=0, allora il polinomio è divisibile per x−k.
                    </p>
                </div>

                ${alertBox("warning", ruffini.reason)}

                <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                    <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
                </div>
            `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        const options = buildCandidateSetOptions(ruffini);

        app.innerHTML = `
            <h3>Ruffini: possibili zeri</h3>

            <p class="text-black-60">
                Per cercare gli zeri possibili usiamo i rapporti tra i divisori del termine noto e i divisori del coefficiente del termine di grado massimo.
            </p>

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1">Coefficiente del termine di grado massimo: <strong>${ruffini.leadingCoefficient}</strong></p>
                <p class="mb-1">Termine noto: <strong>${ruffini.constant}</strong></p>
                <p class="mb-1">Divisori del termine noto: <strong>±${ruffini.numeratorDivisors.join(", ±")}</strong></p>
                <p class="mb-0">Divisori del coefficiente principale: <strong>±${ruffini.denominatorDivisors.join(", ±")}</strong></p>
            </div>

            <p class="mb-3">Quale insieme di valori conviene provare?</p>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-ruffini-candidates="${opt.value}">
                        ${opt.label}
                    </button>
                `).join("")}
            </div>

            <div id="ruffiniCandidatesFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-ruffini-candidates]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("ruffiniCandidatesFeedback");

                app.querySelectorAll("[data-ruffini-candidates]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.ruffiniCandidates !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Se il coefficiente principale non è 1, non bastano i divisori del termine noto: bisogna considerare i rapporti tra divisori del termine noto e divisori del coefficiente principale."
                    );
                    return;
                }

                disableButtons("[data-ruffini-candidates]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto. Gli zeri candidati sono: <strong>" + formatCandidateList(ruffini.candidates) + "</strong>."
                );

                addContinueButton("ruffiniCandidatesFeedback", "Continua", () => renderRuffiniChooseRoot(ruffini));
            });
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function buildRuffiniForRoot(ruffini, root) {
        const selectedRoot = fractionFromValue(root);
        const division = syntheticDivide(ruffini.coefficients, selectedRoot);

        return Object.assign({}, ruffini, {
            root: selectedRoot,
            rootKey: fractionToKey(selectedRoot),
            factorText: factorFromRoot(selectedRoot),
            quotientCoefficients: division.quotient,
            quotientText: polynomialToTextFromCoefficients(division.quotient),
            remainder: division.remainder,
            productRow: division.productRow,
            bottomRow: division.bottomRow
        });
    }

    function buildRuffiniPowerSubstitution(root, degree) {
        const rootText = fractionToText(root);
        const base = "(" + rootText + ")";

        if (degree === 1) return base;
        return base + "^" + degree;
    }

    function buildRuffiniEvaluationExpression(coefficients, root) {
        const degree = coefficients.length - 1;
        const terms = [];

        coefficients.forEach((coefficient, index) => {
            if (coefficient === 0) return;

            const currentDegree = degree - index;
            const negative = coefficient < 0;
            const absCoefficient = Math.abs(coefficient);
            let body = "";

            if (currentDegree === 0) {
                body = String(absCoefficient);
            } else {
                const powerText = buildRuffiniPowerSubstitution(root, currentDegree);
                body = absCoefficient === 1 ? powerText : String(absCoefficient) + powerText;
            }

            if (terms.length === 0) {
                terms.push((negative ? "-" : "") + body);
            } else {
                terms.push((negative ? "-" : "+") + body);
            }
        });

        return terms.length ? terms.join("") : "0";
    }

    function renderRuffiniChooseRoot(ruffini) {
        const options = buildRootOptions(ruffini);

        app.innerHTML = `
            <h3>Ruffini: verifica uno zero</h3>

            <p class="text-black-60">
                Ora proviamo un candidato. Se il valore del polinomio è 0, possiamo costruire la tabella di Ruffini.
            </p>

            <div class="scompolab-formula mb-3">
                P(x) = ${pretty(state.currentPolynomial)}
            </div>

            <div class="scompolab-option-grid">
                ${options.map(value => `
                    <button type="button" data-ruffini-root="${fractionToKey(value)}">
                        ${fractionToText(value)}
                    </button>
                `).join("")}
            </div>

            <div id="ruffiniRootFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToRuffiniStart">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-ruffini-root]").forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedRoot = parseFractionKey(btn.dataset.ruffiniRoot);
                const value = evaluatePolynomialAt(ruffini.coefficients, selectedRoot);
                const feedback = document.getElementById("ruffiniRootFeedback");

                app.querySelectorAll("[data-ruffini-root]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                const rootText = fractionToText(selectedRoot);
                const evaluationExpression = buildRuffiniEvaluationExpression(ruffini.coefficients, selectedRoot);
                const evaluationLine = "P(" + rootText + ")=" + pretty(evaluationExpression) + "=" + fractionToText(value);

                if (!fractionEquals(value, makeFraction(0, 1))) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "<strong>" + evaluationLine + "</strong><br>" +
                        "Poiché il risultato non è 0, " + rootText + " non è uno zero del polinomio. Prova un altro candidato."
                    );
                    return;
                }

                const selectedRuffini = buildRuffiniForRoot(ruffini, selectedRoot);

                disableButtons("[data-ruffini-root]");

                feedback.innerHTML = alertBox(
                    "success",
                    "<strong>" + evaluationLine + "</strong><br>" +
                    "Poiché il risultato è 0, " + rootText + " è uno zero del polinomio.<br>" +
                    "Possiamo costruire la tabella di Ruffini."
                );

                addContinueButton("ruffiniRootFeedback", "Continua", () => renderRuffiniDivision(selectedRuffini));
            });
        });

        document.getElementById("backToRuffiniStart").addEventListener("click", renderRuffiniGuided);
    }

    function renderRuffiniDivision(ruffini) {
        const options = buildRuffiniQuotientOptions(ruffini);

        app.innerHTML = `
            <h3>Ruffini: tabella e quoziente</h3>

            <p class="text-black-60">
                Costruiamo la tabella: si abbassa il primo coefficiente, poi si moltiplica per lo zero scelto e si somma con il coefficiente successivo.
            </p>
            
            <div class="alert alert-info">
                <strong>Ricorda:</strong>
                prima di applicare Ruffini il polinomio deve essere ordinato e completo.
                Ad esempio:
                2x³+5x−3 → 2x³+0x²+5x−3.
            </div>

            ${renderRuffiniTable(ruffini)}

            <div class="scompolab-rule-box mb-3">
                <p class="mb-1">I coefficienti del quoziente sono tutti i numeri dell'ultima riga tranne il resto finale.</p>
                <p class="mb-0">Il resto è <strong>${fractionToText(ruffini.remainder)}</strong>.</p>
            </div>

            <p class="mb-3">Qual è il quoziente ottenuto?</p>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-ruffini-quotient="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="ruffiniQuotientFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToRuffiniRoot">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-ruffini-quotient]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("ruffiniQuotientFeedback");

                app.querySelectorAll("[data-ruffini-quotient]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.ruffiniQuotient !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Il quoziente si legge dall'ultima riga della tabella, escludendo l'ultimo numero che rappresenta il resto."
                    );
                    return;
                }

                disableButtons("[data-ruffini-quotient]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: il quoziente è <strong>" + pretty(ruffini.quotientText) + "</strong>."
                );

                addContinueButton("ruffiniQuotientFeedback", "Continua", () => renderRuffiniFormula(ruffini));
            });
        });

        document.getElementById("backToRuffiniRoot").addEventListener("click", () => renderRuffiniChooseRoot(ruffini));
    }

    function renderRuffiniFormula(ruffini) {
        const correctLabel = "(" + ruffini.factorText + ")(" + ruffini.quotientText + ")";
        const wrongSignFactor = "(" + factorFromRoot(negateFraction(ruffini.root)) + ")(" + ruffini.quotientText + ")";
        const wrongNoQuotient = "(" + ruffini.factorText + ")";
        const wrongSwapped = "(" + ruffini.quotientText + ")(" + ruffini.factorText + ")";

        const options = [
            { value: "correct", label: correctLabel },
            { value: "wrong_sign", label: wrongSignFactor },
            { value: "wrong_no_quotient", label: wrongNoQuotient },
            { value: "wrong_swapped", label: wrongSwapped }
        ];

        app.innerHTML = `
            <h3>Ruffini: costruisci la scomposizione</h3>

            <p class="text-black-60">
                Se P(${fractionToText(ruffini.root)}) = 0, allora il fattore trovato è ${pretty(ruffini.factorText)} e il secondo fattore è il quoziente letto dalla tabella.
            </p>

            ${renderRuffiniTable(ruffini)}

            <div class="scompolab-formula mb-3">
                ${pretty(state.currentPolynomial)} = ?
            </div>

            <div class="scompolab-option-grid">
                ${options.map(opt => `
                    <button type="button" data-ruffini-final="${opt.value}">
                        ${pretty(opt.label)}
                    </button>
                `).join("")}
            </div>

            <div id="ruffiniFinalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToRuffiniDivision">Indietro</button>
            </div>
        `;

        app.querySelectorAll("[data-ruffini-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("ruffiniFinalFeedback");

                app.querySelectorAll("[data-ruffini-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.ruffiniFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Attenzione al segno: se lo zero è k, il fattore è x−k."
                    );
                    return;
                }

                disableButtons("[data-ruffini-final]");

                state.builtFactors.push("(" + ruffini.factorText + ")");
                state.remainingPolynomial = ruffini.quotientText;
                state.currentPolynomial = ruffini.quotientText;
                state.analysis = analyze(ruffini.quotientText);

                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" + pretty(state.originalInput) + " = " + pretty(correctLabel) + "</strong>."
                );

                if (ruffini.quotientCoefficients.length <= 1) {
                    state.builtFactors.push("(" + ruffini.quotientText + ")");
                    state.remainingPolynomial = "";
                    state.currentPolynomial = "";
                    addContinueButton("ruffiniFinalFeedback", "Concludi", () => renderCompletedFactorization());
                } else {
                    addContinueButton("ruffiniFinalFeedback", "Continua", () => setStep("finalCheck", 85));
                }
            });
        });

        document.getElementById("backToRuffiniDivision").addEventListener("click", () => renderRuffiniDivision(ruffini));
    }

    function renderMethodStub() {
        app.innerHTML = `
            <h3>${methodNames[state.selectedMethod]}</h3>
            <p class="text-black-60">
                Questa versione nuova ha già il motore dinamico, il polinomio sempre visibile e il raccoglimento totale completo.
                Il prossimo blocco da implementare sarà il metodo selezionato qui, sempre senza input liberi.
            </p>

            <div class="scompolab-rule-box">
                <strong>Prossimo sviluppo</strong>
                <p class="mb-0">
                    Per questo metodo costruiremo micro-step a pulsanti, con verifica immediata.
                </p>
            </div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
                <button type="button" class="btn btn-outline-success" id="tryAnother">Scomponi un altro polinomio</button>
            </div>
        `;

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
        document.getElementById("tryAnother").addEventListener("click", reset);
    }

    function parseMonomialText(termText) {
        let term = normalize(termText);
        let sign = 1;

        if (term.startsWith("-")) {
            sign = -1;
            term = term.slice(1);
        }

        let coefficientMatch = term.match(/^\d+/);
        let coefficient = coefficientMatch ? parseInt(coefficientMatch[0], 10) : 1;

        if (coefficientMatch) {
            term = term.slice(coefficientMatch[0].length);
        }

        const variables = {};
        const variableRegex = /([a-zA-Z])(\^(\d+))?/g;
        let match;

        while ((match = variableRegex.exec(term)) !== null) {
            const variable = match[1];
            const degree = match[3] ? parseInt(match[3], 10) : 1;
            variables[variable] = (variables[variable] || 0) + degree;
        }

        return {
            original: termText,
            coefficient: sign * coefficient,
            absCoefficient: coefficient,
            variables
        };
    }

    function monomialToText(coefficient, variables) {
        let text = "";

        if (coefficient === -1 && Object.keys(variables).length > 0) {
            text += "-";
        } else if (coefficient !== 1 || Object.keys(variables).length === 0) {
            text += String(coefficient);
        }

        Object.keys(variables).sort().forEach(variable => {
            const degree = variables[variable];
            text += variable;
            if (degree > 1) text += "^" + degree;
        });

        return text;
    }

    function commonMonomial(termA, termB) {
        const a = parseMonomialText(termA);
        const b = parseMonomialText(termB);

        const commonCoeff = gcd(a.absCoefficient, b.absCoefficient);
        const commonVars = {};

        Object.keys(a.variables).forEach(variable => {
            if (b.variables[variable]) {
                commonVars[variable] = Math.min(a.variables[variable], b.variables[variable]);
            }
        });

        return monomialToText(commonCoeff, commonVars);
    }

    function divideMonomialText(termText, factorText) {
        const term = parseMonomialText(termText);
        const factor = parseMonomialText(factorText);

        const coefficient = term.coefficient / factor.coefficient;
        const variables = { ...term.variables };

        Object.keys(factor.variables).forEach(variable => {
            variables[variable] = (variables[variable] || 0) - factor.variables[variable];
            if (variables[variable] === 0) delete variables[variable];
        });

        return monomialToText(coefficient, variables);
    }

    function factorGroup(termTexts) {
        let factor = commonMonomial(termTexts[0], termTexts[1]);

        for (let i = 2; i < termTexts.length; i++) {
            factor = commonMonomial(factor, termTexts[i]);
        }

        const insideTerms = termTexts.map(term => divideMonomialText(term, factor));
        const inside = joinTerms(insideTerms);

        return {
            factor,
            insideTerms,
            inside
        };
    }

    function normalizePolynomialText(poly) {
        return normalize(poly)
            .replace(/^\+/, "")
            .replace(/\+\-/g, "-");
    }

    function buildPartialFinalFactor(commonA, commonB) {
        if (commonB === "1") return commonA + "+1";
        if (commonB === "-1") return commonA + "-1";
        if (commonB.startsWith("-")) return commonA + commonB;
        return commonA + "+" + commonB;
    }

    function negateMonomialText(termText) {
        const parsed = parseMonomialText(termText);
        return monomialToText(-parsed.coefficient, parsed.variables || {});
    }

    function samePolynomialTerms(polyA, polyB) {
        const termsA = splitTerms(polyA).map(monomialKeyFromText).sort();
        const termsB = splitTerms(polyB).map(monomialKeyFromText).sort();

        if (termsA.length !== termsB.length) return false;

        return termsA.every((term, index) => term === termsB[index]);
    }

    function getCommonMonomialForTerms(termTexts) {
        if (!termTexts || termTexts.length === 0) return "1";

        let factor = termTexts[0];

        for (let i = 1; i < termTexts.length; i++) {
            factor = commonMonomial(factor, termTexts[i]);
        }

        return factor || "1";
    }

    function makeGroupFactorUseful(termTexts, factorText) {
        const firstInside = divideMonomialText(termTexts[0], factorText);
        const firstInsideParsed = parseMonomialText(firstInside);

        if (firstInsideParsed.coefficient < 0) {
            return negateMonomialText(factorText);
        }

        return factorText;
    }

    function factorGroup(termTexts) {
        let factor = getCommonMonomialForTerms(termTexts);
        factor = makeGroupFactorUseful(termTexts, factor);

        const insideTerms = termTexts.map(term => divideMonomialText(term, factor));
        const inside = joinTerms(insideTerms);

        return {
            factor,
            insideTerms,
            inside,
            terms: termTexts
        };
    }

    function hasUsefulCommonFactor(termTexts) {
        const factor = getCommonMonomialForTerms(termTexts);
        return factor !== "1";
    }

    function getPartialGroupingFromIndexes(terms, firstIndexes) {
        const firstIndexSet = new Set(firstIndexes);
        const secondIndexes = terms
            .map((_, index) => index)
            .filter(index => !firstIndexSet.has(index));

        const firstGroupTerms = firstIndexes.map(index => terms[index]);
        const secondGroupTerms = secondIndexes.map(index => terms[index]);

        const firstGroup = factorGroup(firstGroupTerms);
        const secondGroup = factorGroup(secondGroupTerms);

        return {
            firstIndexes,
            secondIndexes,
            firstGroupTerms,
            secondGroupTerms,
            firstGroup,
            secondGroup,
            sameInside: samePolynomialTerms(firstGroup.inside, secondGroup.inside)
        };
    }

    function buildFactorChoiceOptions(correctFactor, groupTerms) {
        const correct = {
            value: correctFactor,
            label: correctFactor
        };

        const options = [correct];

        const parsedCorrect = parseMonomialText(correctFactor);
        const positiveCorrect = monomialToText(Math.abs(parsedCorrect.coefficient), parsedCorrect.variables || {});

        if (!sameMonomialText(positiveCorrect, correctFactor)) {
            options.push({
                value: positiveCorrect,
                label: positiveCorrect
            });
        }

        const variables = Object.keys(parsedCorrect.variables || {}).sort();

        if (variables.length > 0) {
            options.push({
                value: variables[0],
                label: variables[0]
            });
        }

        if (Math.abs(parsedCorrect.coefficient) > 1) {
            options.push({
                value: String(Math.abs(parsedCorrect.coefficient)),
                label: String(Math.abs(parsedCorrect.coefficient))
            });
        }

        options.push({
            value: "1",
            label: "1"
        });

        if (groupTerms && groupTerms.length > 0) {
            options.push({
                value: groupTerms[0],
                label: groupTerms[0]
            });
        }

        const seen = new Set();

        return options.filter(item => {
            const key = monomialKeyFromText(item.value);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 4);
    }

    function renderPartialGroupBox(title, terms) {
        return `
            <div class="scompolab-rule-box mb-3">
                <p class="mb-2"><strong>${title}</strong></p>
                <div class="scompolab-poly-display small">
                    ${terms.map(term => `
                        <button type="button" class="scompolab-term">
                            ${pretty(term)}
                        </button>
                    `).join("")}
                </div>
            </div>
        `;
    }

    function renderPartialPrototype() {
        const terms = splitTerms(state.currentPolynomial);
        const selected = new Set();

        state.step = "methodStub";
        state.progress = 70;
        updateHeader();

        if (terms.length < 4 || terms.length % 2 !== 0) {
            app.innerHTML = `
            <h3>Raccoglimento parziale</h3>

            ${alertBox("warning", "Il raccoglimento parziale guidato richiede un numero pari di termini, almeno quattro.")}

            <div class="scompolab-actions mt-3">
                <button type="button" class="btn btn-outline-secondary" id="backToMethods">Torna ai metodi</button>
            </div>
        `;

            document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
            return;
        }

        app.innerHTML = `
        <h3>Raccoglimento parziale</h3>

        <p class="text-black-60">
            Seleziona ${terms.length / 2} termini del <strong>primo gruppo</strong>. Gli altri formeranno automaticamente il secondo gruppo.
            Cerca un raggruppamento che porti alla stessa parentesi nei due gruppi: in uno dei due gruppi può anche comparire il fattore 1.
        </p>

        <div class="scompolab-poly-display small">
            ${terms.map((term, index) => `
                <button type="button" class="scompolab-term" data-term-index="${index}">
                    ${pretty(term)}
                </button>
            `).join("")}
        </div>

        <div id="partialFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToMethods">Indietro</button>
            <button type="button" class="btn btn-success" id="checkFirstGroup">Controlla gruppo</button>
        </div>
    `;

        app.querySelectorAll("[data-term-index]").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.dataset.termIndex, 10);

                if (selected.has(index)) {
                    selected.delete(index);
                    btn.classList.remove("selected");
                } else {
                    if (selected.size === terms.length / 2) return;
                    selected.add(index);
                    btn.classList.add("selected");
                }
            });
        });

        document.getElementById("checkFirstGroup").addEventListener("click", () => {
            const feedback = document.getElementById("partialFeedback");
            const groupSize = terms.length / 2;

            if (selected.size !== groupSize) {
                feedback.innerHTML = alertBox(
                    "warning",
                    "Devi selezionare esattamente " + groupSize + " termini per formare il primo gruppo."
                );
                return;
            }

            const firstIndexes = Array.from(selected).sort((a, b) => a - b);
            const grouping = getPartialGroupingFromIndexes(terms, firstIndexes);

            const firstHasUsefulFactor = hasUsefulCommonFactor(grouping.firstGroupTerms);
            const secondHasUsefulFactor = hasUsefulCommonFactor(grouping.secondGroupTerms);

            if (!firstHasUsefulFactor && !secondHasUsefulFactor) {
                feedback.innerHTML = alertBox(
                    "warning",
                    "In questo raggruppamento non compare un fattore comune significativo in nessuno dei due gruppi. Prova un altro raggruppamento."
                );
                return;
            }

            if (!grouping.sameInside) {
                feedback.innerHTML = alertBox(
                    "warning",
                    "Questo raggruppamento non porta alla stessa parentesi nei due gruppi. Ricorda: un gruppo può anche mettere in evidenza 1, ma le parentesi finali devono essere uguali."
                );
                return;
            }

            disableButtons("[data-term-index], #checkFirstGroup");

            feedback.innerHTML = alertBox(
                "success",
                "Buona scelta: i due gruppi possono produrre la stessa parentesi. Ora troviamo i fattori comuni passo passo."
            );

            addContinueButton("partialFeedback", "Continua", () => renderPartialFirstFactor(grouping));
        });

        document.getElementById("backToMethods").addEventListener("click", () => setStep("chooseMethod", 55));
    }

    function renderPartialFirstFactor(grouping) {
        const options = buildFactorChoiceOptions(grouping.firstGroup.factor, grouping.firstGroupTerms);

        app.innerHTML = `
        <h3>Raccoglimento parziale: primo gruppo</h3>

        <p class="text-black-60">
            Ora osserva solo il primo gruppo e scegli il fattore comune da raccogliere.
        </p>

        ${renderPartialGroupBox("Primo gruppo", grouping.firstGroupTerms)}

        <div class="scompolab-option-grid">
            ${options.map(opt => `
                <button type="button" data-partial-first-factor="${opt.value}">
                    ${pretty(opt.label)}
                </button>
            `).join("")}
        </div>

        <div id="partialFirstFactorFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToPartialGroups">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-partial-first-factor]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("partialFirstFactorFeedback");
                const answer = btn.dataset.partialFirstFactor;

                app.querySelectorAll("[data-partial-first-factor]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (!sameMonomialText(answer, grouping.firstGroup.factor)) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi raccogliere il fattore comune più utile del primo gruppo."
                    );
                    return;
                }

                disableButtons("[data-partial-first-factor]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: il primo gruppo diventa <strong>" +
                    pretty(grouping.firstGroup.factor) +
                    "(" +
                    pretty(grouping.firstGroup.inside) +
                    ")</strong>."
                );

                addContinueButton("partialFirstFactorFeedback", "Continua", () => renderPartialSecondFactor(grouping));
            });
        });

        document.getElementById("backToPartialGroups").addEventListener("click", renderPartialPrototype);
    }

    function renderPartialSecondFactor(grouping) {
        const options = buildFactorChoiceOptions(grouping.secondGroup.factor, grouping.secondGroupTerms);

        app.innerHTML = `
        <h3>Raccoglimento parziale: secondo gruppo</h3>

        <p class="text-black-60">
            Ora fai lo stesso con il secondo gruppo. Attenzione al segno: a volte conviene raccogliere un fattore negativo.
        </p>

        ${renderPartialGroupBox("Secondo gruppo", grouping.secondGroupTerms)}

        <div class="scompolab-option-grid">
            ${options.map(opt => `
                <button type="button" data-partial-second-factor="${opt.value}">
                    ${pretty(opt.label)}
                </button>
            `).join("")}
        </div>

        <div id="partialSecondFactorFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToPartialFirstFactor">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-partial-second-factor]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("partialSecondFactorFeedback");
                const answer = btn.dataset.partialSecondFactor;

                app.querySelectorAll("[data-partial-second-factor]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (!sameMonomialText(answer, grouping.secondGroup.factor)) {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Controlla sia il fattore comune sia il segno da raccogliere."
                    );
                    return;
                }

                disableButtons("[data-partial-second-factor]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: il secondo gruppo diventa <strong>" +
                    pretty(grouping.secondGroup.factor) +
                    "(" +
                    pretty(grouping.secondGroup.inside) +
                    ")</strong>."
                );

                addContinueButton("partialSecondFactorFeedback", "Continua", () => renderPartialCompare(grouping));
            });
        });

        document.getElementById("backToPartialFirstFactor").addEventListener("click", () => renderPartialFirstFactor(grouping));
    }

    function renderPartialCompare(grouping) {
        app.innerHTML = `
        <h3>Confronta le parentesi</h3>

        <p class="text-black-60">
            Il raccoglimento parziale funziona solo se dopo il raccoglimento nei due gruppi compare la stessa parentesi.
        </p>

        <div class="scompolab-formula mb-3">
            ${pretty(state.currentPolynomial)} =
            ${pretty(grouping.firstGroup.factor)}(${pretty(grouping.firstGroup.inside)})
            ${grouping.secondGroup.factor.startsWith("-") ? "" : "+"}
            ${pretty(grouping.secondGroup.factor)}(${pretty(grouping.secondGroup.inside)})
        </div>

        <p class="mb-3">Le due parentesi ottenute sono uguali?</p>

        <div class="scompolab-option-grid">
            <button type="button" data-partial-compare="yes">Sì, sono uguali</button>
            <button type="button" data-partial-compare="no">No, sono diverse</button>
        </div>

        <div id="partialCompareFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToPartialSecondFactor">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-partial-compare]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("partialCompareFeedback");

                app.querySelectorAll("[data-partial-compare]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.partialCompare !== "yes") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Guarda bene: le parentesi sono uguali. È proprio questo che ci permette di raccoglierle."
                    );
                    return;
                }

                disableButtons("[data-partial-compare]");

                feedback.innerHTML = alertBox(
                    "success",
                    "Esatto: la parentesi comune è <strong>(" +
                    pretty(grouping.firstGroup.inside) +
                    ")</strong>."
                );

                addContinueButton("partialCompareFeedback", "Continua", () => renderPartialFactorization(grouping));
            });
        });

        document.getElementById("backToPartialSecondFactor").addEventListener("click", () => renderPartialSecondFactor(grouping));
    }

    function renderPartialFactorization(grouping) {
        const commonFactor = grouping.firstGroup.inside;
        const otherFactor = buildPartialFinalFactor(grouping.firstGroup.factor, grouping.secondGroup.factor);

        const options = [
            {
                value: "correct",
                label: "(" + commonFactor + ")(" + otherFactor + ")"
            },
            {
                value: "wrong_no_second",
                label: grouping.firstGroup.factor + "(" + commonFactor + ")"
            },
            {
                value: "wrong_sum",
                label: "(" + grouping.firstGroup.factor + ")(" + grouping.secondGroup.factor + ")"
            },
            {
                value: "wrong_inside",
                label: "(" + grouping.firstGroup.factor + "+" + commonFactor + ")(" + grouping.secondGroup.factor + ")"
            }
        ];

        app.innerHTML = `
        <h3>Completa il raccoglimento parziale</h3>

        <p class="text-black-60">
            Ora raccogli la parentesi comune e scegli la scomposizione corretta.
        </p>

        <div class="scompolab-formula mb-3">
            ${pretty(state.currentPolynomial)} =
            ${pretty(grouping.firstGroup.factor)}(${pretty(grouping.firstGroup.inside)})
            ${grouping.secondGroup.factor.startsWith("-") ? "" : "+"}
            ${pretty(grouping.secondGroup.factor)}(${pretty(grouping.secondGroup.inside)})
        </div>

        <div class="scompolab-option-grid">
            ${options.map(opt => `
                <button type="button" data-partial-final="${opt.value}">
                    ${pretty(opt.label)}
                </button>
            `).join("")}
        </div>

        <div id="partialFinalFeedback" class="scompolab-feedback"></div>

        <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-outline-secondary" id="backToPartialCompare">Indietro</button>
        </div>
    `;

        app.querySelectorAll("[data-partial-final]").forEach(btn => {
            btn.addEventListener("click", () => {
                const feedback = document.getElementById("partialFinalFeedback");

                app.querySelectorAll("[data-partial-final]").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                if (btn.dataset.partialFinal !== "correct") {
                    feedback.innerHTML = alertBox(
                        "warning",
                        "Non ancora. Devi raccogliere la parentesi uguale che compare nei due gruppi."
                    );
                    return;
                }

                disableButtons("[data-partial-final]");

                state.builtFactors.push("(" + commonFactor + ")");
                state.builtFactors.push("(" + otherFactor + ")");
                state.remainingPolynomial = "";
                state.currentPolynomial = "";

                updateHeader();

                feedback.innerHTML = alertBox(
                    "success",
                    "Corretto: <strong>" +
                    pretty(state.originalInput) +
                    " = (" +
                    pretty(commonFactor) +
                    ")(" +
                    pretty(otherFactor) +
                    ")</strong>."
                );

                addContinueButton("partialFinalFeedback", "Concludi", () => renderCompletedFactorization());
            });
        });

        document.getElementById("backToPartialCompare").addEventListener("click", () => renderPartialCompare(grouping));
    }

    function canApplyPartialGrouping(poly) {
        const terms = splitTerms(poly);

        if (terms.length < 4 || terms.length % 2 !== 0) return false;

        const groupSize = terms.length / 2;
        const indexes = terms.map((_, index) => index);
        const groups = combinations(indexes, groupSize);

        for (const groupIndexes of groups) {
            // Evitiamo di controllare due volte lo stesso raggruppamento e il suo complementare.
            if (!groupIndexes.includes(0)) continue;

            const grouping = getPartialGroupingFromIndexes(terms, groupIndexes);

            if (grouping.sameInside) {
                return true;
            }
        }

        return false;
    }

    function getGuidedApplicableMethods(poly) {
        const methods = [];

        if (!poly) return methods;

        let a = null;

        try {
            a = analyze(poly);
        } catch (error) {
            console.error("Errore durante l'analisi del polinomio:", error);
            return methods;
        }

        if (a.hasTotal) {
            methods.push({ key: "totale", label: methodNames.totale });
        }

        const checks = [
            { key: "differenza_quadrati", label: methodNames.differenza_quadrati, fn: analyzeDifferenceSquares },
            { key: "differenza_cubi", label: methodNames.differenza_cubi, fn: analyzeDifferenceCubes },
            { key: "somma_cubi", label: methodNames.somma_cubi, fn: analyzeSumCubes },
            { key: "quadrato_binomio", label: methodNames.quadrato_binomio, fn: analyzeSquareBinomial },
            { key: "trinomio_speciale", label: methodNames.trinomio_speciale, fn: analyzeSpecialTrinomial },
            { key: "cubo_binomio", label: methodNames.cubo_binomio, fn: analyzeCubeBinomial },
            { key: "quadrato_trinomio", label: methodNames.quadrato_trinomio, fn: analyzeSquareTrinomial }
        ];

        checks.forEach(check => {
            try {
                const result = check.fn(poly);
                if (result && result.valid) {
                    methods.push({ key: check.key, label: check.label });
                }
            } catch (error) {
                console.warn("Controllo metodo non riuscito:", check.key, error);
            }
        });

        try {
            if (canApplyPartialGrouping(poly)) {
                methods.push({ key: "raccoglimento_parziale", label: methodNames.raccoglimento_parziale });
            }
        } catch (error) {
            console.warn("Controllo raccoglimento parziale non riuscito:", error);
        }

        const seen = new Set();
        return methods.filter(method => {
            if (seen.has(method.key)) return false;
            seen.add(method.key);
            return true;
        });
    }

    function isFurtherFactorableWithNerdamer(poly) {
        if (typeof nerdamer === "undefined") return false;

        try {
            const expandedOriginal = nerdamer(poly)
                .expand()
                .toString()
                .replace(/\s+/g, "");

            const factored = nerdamer(`factor(${poly})`)
                .toString()
                .replace(/\s+/g, "");

            return factored.includes("(") && factored !== expandedOriginal;
        } catch (error) {
            console.error("Errore durante la fattorizzazione con Nerdamer:", error);
            return false;
        }
    }

    function getAutomaticFinalCheck(poly) {
        const guidedMethods = getGuidedApplicableMethods(poly);
        const nerdamerFactorable = guidedMethods.length === 0 && isFurtherFactorableWithNerdamer(poly);

        return {
            canContinue: guidedMethods.length > 0 || nerdamerFactorable,
            guidedMethods,
            nerdamerFactorable
        };
    }

    function renderFinalCheck() {
        const check = getAutomaticFinalCheck(state.remainingPolynomial);
        const methodList = check.guidedMethods.map(method => method.label).join(", ");

        if (!check.canContinue) {
            state.step = "finalCheck";
            state.progress = 100;
            updateHeader();

            app.innerHTML = `
            <h3>Controllo finale</h3>
            <p class="text-black-60">
                Ho controllato automaticamente se il fattore rimasto può essere ancora scomposto con i metodi guidati già disponibili.
            </p>

            <div class="scompolab-summary">
                <p><strong>Scomposizione ottenuta:</strong></p>
                <div class="scompolab-formula">
                    ${pretty(state.originalInput)} = ${state.builtFactors.map(pretty).join(" · ")} · (${pretty(state.remainingPolynomial)})
                </div>
            </div>

            ${alertBox("success", "La scomposizione può considerarsi conclusa: non risultano ulteriori metodi applicabili al fattore <strong>" + pretty(state.remainingPolynomial) + "</strong>.")}

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-success" id="tryAnother">Scomponi un altro polinomio</button>
            </div>
        `;

            document.getElementById("tryAnother").addEventListener("click", reset);
            return;
        }

        state.step = "finalCheck";
        state.progress = 85;
        updateHeader();

        const message = check.guidedMethods.length > 0
            ? "Il fattore <strong>" + pretty(state.remainingPolynomial) + "</strong> può ancora essere scomposto. Metodo/i riconosciuto/i: <strong>" + methodList + "</strong>."
            : "Il fattore <strong>" + pretty(state.remainingPolynomial) + "</strong> sembra ancora scomponibile, ma potrebbe richiedere un metodo non ancora guidato, ad esempio Ruffini.";

        app.innerHTML = `
            <h3>Controllo finale</h3>
            <p class="text-black-60">
                Prima di concludere, ScompoLab controlla automaticamente se il fattore rimasto è ancora scomponibile.
            </p>

            <div class="scompolab-summary">
                <p><strong>Scomposizione ottenuta:</strong></p>
                <div class="scompolab-formula">
                    ${pretty(state.originalInput)} = ${state.builtFactors.map(pretty).join(" · ")} · (${pretty(state.remainingPolynomial)})
                </div>
            </div>

            ${alertBox("warning", message)}

            <div id="finalFeedback" class="scompolab-feedback"></div>

            <div class="scompolab-actions d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn btn-outline-success" id="tryAnother">Scomponi un altro polinomio</button>
                <button type="button" class="btn btn-success ml-auto" id="continueAutoFactoring">Continua a scomporre</button>
            </div>
        `;

        document.getElementById("continueAutoFactoring").addEventListener("click", () => {
            state.currentPolynomial = state.remainingPolynomial;
            state.analysis = analyze(state.currentPolynomial);
            setStep("totalQuestion", 25);
        });

        document.getElementById("tryAnother").addEventListener("click", reset);
    }

    function reset() {
        state.originalInput = "";
        state.currentPolynomial = "";
        state.analysis = null;
        state.builtFactors = [];
        state.remainingPolynomial = "";
        state.step = "input";
        state.progress = 10;
        state.selectedCommonFactors = [];
        state.selectedMethod = null;
        render();
    }

    resetButton.addEventListener("click", reset);

    render();
});
