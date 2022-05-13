
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Form Submitted!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="website icon" href="images/icons/favicon.ico">
        <link rel="stylesheet" href="alt_style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald|Noto+Sans">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Spectral|Rubik">
    </head>
    <body>

    <!-- Navigation Bar with Links-->
    <div class="navbar">
        <a href="ahpc.html"><img src="images/ahpc_logo_temp.png" id="logo_icon"></a>
        <a href="#about_us">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact_info">Contact Us</a>
        <a href="#kudos_title">Kudos</a>
        <a href="recruit.html">Recruitment</a>
        <a href="resources.html">Resources</a>
    </div>

    <h1 id="form_success_message">Your form was successfully sent.<br>We appreciate your interest in working with us! Please wait for a response from us.</h1>

    <?php
    $first_name = $last_name = $phone_number = $email_address = $volunteer = $employee = "";
    $timeStamp = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $first_name = dataValidator($_POST["first_name"]);
        $last_name = dataValidator($_POST["last_name"]);
        $phone_number = dataValidator($_POST["phone_number"]);
        $email_address = dataValidator($_POST["email_address"]);
        
        $occupation = dataValidator($_POST["occupation"]);

        date_default_timezone_set('MST'); // Default Time Zone is MST
        $timeStamp = date("m-d-Y @ h:i:sa");

        echo $timeStamp;
        echo "<br>";
        echo $first_name;
        echo "<br>";
        echo $last_name;
        echo "<br>";
        echo $phone_number;
        echo "<br>";
        echo $email_address;
        echo "<br>";
        echo $occupation;
    }

    // File upload handler
    if(!empty($_POST["resume"])) { // Checks if a resume has been submitted, if there is, then the file will be processed.
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($FILES["resume"]["name"]);
        $uploadOK = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check whether uploaded file is .pdf, .doc, or .docx
        if (isset($_POST["submit"])) {
            $isCorrectFileType = $imageFileType == ("pdf" || "doc" || "docx");

            if (!$isCorrectFileType) {
                echo "Only PDF, DOC, and DOCX files are acceptable.";
                $uploadOK = 0;
            }
        }
        // Check file size
        if ($_FILES["resume"]["size"] > 1000000) {
            echo "Your file is too large to upload.";
            $uploadOK = 0;
        }

        // Upload checker looking at $uploadOK
        if ($uploadOK == 0) {
            echo "Sorry, your file failed to upload. Try again.";
        } else {
            if(move_uploaded_file($_FILES["resume"]["name"], $target_file)) {
                echo "The file " . htmlspecialchars(basename($_FILES["resume"]["name"])) . " has been uploaded.";
            }
        }
    }

    function dataValidator($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }

    ?>

    <!-- Footer -->
    <div class="footer">
        <h2>7600 N 16th St Ste 112, Phoenix, Arizona, 85020</h2>
    </div>

    </body>
    <!-- This website was created by Kiefer L. Jackson -->
</html>
