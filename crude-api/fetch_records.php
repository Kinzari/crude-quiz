<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
include 'connection.php';


$sql = "SELECT tblcontacts.contact_id, tblcontacts.contact_name AS name, tblcontacts.contact_phone AS phone, 
        tblcontacts.contact_email AS email, tblcontacts.contact_address AS address, tblgroups.grp_name AS `group`, 
        tblusers.usr_fullname AS owner
        FROM tblcontacts
        JOIN tblusers ON tblcontacts.contact_userId = tblusers.usr_id
        JOIN tblgroups ON tblcontacts.contact_group = tblgroups.grp_id";
        
$result = mysqli_query($conn, $sql);

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
