<?php

$host = $_SERVER['HTTP_HOST'] ?? '';

$isLocal =
    $host === 'localhost' ||
    $host === '127.0.0.1' ||
    strpos($host, 'localhost:') === 0 ||
    strpos($host, '127.0.0.1:') === 0;

$ambienteLocale = $isLocal;

if ($isLocal) {
    $dominio = 'http://localhost:8888/sottoradice/';
} else {
    $dominio = 'https://www.sottoradice.it/';
}

if ($isLocal) {
    $dominioHome = $dominio . 'index.php';
} else {
    $dominioHome = $dominio;
}

$dominioIcomoon = $dominio . 'assets/';

?>