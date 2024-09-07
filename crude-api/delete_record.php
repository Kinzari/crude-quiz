<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'connection.php'; 


$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];


$sql = "DELETE FROM tblcontacts WHERE contact_id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['message' => 'Record deleted successfully']);
} else {
    echo json_encode(['message' => 'Error deleting record']);
}
?>
