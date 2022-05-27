
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Form Submitted!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="website icon" href="images/icons/favicon.ico">
        <link rel="stylesheet" href="ahpc_style.css">
    </head>
    <body>

    <!-- Navigation Bar with Links-->
    <div class="navbar">
        <a href="ahpc.html"><img src="images/ahpc_logo_temp.png" id="logo_icon"></a>
        <a href="#about_us">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact_info">Contact Us</a>
        <a href="recruit.html">Recruitment</a>
        <a href="resources.html">Resources</a>
    </div>

    <?php
    $first_name = $last_name = $phone_number = $email_address = $occupation = $comments = "";
    $timeStamp = "";
    $uploadOK = false; // Initializes to false until it has been validated

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $first_name = dataValidator($_POST["first_name"]);
        $last_name = dataValidator($_POST["last_name"]);
        $phone_number = dataValidator($_POST["phone_number"]);
        $email_address = dataValidator($_POST["email_address"]);
        if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
            echo "The email address you have entered is invalid. Please try again.";
        }
        
        $occupation = dataValidator($_POST["occupation"]);
        $comments = dataValidator($_POST["comments"]);

        $def_time_zone = "MST"; // Default Time Zone is MST for Arizona Time
        date_default_timezone_set($def_time_zone);
        $timeStamp = date("m-d-Y @ h:i:sa") . " " . $def_time_zone;
    }

    // File upload handler
    if(!empty($_FILES['resume']['name'])) { // Checks if a resume has been submitted, if there is, then the file will be processed.
        $user_file = basename($_FILES['resume']['name']);

        $imageFileType = strtolower(pathinfo($user_file, PATHINFO_EXTENSION));
        echo "File Type: " . $imageFileType;

        // Check whether uploaded file is .pdf, .doc, or .docx
        if (isset($_POST["submit"])) {
            // Compare file type of submitted file
            $isCorrectFileType = strcmp($imageFileType, "pdf") === 0 || strcmp($imageFileType, "doc") === 0 || strcmp($imageFileType, "docx") === 0;
            var_dump($isCorrectFileType);

            if (!$isCorrectFileType) {
                echo "Only PDF, DOC, and DOCX files are acceptable.";
            } else {
                $uploadOK = true;
            }
        }
        // Check file size
        if ($_FILES["resume"]["size"] > 5000000) { // Reject file upload if it exceeds approximately 5 MB
            echo "Your file is too large to upload.";
            $uploadOK = false;
        }

        // Upload checker looking at $uploadOK
        if ($uploadOK) {
            echo "The file: " . htmlspecialchars(basename($_FILES["resume"]["name"])) . " has been successfully uploaded.";
        } else {
            echo "Sorry, your file failed to upload. Try again.";
        }
    }

    // Mailing form data to defined email
    if (isset($_POST['submit'])) {
        //$mailto = "info@advocatehpc.com"; /* This should be the final email address */
        //$mailto = "kieferleejackson@gmail.com"; /* This email is only for testing purposes */

        $advocate_subject = "New " . $occupation . " application from " . $first_name . " " . $last_name . " | " . $timeStamp;
        $employee_subject = "Confirmation of " . ucwords($occupation) . " application for Advocate Hospice";

        $advocate_message = "Employee Name: " . $first_name . " " . $last_name . "\n"
        . "Phone Number: " . $phone_number . "\n" . "Email Address: " . $email_address . "\n"
        . "Desired Occupation: " . $occupation . "\n\nComments: " . $comments;

        $employee_message = "Dear " . $first_name . " " . $last_name . ",\n\n"
        . "Thank you for your interest in joining the Advocate Hospice team!
        One of our company representatives will reach out to you as soon as possible.
        \nYour information has been received as:\n\n" . $advocate_message . 
        "\n\nIf there are any issues with the information you have provided, please reach out to either our phone or email as soon as possible.\n\nRegards,\nAdvocate Hospice";

        // Attach user submitted file
        if (isset($_FILES['resume']) and $uploadOK) {
            // Define file parameters
            $file_name = $_FILES['resume']['name'];
            $file_tmp_name = $_FILES['resume']['tmp_name'];
            $file_size = $_FILES['resume']['size'];
            
            // Read uploaded file & base64_encode content
            $resume_handle = fopen($file_tmp_name, "r");  // set the file handle only for reading the file
            $resume_content = fread($handle, $file_size); // reading the file
            fclose($resume_handle);

            $encoded_content = chunk_split(base64_encode($resume_content));

            $attachment = "--$boundary\r\n";
            $attachment .="Content-Type: $type; name=".$file_name."\r\n";
            $attachment .="Content-Disposition: attachment; filename=".$file_name."\r\n";
            $attachment .="Content-Transfer-Encoding: base64\r\n";
            $attachment .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
            $attachment .= $encoded_content;

            // Attach Files to Emails
            $advocate_message .= $attachment;
            $employee_message .= $attachment;
        }

        $advocate_header = "From: " . $email_address;
        //$employee_header = "From: " . $mailto;

        // Mail occupation request out to Advocate Hospice, and Confirmation email to user
        /*$ahpc_msg = mail($mailto, $advocate_subject, $advocate_message, $advocate_header);
        $empl_msg = mail($email_address, $employee_subject, $employee_message, $employee_header);
        */
        echo $advocate_message;
        // Verify that both messages sent successfully
        /*
        if ($ahpc_msg && $empl_msg) {
            echo "Your form was successfully sent.\nWe appreciate your interest in working with us! Please wait for a response from us.";
        } else {
            echo "Sorry, but your form was not successfully submitted.\nPlease try again.";
        } */
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
