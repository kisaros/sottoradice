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


/* ==========================================
   CONNESSIONE AL DATABASE
   ========================================== */

if ($isLocal) {
    $dbHost = 'localhost';
    $dbPort = '8889';
    $dbName = 'sottoradice';
    $dbUser = 'root';
    $dbPass = 'root';

    $dsn = "mysql:host=$dbHost;port=$dbPort;dbname=$dbName;charset=utf8mb4";

} else {
    $dbHost = 'localhost';
    $dbName = 'my_avid4086655';
    $dbUser = '';
    $dbPass = '';

    $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
}

try {
    $pdo = new PDO(
        $dsn,
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ]
    );
} catch (PDOException $e) {
    die('Errore di connessione al database: ' . $e->getMessage());
}

?>