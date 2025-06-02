<?php // api/tasks.php
header('Content-Type: application/json');
include '../db/connection.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
  $res = $pdo->query("SELECT * FROM task");
  echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $sql = "INSERT INTO task (id, task) VALUES (?,?)";
  $pdo->prepare($sql)->execute([$data['id'], $data['task']]);
  echo json_encode(['status' => 'ok']);
}

if ($method === 'DELETE') {
  $data = json_decode(file_get_contents("php://input"), true);
  $pdo->prepare("DELETE FROM task WHERE id = ?")->execute([$data['id']]);
  echo json_encode(['status' => 'deleted']);
}

if ($method === 'PUT' || $method === 'PATCH') {
  $data = json_decode(file_get_contents("php://input"), true);
  $sql = "UPDATE task SET task = ? WHERE id = ?";
  $pdo->prepare($sql)->execute([$data['task'], $data['id']]);
  echo json_encode(['status' => 'updated']);
}
?>

