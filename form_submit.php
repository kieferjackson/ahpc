
<?php
$first_name = $last_name = $phone_number = $email_address = $volunteer = $employee = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = dataValidator($_POST["first_name"]);
    $last_name = dataValidator($_POST["last_name"]);
    $phone_number = dataValidator($_POST["phone_number"]);
    $email_address = dataValidator($_POST["email_address"]);
    
    $volunteer = dataValidator($_POST["volunteer"]);
    $employee = dataValidator($_POST["employee"]);
}

function dataValidator($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

?>
