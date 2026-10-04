<h6 class="text-uppercase text-left mx-auto">
    I progetti
</h6>
<h2 class="text-left mb-0 pb-2">
    <span class="text-primary">Cosa abbiamo fatto</span> – <span class="">e cosa stiamo facendo</span>.
</h2>
<h6 class="font-weight-300 mb-5">
    Progetti interattivi, ricerche, strumenti e giochi matematici realizzati dalle classi.
    In crescita ogni anno.
</h6>


<div class="row mx-0">

    <?php

    $currentGroup = null;
    $cardIndex = 0;

    foreach ($homeProjects as $index => $project):

        $id = $project['id'];
        $color = $project['category_color'] ?: 'primary';
        $tag = $homeProjectTags[$id] ?? null;

        $hasImage =
                !empty($project['card_image']) &&
                !empty($project['show_card_image']);

        /*
         * Separatore del gruppo
         */
        if ($project['project_group'] !== $currentGroup):

            $currentGroup = $project['project_group'];
            $cardIndex = 0;

            $groupLabel = $currentGroup === 'teacher_proposal'
                    ? 'Proposta docente'
                    : 'Esperienza di classe';
            ?>

            <div class="col-12 d-flex justify-content-center mb-4
                        <?= $index === 0 ? 'mt-3 mt-md-2' : 'mt-5' ?>
                        position-relative">

                <hr class="border-top-dark position-center-center w-100 z-index-0 m-0">

                <div class="text-uppercase bg-white px-4
                            d-flex justify-content-center align-items-center
                            position-relative mb-0"
                     style="height: 30px; z-index:1;">

                    <?= htmlspecialchars($groupLabel) ?>

                </div>

            </div>

        <?php endif; ?>


        <?php if ($index === 0): ?>

        <!-- PROGETTO IN EVIDENZA -->

        <a class="border box-link col-12 d-flex flex-column flex-md-row mb-4 px-0 rounded-lg"
           href="<?= $dominio ?>progetti/<?= htmlspecialchars($project['slug']) ?>"
           title="<?= htmlspecialchars($project['title']) ?> | Sottoradice">

            <div class="w-md-50 p-4">

                <small class="text-<?= htmlspecialchars($color) ?>
                                  font-weight-500 d-flex align-items-center
                                  justify-content-start mb-2">

                        <span class="rounded-xsmall
                                     bg-<?= htmlspecialchars($color) ?>
                                     mr-3"></span>

                    <span>
                            <?= htmlspecialchars($project['category_name']) ?>
                        </span>

                </small>

                <h3>
                    <?= htmlspecialchars($project['title']) ?>
                </h3>

                <p class="text-secondary">
                    <?= htmlspecialchars($project['subtitle']) ?>
                </p>

                <div class="d-flex align-items-center justify-content-between mt-4">

                    <?php if ($tag): ?>

                        <small class="bg-<?= htmlspecialchars($color) ?>-25
                                          text-<?= htmlspecialchars($color) ?>
                                          px-3 rounded-pill mb-0">

                            <?= htmlspecialchars($tag['label']) ?>

                        </small>

                    <?php endif; ?>

                    <span class="icon icon-arrow-right"></span>

                </div>

            </div>

            <?php if ($hasImage): ?>

                <picture class="w-md-50 bg-<?= htmlspecialchars($color) ?>-25">

                    <img class="img object-cover"
                         style="height: 230px;"
                         src="<?= $dominio . htmlspecialchars($project['card_image']) ?>"
                         alt="<?= htmlspecialchars($project['title']) ?> | Sottoradice">

                </picture>

            <?php endif; ?>

        </a>


    <?php else: ?>

        <!-- ALTRI PROGETTI -->

        <a href="<?= $dominio ?>progetti/<?= htmlspecialchars($project['slug']) ?>"
           title="<?= htmlspecialchars($project['title']) ?> | Sottoradice"
           class="box-link col-12 col-md-6 rounded-lg border
                      <?= $hasImage ? 'px-0' : 'p-4' ?>
                      mb-4
                      <?= $cardIndex % 2 === 0 ? 'mr-md-4' : '' ?>">

            <?php if ($hasImage): ?>

            <picture class="w-md-50 bg-<?= htmlspecialchars($color) ?>-25">

                <img class="img object-cover"
                     style="height: 230px;"
                     src="<?= $dominio . htmlspecialchars($project['card_image']) ?>"
                     alt="<?= htmlspecialchars($project['title']) ?> | Sottoradice">

            </picture>

            <div class="p-4">

                <?php endif; ?>


                <small class="text-<?= htmlspecialchars($color) ?>
                              font-weight-500 d-flex align-items-center
                              justify-content-start mb-2">

                    <span class="rounded-xsmall
                                 bg-<?= htmlspecialchars($color) ?>
                                 mr-3"></span>

                    <span>
                        <?= htmlspecialchars($project['category_name']) ?>
                    </span>

                </small>

                <h3>
                    <?= htmlspecialchars($project['title']) ?>
                </h3>

                <p class="text-secondary">
                    <?= htmlspecialchars($project['subtitle']) ?>
                </p>

                <div class="d-flex align-items-center justify-content-between mt-4">

                    <?php if ($tag): ?>

                        <small class="bg-<?= htmlspecialchars($color) ?>-25
                                      text-<?= htmlspecialchars($color) ?>
                                      px-3 rounded-pill mb-0">

                            <?= htmlspecialchars($tag['label']) ?>

                        </small>

                    <?php endif; ?>

                    <span class="icon icon-arrow-right"></span>

                </div>


                <?php if ($hasImage): ?>
            </div>
        <?php endif; ?>

        </a>

        <?php $cardIndex++; ?>

    <?php endif; ?>

    <?php endforeach; ?>

</div>
