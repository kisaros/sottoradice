<!--<h6 class="text-uppercase text-left mx-auto">
    I progetti
</h6>
<h2 class="text-left mb-0 pb-2">
    <span class="text-primary">Cosa abbiamo fatto</span> – <span class="">e cosa stiamo facendo</span>.
</h2>
<h6 class="font-weight-300 mb-5">Progetti interattivi, ricerche, strumenti e giochi matematici realizzati dalla classe.
    In crescita ogni anno.</h6>-->


<div class="row mx-0">

    <!-- esperienza di classe -->

    <div class="col-12 d-flex justify-content-center mb-4 mt-3 mt-md-2 position-relative">
        <hr class="border-top-dark position-center-center w-100 z-index-0 m-0">
        <div class="text-uppercase bg-white px-4 d-flex justify-content-center align-items-center position-relative mb-0"
             style="height: 30px; z-index:1;">
            Esperienza di classe
        </div>
    </div>


    <!-- in evidenza -->
    <?php
    $project = $projects[0] ?? null;

    if ($project):

        $id = $project['id'];

        $tags     = $projectTags[$id] ?? [];
        $students = $projectStudents[$id] ?? [];
        $classes  = $projectClasses[$id] ?? [];
        $teachers = $projectTeachers[$id] ?? [];

        $color = $project['category_color'] ?: 'primary';

        $shownStudents = array_slice($students, 0, 3);
        $remainingStudents = max(count($students) - count($shownStudents), 0);
        ?>

        <a class="border box-link col-12 d-flex flex-column flex-md-row mb-4 px-0 rounded-lg"
           href="<?= $dominio ?>progetti/<?= htmlspecialchars($project['slug']) ?>"
           title="<?= htmlspecialchars($project['title']) ?> | Sottoradice">

            <div class="w-md-50 p-4">

                <small class="text-<?= htmlspecialchars($color) ?> font-weight-500 d-flex align-items-center justify-content-start mb-2">
                    <span class="rounded-xsmall bg-<?= htmlspecialchars($color) ?> mr-3"></span>
                    <span><?= htmlspecialchars($project['category_name']) ?></span>
                </small>

                <h3><?= htmlspecialchars($project['title']) ?></h3>

                <p class="text-secondary">
                    <?= htmlspecialchars($project['subtitle']) ?>
                </p>

                <div class="d-flex align-items-center justify-content-between mt-4">

                    <div>
                        <?php foreach ($tags as $tag): ?>
                            <small class="bg-<?= htmlspecialchars($color) ?>-25
                                  text-<?= htmlspecialchars($color) ?>
                                  px-2 rounded-pill mb-0 mr-1">
                                <?= htmlspecialchars($tag['label']) ?>
                            </small>
                        <?php endforeach; ?>
                    </div>

                    <?php if (!empty($project['school_year'])): ?>
                        <small class="text-secondary">
                            a.s. <?= htmlspecialchars($project['school_year']) ?>
                        </small>
                    <?php endif; ?>

                </div>

                <div class="d-flex align-items-center justify-content-between mt-3">

                    <?php if (!empty($students)): ?>

                        <!-- STUDENTI -->
                        <div class="team-foto d-flex align-items-center justify-content-start">

                            <?php foreach ($shownStudents as $student): ?>

                                <img class="profile-img"
                                     src="<?= $dominio . htmlspecialchars($student['image']) ?>"
                                     alt="<?= htmlspecialchars(
                                             $student['first_name'] . ' ' . $student['last_name']
                                     ) ?>">

                            <?php endforeach; ?>


                            <?php if ($remainingStudents > 0): ?>

                                <div class="link-plus profile-img bg-white-50 rounded-circle d-flex align-items-center justify-content-center">
                                    <small class="text-secondary font-weight-300">
                                        +<?= $remainingStudents ?>
                                    </small>
                                </div>

                            <?php endif; ?>


                            <?php if (!empty($classes)): ?>

                                <small class="text-secondary mb-0 ml-2">

                                    <?php
                                    $classLabels = [];

                                    foreach ($classes as $class) {
                                        $classLabels[] = $class['name'];
                                    }

                                    echo htmlspecialchars(implode(' · ', $classLabels));
                                    ?>

                                </small>

                            <?php endif; ?>

                        </div>


                    <?php elseif (!empty($teachers)): ?>

                        <!-- DOCENTI -->
                        <div class="team-foto d-flex align-items-center justify-content-start">

                            <?php foreach ($teachers as $teacher): ?>

                                <?php if (!empty($teacher['image'])): ?>
                                    <img class="profile-img"
                                         src="<?= $dominio . htmlspecialchars($teacher['image']) ?>"
                                         alt="<?= htmlspecialchars(
                                                 trim(
                                                         ($teacher['title'] ?? '') . ' ' .
                                                         ($teacher['first_name'] ?? '') . ' ' .
                                                         ($teacher['last_name'] ?? '')
                                                 )
                                         ) ?>">
                                <?php endif; ?>

                            <?php endforeach; ?>


                            <small class="text-secondary mb-0 ml-2">

                                <?php
                                $teacherNames = [];

                                foreach ($teachers as $teacher) {

                                    $teacherNames[] = trim(
                                            ($teacher['title'] ?? '') . ' ' .
                                            ($teacher['first_name'] ?? '') . ' ' .
                                            ($teacher['last_name'] ?? '')
                                    );

                                }

                                echo htmlspecialchars(implode(' · ', $teacherNames));
                                ?>

                            </small>

                        </div>

                    <?php else: ?>

                        <!-- Nessun autore da mostrare -->
                        <div></div>

                    <?php endif; ?>


                    <span class="icon icon-arrow-right"></span>

                </div>

            </div>


            <?php if (
                    !empty($project['card_image']) &&
                    !empty($project['show_card_image'])
            ): ?>

                <picture class="w-md-50 bg-<?= htmlspecialchars($color) ?>-25">

                    <img class="img object-cover"
                         style="height: 267px;"
                         src="<?= $dominio . htmlspecialchars($project['card_image']) ?>"
                         alt="<?= htmlspecialchars($project['title']) ?> | Sottoradice">

                </picture>

            <?php endif; ?>

        </a>

    <?php endif; ?>

    <!-- altri progetti -->

    <?php

    $otherProjects = array_slice($projects, 1);

    $currentGroup = 'class_experience';
    $cardIndex = 0;

    foreach ($otherProjects as $project):

        $id = $project['id'];

        $tags     = $projectTags[$id] ?? [];
        $students = $projectStudents[$id] ?? [];
        $classes  = $projectClasses[$id] ?? [];
        $teachers = $projectTeachers[$id] ?? [];

        $color = $project['category_color'] ?: 'primary';

        $shownStudents = array_slice($students, 0, 3);
        $remainingStudents = max(count($students) - count($shownStudents), 0);

        $hasImage =
                !empty($project['card_image']) &&
                !empty($project['show_card_image']);


        /*
         * Cambio gruppo:
         * quando passiamo dalle esperienze di classe
         * alle proposte docente mostriamo il separatore.
         */
        if ($project['project_group'] !== $currentGroup):

            $currentGroup = $project['project_group'];
            $cardIndex = 0;

            if ($currentGroup === 'teacher_proposal'):
                ?>

                <div class="d-flex justify-content-center w-100 mb-4 mt-5 position-relative">
                    <hr class="border-top-dark position-center-center w-100 z-index-0 m-0">

                    <div class="text-uppercase bg-white px-4 d-flex justify-content-center align-items-center position-relative mb-0"
                         style="height: 30px; z-index:1;">
                        Proposta docente
                    </div>
                </div>

            <?php
            endif;

        endif;
        ?>


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

            <?php endif; ?>


            <?php if ($hasImage): ?>
            <div class="p-4">
                <?php endif; ?>


                <small class="text-<?= htmlspecialchars($color) ?>
                      font-weight-500
                      d-flex align-items-center justify-content-start mb-2">

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

                    <div>

                        <?php foreach ($tags as $tag): ?>

                            <small class="bg-<?= htmlspecialchars($color) ?>-25
                                  text-<?= htmlspecialchars($color) ?>
                                  px-2 rounded-pill mb-0 mr-1">

                                <?= htmlspecialchars($tag['label']) ?>

                            </small>

                        <?php endforeach; ?>

                    </div>


                    <?php if (!empty($project['school_year'])): ?>

                        <small class="text-secondary">
                            a.s. <?= htmlspecialchars($project['school_year']) ?>
                        </small>

                    <?php endif; ?>

                </div>


                <div class="d-flex align-items-center justify-content-between mt-3">


                    <?php if (!empty($students)): ?>

                        <!-- STUDENTI -->

                        <div class="team-foto d-flex align-items-center justify-content-start">

                            <?php foreach ($shownStudents as $student): ?>

                                <img class="profile-img"
                                     src="<?= $dominio . htmlspecialchars($student['image']) ?>"
                                     alt="<?= htmlspecialchars(
                                             $student['first_name'] . ' ' . $student['last_name']
                                     ) ?>">

                            <?php endforeach; ?>


                            <?php if ($remainingStudents > 0): ?>

                                <div class="link-plus profile-img bg-white-50 rounded-circle d-flex align-items-center justify-content-center">

                                    <small class="text-secondary font-weight-300">
                                        +<?= $remainingStudents ?>
                                    </small>

                                </div>

                            <?php endif; ?>


                            <?php if (!empty($classes)): ?>

                                <small class="text-secondary mb-0 ml-2">

                                    <?php

                                    $classLabels = [];

                                    foreach ($classes as $class) {
                                        $classLabels[] = $class['name'];
                                    }

                                    echo htmlspecialchars(
                                            implode(' · ', $classLabels)
                                    );

                                    ?>

                                </small>

                            <?php endif; ?>

                        </div>


                    <?php elseif (!empty($teachers)): ?>

                        <!-- DOCENTI -->

                        <div class="team-foto d-flex align-items-center justify-content-start">

                            <?php foreach ($teachers as $teacher): ?>

                                <?php if (!empty($teacher['image'])): ?>

                                    <img class="profile-img"
                                         src="<?= $dominio . htmlspecialchars($teacher['image']) ?>"
                                         alt="<?= htmlspecialchars(
                                                 trim(
                                                         ($teacher['title'] ?? '') . ' ' .
                                                         ($teacher['first_name'] ?? '') . ' ' .
                                                         ($teacher['last_name'] ?? '')
                                                 )
                                         ) ?>">

                                <?php endif; ?>

                            <?php endforeach; ?>


                            <small class="text-secondary mb-0 ml-2">

                                <?php

                                $teacherNames = [];

                                foreach ($teachers as $teacher) {

                                    $teacherNames[] = trim(
                                            ($teacher['title'] ?? '') . ' ' .
                                            ($teacher['first_name'] ?? '') . ' ' .
                                            ($teacher['last_name'] ?? '')
                                    );

                                }

                                echo htmlspecialchars(
                                        implode(' · ', $teacherNames)
                                );

                                ?>

                            </small>

                        </div>


                    <?php else: ?>

                        <div></div>

                    <?php endif; ?>


                    <span class="icon icon-arrow-right"></span>

                </div>


                <?php if ($hasImage): ?>
            </div>
        <?php endif; ?>


        </a>

        <?php $cardIndex++; ?>

    <?php endforeach; ?>

</div>
