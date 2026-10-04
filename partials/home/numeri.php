<section class="bg-secondary-25 pt-2 pb-3 pt-md-3 pb-md-4 pt-xl-4 pb-xl-5">
    <h4 class="text-uppercase text-center mx-auto pt-5 pb-4 pb-md-5">
        I nostri numeri
    </h4>

    <div class="home-numeri container">
        <div class="row">

            <div class="col-6 col-md-3 border-right py-4">
                <p class="text-big text-primary text-center font-weight-700">
                    <?= (int) $stats['projects_count'] ?>
                </p>
                <p class="text-center font-weight-300 mb-0">
                    progetti attivi
                </p>
            </div>

            <div class="col-6 col-md-3 border-right py-4">
                <p class="text-big text-pink text-center font-weight-700">
                    <?= (int) $stats['students_count'] ?>
                </p>
                <p class="text-center font-weight-300 mb-0">
                    studenti autori
                </p>
            </div>

            <div class="col-6 col-md-3 border-right py-4">
                <p class="text-big text-teal text-center font-weight-700">
                    <?= (int) $stats['teacher_projects_count'] ?>
                </p>
                <p class="text-center font-weight-300 mb-0">
                    proposte docente
                </p>
            </div>

            <div class="col-6 col-md-3 py-4">
                <p class="text-big text-infty text-purple text-center font-weight-800">
                    &infin;
                </p>
                <p class="text-center font-weight-300 mb-0">
                    progetti in arrivo
                </p>
            </div>

        </div>
    </div>
</section>