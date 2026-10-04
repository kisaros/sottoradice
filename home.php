<?php
include 'config/database.php';


$stmtHomeProjects = $pdo->prepare("
    SELECT
        p.*,
        c.name AS category_name,
        c.color AS category_color
    FROM projects p
    LEFT JOIN categories c
        ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY COALESCE(p.sort_order, 9999), p.id
    LIMIT 5
");

$stmtHomeProjects->execute();
$homeProjects = $stmtHomeProjects->fetchAll();


/* PRIMO TAG DI OGNI PROGETTO */

$stmtHomeTags = $pdo->query("
    SELECT project_id, label
    FROM project_tags
    ORDER BY project_id, COALESCE(sort_order, id), id
");

$homeProjectTags = [];

foreach ($stmtHomeTags->fetchAll() as $tag) {
    if (!isset($homeProjectTags[$tag['project_id']])) {
        $homeProjectTags[$tag['project_id']] = $tag;
    }
}


/* NUMERI DEL PROGETTO */

$stmtStats = $pdo->query("
    SELECT
        (
            SELECT COUNT(*)
            FROM projects
            WHERE status = 'published'
        ) AS projects_count,

        (
            SELECT COUNT(DISTINCT ps.student_id)
            FROM project_students ps
            INNER JOIN projects p
                ON p.id = ps.project_id
            WHERE p.status = 'published'
        ) AS students_count,

        (
            SELECT COUNT(*)
            FROM projects
            WHERE status = 'published'
              AND project_group = 'teacher_proposal'
        ) AS teacher_projects_count
");

$stats = $stmtStats->fetch();

?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Sottoradice, la matematica fatta da noi.";
$desc = "Progetti interattivi e guide realizzati dagli studenti dell'IIS Benedetto Radice di Bronte. Per capire davvero la matematica.";
$ogImage = $dominio . "assets/images/og-home.jpg";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once 'partials/head.php';

?>

<body>


<?php include 'partials/navbar.php'; ?>


<main class="">
    <header class="">
        <div class="container">
            <div class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
                <div class="col-12 col-md-6">
                    <h1 class="serif font-weight-700 text-center text-md-left px-4 px-md-0">
                        <span class="font-weight-300">sotto</span><span class="text-primary">radice</span>, la <span
                                class="text-success">matematica</span> fatta da noi.
                    </h1>
                    <h2 class="serif font-weight-300 text-secondary text-center text-md-left pb-4 px-4 px-md-0">Progetti
                        interattivi e guide realizzati dagli studenti dell'IIS "Benedetto Radice" di Bronte. Per capire
                        davvero
                        la matematica.</h2>
                    <div class="align-item-center d-flex justify-content-center justify-content-md-start mb-4 mb-md-0">
                        <a href="<?php echo $dominio ?>progetti" title="Progetti | Sottoradice"
                           class="btn btn-success rounded-lg mr-3">Esplora i progetti</a>

                        <a href="<?php echo $dominio ?>chi-siamo" title="Chi siamo | Sottoradice"
                           class="btn btn-outline-success rounded-lg">Chi siamo</a>
                    </div>
                </div>
                <figure class="col-12 col-md-6">
                    <img src="<?php echo $dominio ?>assets/images/benedetto_radice.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>


    <!-- Il progetto in numeri -->

    <?php include 'partials/home/numeri.php'; ?>

    <!-- Chi siamo -->

    <?php include 'partials/home/chi-siamo.php'; ?>

    <!-- Progetti -->

    <section class="progetti container py-5">

        <?php include 'partials/home/progetti.php'; ?>

    </section>


</main>


<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>