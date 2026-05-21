<?php
/*
// DB LOCAL

$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'my_sottoradice';
$db_port = 8889;

$mysqli = new mysqli(
    $db_host,
    $db_user,
    $db_password,
    $db_db
);

$mysqli->close();

$conn = mysqli_connect($db_host, $db_user, $db_password);
$sel = mysqli_select_db($conn, $db_db);
*/?>




<?php

$host = $_SERVER['HTTP_HOST'] ?? '';

$isLocal =
    $host === 'localhost' ||
    $host === '127.0.0.1' ||
    strpos($host, 'localhost:') === 0 ||
    strpos($host, '127.0.0.1:') === 0;

$ambienteLocale = $isLocal;

// dominio base (per TUTTO il sito)
if ($isLocal) {
    $dominio = 'http://localhost:8888/sottoradice/';
} else {
    $dominio = 'https://' . $host . '/';
}

// 👉 dominio specifico per HOME
if ($isLocal) {
    $dominioHome = $dominio . 'index.php';
} else {
    $dominioHome = $dominio;
}

$dominioIcomoon = $dominio . 'assets/';

?>
