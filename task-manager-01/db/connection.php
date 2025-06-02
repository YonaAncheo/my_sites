<?php // db/connection.php
$pdo = new PDO("mysql:host=localhost;dbname=tasks_db;charset=utf8", "Yona", "ipchile");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
