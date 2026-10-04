<?php
include 'config/database.php';

$stmtProjects = $pdo->prepare("
    SELECT
        p.*,
        c.name AS category_name,
        c.color AS category_color
    FROM projects p
    LEFT JOIN categories c
        ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY COALESCE(p.sort_order, 9999), p.id
");

$stmtProjects->execute();
$projects = $stmtProjects->fetchAll();

/* TAG DEI PROGETTI */

$stmtTags = $pdo->query("
    SELECT project_id, label
    FROM project_tags
    ORDER BY project_id, COALESCE(sort_order, id), id
");

$projectTags = [];

foreach ($stmtTags->fetchAll() as $tag) {
    $projectTags[$tag['project_id']][] = $tag;
}


/* STUDENTI DEI PROGETTI */

$stmtStudents = $pdo->query("
    SELECT
        ps.project_id,
        s.id,
        s.first_name,
        s.last_name,
        s.image,
        s.sort_order
    FROM project_students ps
    INNER JOIN students s
        ON s.id = ps.student_id
    ORDER BY ps.project_id, COALESCE(s.sort_order, s.id), s.id
");

$projectStudents = [];

foreach ($stmtStudents->fetchAll() as $student) {
    $projectStudents[$student['project_id']][] = $student;
}


/* CLASSI DEI PROGETTI */

$stmtClasses = $pdo->query("
    SELECT
        pc.project_id,
        c.*
    FROM project_classes pc
    INNER JOIN classes c
        ON c.id = pc.class_id
    ORDER BY pc.project_id, c.id
");

$projectClasses = [];

foreach ($stmtClasses->fetchAll() as $class) {
    $projectClasses[$class['project_id']][] = $class;
}


/* DOCENTI DEI PROGETTI */

$stmtTeachers = $pdo->query("
    SELECT
        pt.project_id,
        t.*
    FROM project_teachers pt
    INNER JOIN teachers t
        ON t.id = pt.teacher_id
    ORDER BY pt.project_id, t.id
");

$projectTeachers = [];

foreach ($stmtTeachers->fetchAll() as $teacher) {
    $projectTeachers[$teacher['project_id']][] = $teacher;
}


?>


<!DOCTYPE html>
<html lang="it">

<?php

$title = "Progetti | Sottoradice, la matematica fatta da noi.";
$desc = "Matematica da costruire, esplorare e condividere. Dai laboratori ai giochi interattivi, ogni progetto nasce da un'esperienza reale in classe.";
$ogImage = $dominio . "assets/images/og-home.jpg";
$keywords = "Sottoradice, Bronte, matematica, progetti interattivi, wizard, giochi matematici";
include_once 'partials/head.php';

?>

<body>


<?php include 'partials/navbar.php'; ?>

<main class="">
    <header class="bg-waves-purple">
        <div class="container">
            <div class="hero row align-items-center position-relative mb-5" style="margin-top: 80px">
                <div class="col-12 col-md-6">
                    <h6 class="text-uppercase text-left mx-auto">
                        Progetti
                    </h6>
                    <h1 class="serif font-weight-700 text-left px-0">
                        <span class="text-pink">Cosa abbiamo fatto</span><br>
                        <span class="">e cosa stiamo facendo.</span>
                    </h1>
                    <h2 class="serif font-weight-300 text-black-80 text-left pb-4 px-0 mb-0">
                        Matematica da costruire, esplorare e condividere. Dai laboratori ai giochi interattivi, ogni
                        progetto nasce da un'esperienza reale in classe.
                    </h2>
                </div>
                <figure class="col-12 col-md-6">
                    <img src="<?php echo $dominio ?>assets/images/cloud_library.svg"
                         class="h-100 w-100 object-cover"
                         alt="Sottoradice, la matematica fatta da noi.">
                </figure>
            </div>
        </div>
    </header>


    <section class="container progetti my-5">
        <?php include 'partials/progetti/progetti.php'; ?>
    </section>
</main>


<?php include 'partials/footer.php'; ?>

<?php include "partials/scripts.php" ?>


</body>
</html>
