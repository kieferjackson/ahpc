
<!DOCTYPE html>
<html>
    <body>
    <?php
    $first_name = $last_name = $phone_number = $email_address = $volunteer = $employee = "";
    timeStamp = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $first_name = dataValidator($_POST["first_name"]);
        $last_name = dataValidator($_POST["last_name"]);
        $phone_number = dataValidator($_POST["phone_number"]);
        $email_address = dataValidator($_POST["email_address"]);
        
        $volunteer = dataValidator($_POST["volunteer"]);
        $employee = dataValidator($_POST["employee"]);

        timeStamp = date("m-d-Y") + date("h:i:sa");

        echo timeStamp;
    }

    // File upload handler
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($FILES["resume"]["name"]);
    $uploadOK = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Check whether uploaded file is .pdf, .doc, or .docx
    if(isset($_POST["submit"])) {
        $isCorrectFileType = $imageFileType == ("pdf" || "doc" || "docx")

        if(isCorrectFileType == false) {
            echo "Only PDF, DOC, and DOCX files are acceptable."
            $uploadOK = 0;
        }
    }
    // Check file size
    if ($_FILES["resume"]["size"] > 1000000) {
        echo "Your file is too large to upload.";
        $uploadOK = 0;
    }

    // Upload checker looking at $uploadOK
    if($uploadOK == 0) {
        echo "Sorry, your file failed to upload. Try again.";
    } else {
        if(move_uploaded_file($_FILES["resume"]["name"], $target_file)) {
            echo "The file " . htmlspecialchars(basename($_FILES["resume"]["name"])) . " has been uploaded.";
        }
    }

    function dataValidator($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }

    ?>
    </body>
</html>
