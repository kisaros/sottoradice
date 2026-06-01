<?php include 'config/database.php'; ?>

<!DOCTYPE html>
<html lang="it">


<?php

$title = "404 | Sottoradice";
$desc = "Pagina non trovata.";
$keywords = "";
include_once 'partials/head.php';


?>


<body>

<div class="min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">
    <div class="" style="width: 250px">
        <img class="mb-3" src="<?php echo $dominio; ?>assets/images/favicon-white.svg" alt="Sottoradice">
        <h4 class="h3---real-estate left">La pagina che cercavi non esiste o è stata rimossa</h4>
        <small class="paragraph-realestate">Digita nuovamente l'indirizzo oppure <a class="link-underline word-break-normal" href="/home.php">torna alla home</a>.</small>
    </div>
</div>


<?php include "partials/scripts.php" ?>

</body>
</html>





