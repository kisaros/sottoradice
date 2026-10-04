<?php include '../config/database.php'; ?>

<?php

$slug = $_GET['slug'] ?? '';

if ($slug === '') {
    http_response_code(404);
    exit('Progetto non trovato.');
}

$stmt = $pdo->prepare("
    SELECT
        p.*,
        c.name AS category_name
    FROM projects p
    LEFT JOIN categories c
        ON p.category_id = c.id
    WHERE p.slug = :slug
      AND p.status = 'published'
    LIMIT 1
");

$stmt->execute(['slug' => $slug]);

$project = $stmt->fetch();

if (!$project) {
    http_response_code(404);
    exit('Progetto non trovato.');
}

/* Docenti associati al progetto */

$stmtTeachers = $pdo->prepare("
    SELECT
        t.title,
        t.first_name,
        t.last_name
    FROM teachers t
    INNER JOIN project_teachers pt
        ON t.id = pt.teacher_id
    WHERE pt.project_id = :project_id
    ORDER BY t.last_name, t.first_name
");

$stmtTeachers->execute([
    'project_id' => $project['id']
]);

$teachers = $stmtTeachers->fetchAll();


/* Classi associate al progetto */

$stmtClasses = $pdo->prepare("
    SELECT
        c.name
    FROM classes c
    INNER JOIN project_classes pc
        ON c.id = pc.class_id
    WHERE pc.project_id = :project_id
    ORDER BY c.name
");

$stmtClasses->execute([
    'project_id' => $project['id']
]);

$classes = $stmtClasses->fetchAll();

/* Sezioni testuali del progetto */

$stmtSections = $pdo->prepare("
    SELECT *
    FROM project_sections
    WHERE project_id = :project_id
    ORDER BY COALESCE(sort_order, id), id
");

$stmtSections->execute([
    'project_id' => $project['id']
]);

$sections = $stmtSections->fetchAll();


/* Risorse e materiali */

$stmtResources = $pdo->prepare("
    SELECT *
    FROM project_resources
    WHERE project_id = :project_id
    ORDER BY COALESCE(sort_order, id), id
");

$stmtResources->execute([
    'project_id' => $project['id']
]);

$resources = $stmtResources->fetchAll();



/* Gallery */

$stmtGallery = $pdo->prepare("
    SELECT *
    FROM project_gallery
    WHERE project_id = :project_id
    ORDER BY COALESCE(sort_order, id), id
");

$stmtGallery->execute([
    'project_id' => $project['id']
]);

$gallery = $stmtGallery->fetchAll();

?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = $project['title'] . ' | Sottoradice';
$desc = $project['meta_description'];
$ogImage = $dominio . $project['og_image'];
$keywords = $project['meta_keywords'];

include_once '../partials/head.php';

?>

<body>

<?php include '../partials/navbar.php'; ?>

<?php if ($project['page_status'] === 'under_construction'): ?>

    <?php include '../partials/progetti/core/under-construction.php'; ?>

<?php else: ?>

<main>
    <header class="">
        <div class="container pt-5">
            <div class="hero mb-4">
                <small class="text-success font-weight-500 d-flex align-items-center justify-content-start mb-2">
                    <span class="rounded-xsmall bg-success mr-3"></span>
                    <span class="text-uppercase">
                            <?= htmlspecialchars($project['category_name']) ?>
                    </span>
                </small>
                <h1 class="serif font-weight-700 text-left px-0">
                    <?= $project['hero_title'] ?>
                </h1>
                <h2 class="serif font-weight-300 text-secondary text-left pb-4 px-0">
                    <?= htmlspecialchars($project['subtitle']) ?>
                </h2>
                <div class="d-flex flex-wrap align-items-center justify-content-start">
                    <?php foreach ($teachers as $teacher): ?>
                        <small class="bg-purple-25 text-purple px-3 rounded-pill mb-2 mr-3">
                            <?= htmlspecialchars(
                                trim(
                                    ($teacher['title'] ?? '') . ' ' .
                                    $teacher['first_name'] . ' ' .
                                    $teacher['last_name']
                                )
                            ) ?>
                        </small>
                    <?php endforeach; ?>

                    <?php foreach ($classes as $class): ?>
                        <small class="bg-success-25 text-success px-3 rounded-pill mb-2 mr-3">
                            Classe <?= htmlspecialchars($class['name']) ?>
                            – a.s. <?= htmlspecialchars($project['school_year']) ?>
                        </small>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="hero bg-waves-success mb-5">
                <figure class="project-image">
                    <img src="<?= $dominio . htmlspecialchars($project['hero_image']) ?>"
                         class="h-100 w-100 object-contain object-center"
                         alt="<?= htmlspecialchars($project['title']) ?>">
                </figure>
            </div>
        </div>
    </header>

    <?php foreach ($sections as $section): ?>

        <section class="container">

            <h2 class="text-left mb-0 pb-3">
                <?= $section['title_html'] ?: htmlspecialchars($section['title']) ?>
            </h2>

            <?php if (!empty($section['content'])): ?>
                <div class="text-p-plus mb-4">
                    <?= $section['content'] ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($section['subtitle'])): ?>
                <h4>
                    <?= htmlspecialchars($section['subtitle']) ?>
                </h4>
            <?php endif; ?>

            <?php if (!empty($section['subcontent'])): ?>
                <?= $section['subcontent'] ?>
            <?php endif; ?>

        </section>

    <?php endforeach; ?>

    <!-- CORE -->

    <?php

    $coreFile = '../partials/progetti/core/' . $project['slug'] . '.php';

    if (file_exists($coreFile)) {
        include $coreFile;
    }

    ?>

    <!-- risorse e materiali -->

    <?php if (!empty($resources)): ?>

        <section class="container mb-5">

            <h2 class="text-left mb-0 pb-3">
                <span class="text-teal">Risorse</span> e materiali
            </h2>

            <?php include '../partials/progetti/risorse.php'; ?>

        </section>

    <?php endif; ?>


    <!-- gallery -->

    <?php if (!empty($gallery)): ?>

        <section class="container mb-5">

            <h2 class="text-left mb-0 pb-3">
                Studenti <span class="text-pink">in azione</span>
            </h2>

            <?php include '../partials/progetti/gallery.php'; ?>

        </section>

    <?php endif; ?>


</main>

<?php endif; ?>

<?php include '../partials/footer.php'; ?>
<?php include '../partials/scripts.php'; ?>


<?php if ($project['page_status'] !== 'under_construction' && !empty($gallery)): ?>

    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

    <script>
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true
        });
    </script>

<?php endif; ?>