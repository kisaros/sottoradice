<section id="scompolab" class="scompolab-section my-5">
    <div class="container">
        <div class="scompolab-card">

            <div class="scompolab-header">
                <div>
                    <small class="text-uppercase mb-2">Wizard interattivo</small>
                    <h3 class="serif font-weight-700 mb-2">ScompoLab</h3>
                    <p class="mb-0 text-black-60">
                        Un tutor guidato per scegliere il metodo di scomposizione passo dopo passo.
                    </p>
                </div>

                <button type="button" class="btn btn-sm btn-outline-success" id="scompolabReset">
                    Ricomincia
                </button>
            </div>

            <div class="scompolab-current">
                <div>
                    <span class="scompolab-current-label">Polinomio su cui sto lavorando</span>
                    <div id="scompolabCurrentPoly" class="scompolab-current-poly">—</div>
                </div>
                <div>
                    <span class="scompolab-current-label">Scomposizione costruita</span>
                    <div id="scompolabBuiltFactorization" class="scompolab-current-factorization">—</div>
                </div>
            </div>

            <div class="scompolab-progress">
                <div class="d-flex justify-content-between small mb-2">
                    <span id="scompolabStepLabel">Step 1</span>
                    <span id="scompolabStepTitle">Inserisci il polinomio</span>
                </div>
                <div class="progress">
                    <div id="scompolabProgressBar" class="progress-bar" style="width: 10%;"></div>
                </div>
            </div>

            <div id="scompolabApp" class="scompolab-body">
                <!-- Il contenuto viene generato da assets/js/scompolab.js -->
            </div>

        </div>
    </div>
</section>
