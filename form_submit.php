
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
    // Initializing user info array
    $user_info = array(
        "first_name" => "",
        "last_name" => "",
        "phone_number" => "",
        "email_address" => "",
        "occupation" => "",
        "comments" => "",
    );
    $timeStamp = "";
    $uploadOK = false;  // Initializes to false until it has been validated
    $dataOK = false;    // Initializes to false until it has been validated

    // Form data handler
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user_info['first_name'] = dataValidator($_POST["first_name"]);
        $user_info['last_name'] = dataValidator($_POST["last_name"]);
        $user_info['phone_number'] = dataValidator($_POST["phone_number"]);
        $user_info['email_address'] = dataValidator($_POST["email_address"]);
        if (!filter_var($user_info['email_address'], FILTER_VALIDATE_EMAIL)) {
            formErrorHandler("INVALID_EMAIL");
        }
        $user_info['comments'] = dataValidator($_POST["comments"]);

        $post_names = ["first_name", "last_name", "phone_number", "email_address", "comments"];
        $post_char_max = [128, 128, 16, 256, 480];
        $post_response_required = [true, true, true, true, false];

        for ($i = 0 ; $i < count($post_names) ; $i++) {
            $dataOK = checkStringLength($user_info[$post_names[$i]], $post_char_max[$i], $post_response_required[$i]);
            echo $post_names[$i] . ": ";
            var_dump($dataOK);
            echo "<br>";
            if ($dataOK === false) {
                formErrorHandler("EXCESS_CHAR");
            }
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
                formErrorHandler("INVALID_FILE_TYPE");
            } else {
                $uploadOK = true;
            }
        }
        // Check file size
        if ($_FILES["resume"]["size"] > 5000000) { // Reject file upload if it exceeds approximately 5 MB
            formErrorHandler("EXCESS_FILE_SIZE");
            $uploadOK = false;
        }

        // Upload checker looking at $uploadOK
        if ($uploadOK) {
            echo "The file: " . htmlspecialchars(basename($_FILES["resume"]["name"])) . " has been successfully uploaded.";
        } else {
            exit("Sorry, your file failed to upload. Try again.");
        }
    }

    // Mailing form data to defined email
    if (isset($_POST['submit'])) {
        //$mailto = "info@advocatehpc.com"; /* This should be the final email address */
        $mailto = "kieferleejackson@gmail.com"; /* This email is only for testing purposes */

        $advocate_subject = "New " . ucwords($occupation) . " application from " . $user_info['first_name'] . " " . $user_info['last_name'] . " | " . $timeStamp;
        $applicant_subject = "Confirmation of " . ucwords($occupation) . " application for Advocate Hospice";

        $boundary = md5("random"); // Defining email boundary

        // Email Header
        $advocate_header = $applicant_header = "MIME-Version: 1.0\r\n";

        // Advocate Hospice Email Header
        $advocate_header .= "From: " . $user_info['email_address'] . "\r\n";
        $advocate_header .= "Content-Type: multipart/form-data; boundary = $boundary\r\n";

        // Applicant Email Header
        $applicant_header .= "From: " . $mailto . "\r\n";
        $applicant_header .= "Content-Type: multipart/form-data; boundary = $boundary\r\n";

        // Email body
        $advocate_msg_body = "--$boundary\r\n";
        $advocate_msg_body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
        $advocate_msg_body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $applicant_msg_body = $advocate_msg_body;

        $advocate_message = "Applicant Name: " . $user_info['first_name'] . " " . $user_info['last_name'] . "\n"
        . "Phone Number: " . $user_info['phone_number'] . "\n" . "Email Address: " . $user_info['email_address'] . "\n"
        . "Desired Occupation: " . ucwords($occupation) . "\n\nComments: " . $user_info['comments'];

        $applicant_message = "Dear " . $user_info['first_name'] . " " . $user_info['last_name'] . ",\n\n"
        . "Thank you for your interest in joining the Advocate Hospice team!
        One of our company representatives will reach out to you as soon as possible.
        \nYour information has been received as:\n\n" . $advocate_message . 
        "\n\nIf there are any issues with the information you have provided, please reach out to either our phone or email as soon as possible.\n\nRegards,\nAdvocate Hospice";

        $advocate_msg_body .= chunk_split(base64_encode($advocate_message));
        $applicant_msg_body .= chunk_split(base64_encode($applicant_message));

        // Attach user submitted file
        if (isset($_FILES['resume']) and $uploadOK) {
            // Define file parameters
            $file_name = $_FILES['resume']['name'];
            $file_tmp_name = $_FILES['resume']['tmp_name'];
            $file_size = $_FILES['resume']['size'];
            $file_type = $_FILES['resume']['type'];
            
            // Read uploaded file & base64_encode content
            $resume_handle = fopen($file_tmp_name, "r");  // set the file handle only for reading the file
            $resume_content = fread($resume_handle, $file_size); // reading the file
            fclose($resume_handle);

            $encoded_content = chunk_split(base64_encode($resume_content));

            $attachment = "--$boundary\r\n";
            $attachment .="Content-Type: $file_type; name=" . $file_name . "\r\n";
            $attachment .="Content-Disposition: attachment; filename=" . $file_name . "\r\n";
            $attachment .="Content-Transfer-Encoding: base64\r\n";
            $attachment .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
            $attachment .= $encoded_content;

            // Attach Files to Advocate Application Request
            $advocate_message .= $attachment;
        }

        // Mail occupation request out to Advocate Hospice, and Confirmation email to user
        //$ahpc_msg = mail($mailto, $advocate_subject, $advocate_message, $advocate_header);
        //$appl_msg = mail($user_info['email_address'], $applicant_subject, $applicant_message, $applicant_header);
        
        echo $advocate_message;
        echo "<br>";
        echo $applicant_message;
        // Verify that both messages sent successfully
        /*
        if ($ahpc_msg && $appl_msg) {
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

    function checkStringLength (string $data, int $char_max, bool $response_required) {
        $char_count = strlen($data);
        if ($response_required) {
            // The number of characters should be less than or equal to the maximum characters, and there should be at least 1 character
            return $char_count <= $char_max && $char_count > 0;
        } else {
            // Only checks that inputted characters are less than set maximum. Because response is optional, it does not check if characters are greater than zero.
            return $char_count <= $char_max;
        }
    }

    function formErrorHandler (string $error_type) {
        /*
            Insert code here to change HTML content of webpage.
        */
        switch($error_type) {
            case "INVALID_EMAIL":
                exit("The email address you have entered is invalid. Please try again.");
                break;

            case "INVALID_FILE_TYPE":
                exit("Only PDF, DOC, and DOCX files are acceptable.");
                break;

            case "EXCESS_FILE_SIZE":
                exit("Your file is too large to upload.");
                break;

            case "EXCESS_CHAR":
                exit("Your form input has exceeded the maximum character limit. Please submit a new application or contact us directly with info@advocatehpc.com if you require accomodations.");
                break;
        }
    }
    
    ?>

    <!-- Footer -->
    <div class="footer">
        <h2>7600 N 16th St Ste 112, Phoenix, Arizona, 85020</h2>
    </div>

    </body>
    <!-- This website was created by Kiefer L. Jackson -->
</html>
