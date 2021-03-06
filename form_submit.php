
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Form Submission Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="website icon" href="images/icons/favicon.ico">
        <link rel="stylesheet" href="ahpc_style.css">
    </head>
    <body id="form_page">

    <!-- Navigation Bar with Links-->
    <div class="navbar">
        <a href="ahpc.html"><img src="images/ahpc_logo_temp.png" id="logo_icon"></a>
        <a href="#about_us">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact_info">Contact Us</a>
        <a href="recruit.html">Recruitment</a>
        <a href="resources.html">Resources</a>
    </div>

    <div class="main">
    <?php

    if (!empty($_POST['email'])) die();
    if (($_POST['occupation'] != "volunteer") && ($_POST['occupation'] != "employee")) die();

    class Field {
        public function __construct($name, $char_max, $char_min, $required) {
            $this -> name       = (string) $name;
            $this -> char_max   = (int) $char_max;
            $this -> char_min   = (int) $char_min;
            $this -> required   = (bool) $required;
        }
    }

    // HTML Elements
    $footer = 
    "<!-- Footer -->
    <div class='footer'>
        <h2>7600 N 16th St Ste 112, Phoenix, Arizona, 85020</h2>
    </div>";

    $br = "<br>";

    // Initializing user info array
    $user_info = array(
        "first_name" => "",
        "last_name" => "",
        "phone_number" => "",
        "email_address" => "",
        "occupation" => "",
        "comments" => ""
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
        $user_info['comments'] = dataValidator($_POST["comments"]);
        $user_info['occupation'] = dataValidator($_POST["occupation"]);
        
        $posts = [
            new Field('first_name', 128, 1, true),
            new Field('last_name', 128, 1, true),
            new Field('phone_number', 16, 8, true),
            new Field('email_address', 256, 3, true),
            new Field('comments', 480, 0, false)
        ];

        // Check character length and content of form data
        for ($i = 0 ; $i < count($posts) ; $i++) {
            echo("The script is currently testing the " . $posts[$i]->name . " field" . $br);
            checkStringLength($user_info[$posts[$i]->name], $posts[$i]);
            checkData($user_info[$posts[$i]->name], $posts[$i]);
        }

        $def_time_zone = "MST"; // Default Time Zone is MST for Arizona Time
        date_default_timezone_set($def_time_zone);
        $timeStamp = date("m-d-Y @ h:i:sa") . " " . $def_time_zone;
    }

    // File upload handler
    if(!empty($_FILES['resume']['name'])) { // Checks if a resume has been submitted, if there is, then the file will be processed.
        $user_file = basename($_FILES['resume']['name']);

        // Check whether uploaded file is .pdf, .doc, or .docx
        $imageFileType = strtolower(pathinfo($user_file, PATHINFO_EXTENSION));
        echo "File Type: " . $imageFileType;

        $isCorrectFileType = strcmp($imageFileType, "pdf") === 0 || strcmp($imageFileType, "doc") === 0 || strcmp($imageFileType, "docx") === 0;

        if (!$isCorrectFileType) {
            formErrorHandler("INVALID_FILE_TYPE");
        } else {
            $uploadOK = true;
        }

        // Check file size
        define('MB', 1048576);

        if ($_FILES["resume"]["size"] > 5 * MB) { // Reject file upload if it exceeds 5 MB or is empty (0 bytes)
            formErrorHandler("EXCESS_FILE_SIZE");
            $uploadOK = false;
        } elseif ($_FILES["resume"]["size"] == 0) {
            formErrorHandler("INSUFFICIENT_FILE_SIZE");
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
        //$mailto = "";

        $advocate_subject = "New " . ucwords($user_info['occupation']) . " Application from " . $user_info['first_name'] . " " . $user_info['last_name'] . " | " . $timeStamp;
        $applicant_subject = "Confirmation of " . ucwords($user_info['occupation']) . " Application for Advocate Hospice";

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

        $advocate_message = "Applicant Name: " . $user_info['first_name'] . " " . $user_info['last_name'] . "\r\n"
        . "Phone Number: " . $user_info['phone_number'] . "\r\n" . "Email Address: " . $user_info['email_address'] . "\r\n"
        . "Desired Occupation: " . ucwords($user_info['occupation']) . "\r\n\r\nComments: " . htmlspecialchars_decode($user_info['comments']);

        $applicant_message = "Dear " . $user_info['first_name'] . " " . $user_info['last_name'] . ",\r\n\r\n"
        . "Thank you for your interest in joining the Advocate Hospice team!\r\nOne of our company representatives will reach out to you as soon as possible.
        \r\nYour information has been received as:\r\n\r\n" . $advocate_message . 
        "\r\n\r\nIf there are any issues with the information you have provided, please reach out to either our phone number (602-830-0605) or reply to this email with the correct information as soon as possible.\r\n\r\nRegards,\nAdvocate Hospice";

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

            // Attach File to Advocate Application Request
            $advocate_msg_body .= $attachment;
        }
        
        // Mail Confirmation email to user
        $appl_msg = mail($user_info['email_address'], $applicant_subject, $applicant_msg_body, $applicant_header);
        
        // Mail Occupation request out to Advocate Hospice if Confimation Email successfully sent
        if ($appl_msg) {
            $ahpc_msg = mail($mailto, $advocate_subject, $advocate_msg_body, $advocate_header);

            // Verify that both messages sent successfully
            if ($ahpc_msg && $appl_msg) {
                generateElement(
                    "form_result_message_container",
                    "form_result_message",
                    "Your form was successfully sent.\nWe appreciate your interest in working with us! Please wait for a response from us."
                );
            } else {
                generateElement(
                    "form_result_message_container",
                    "form_result_message",
                    "Sorry, but your form was not successfully submitted.\nPlease try again."
                );
            }
        } else {
            generateElement(
                "form_result_message_container",
                "form_result_message",
                "Sorry, a confirmation email was unable to be sent to the email address you provided and your form was not successfully submitted.
                Please try again."
            );
        }

    }
    
    function dataValidator($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }

    function checkData ($data, $input_field) {
        
        switch($input_field->name) {
            case 'first_name':
                // This case also applies to last_name
            case 'last_name':
                // ctype_alpha() checks that the string only contains alphabetical characters, and generates an error if it does not.
                if (!ctype_alpha($data)) {
                    formErrorHandler("INVALID_INPUT");
                }
                break;
            case 'phone_number':
                $onlyNumbers = is_numeric($data);
                if(!$onlyNumbers) {
                    formErrorHandler("INVALID_INPUT");
                }
               break;
            case 'email_address':
                if (!filter_var($data, FILTER_VALIDATE_EMAIL)) {
                    formErrorHandler("INVALID_EMAIL");
                }
            default:
                // Nothing here
                break;
                
        }
    }

    function checkStringLength (string $data, $input_field) {
        $char_count = strlen(htmlspecialchars_decode($data));

        if ($input_field->required) {
            // The number of characters should be less than or equal to the maximum characters, and there should be at least 1 character
            if ($char_count > $input_field->char_max) {
                formErrorHandler("EXCESS_CHAR");
            } elseif ($char_count < $input_field->char_min) {
                formErrorHandler("INSUFFICIENT_CHAR");
            }
        } else {
            // Only checks that inputted characters are less than set maximum. Because response is optional, it does not check if characters are greater than zero.
            if ($char_count > $input_field->char_max) {
                formErrorHandler("EXCESS_CHAR");
            }
        }
    }
    
    function generateElement (string $container_class_name, string $class_name, string $content) {
        $doc = new DOMDocument;

        $container = $doc -> createElement("div");
        $container -> setAttribute('class', $container_class_name);
        $doc -> appendChild($container);

        $result_msg = $doc->createElement("div", $content);
        $result_msg -> setAttribute('class', $class_name);
        $container -> appendChild($result_msg);

        echo $doc -> saveXML();
    }

    function formErrorHandler (string $error_type) {
        global $footer, $br;
        generateElement(
            "form_error_message_container",
            "form_error_message",
            "There was an issue validating your form information",
        );

        switch($error_type) {
            case "INVALID_EMAIL":
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "The email address you have entered is invalid. Please try again.",
                );

                exit();
                break;

            case "INVALID_INPUT":
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "There was an issue with your form input. Please submit a new form and try again.",
                );
                
                exit();
                break;

            case "INVALID_FILE_TYPE":
                $file_type = $_FILES['resume']['type'];
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "The uploaded file type is: " . $br . $file_type . $br . "Only PDF, DOC, and DOCX files are acceptable.",
                );

                exit();
                break;

            case "EXCESS_FILE_SIZE":
                $file_size = $_FILES['resume']['size'];
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "The uploaded file size is: " . $br . (string) ($file_size / MB) . " MB" . $br . "Your file is too large to upload.",
                );

                exit();
                break;

            case "INSUFFICIENT_FILE_SIZE":
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "The file you uploaded contains no data.",
                );

                exit();
                break;

            case "EXCESS_CHAR":
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "Your form input has exceeded the maximum character limit. Please submit a new application or contact us directly with info@advocatehpc.com if you require accommodations.",
                );
                exit();
                break;

            case "INSUFFICIENT_CHAR":
                generateElement(
                    "feedback_message_container",
                    "feedback_message",
                    "Your form input failed to exceed the minimum character limit. Please submit a new application or contact us directly with info@advocatehpc.com if you require accommodations.",
                );
                exit();
                break;
        }
    }
    
    ?>
    </div>

    <!-- Footer -->
    <div class='footer'>
        <h2>7600 N 16th St Ste 112, Phoenix, Arizona, 85020</h2>
    </div>

    </body>
    <!-- This website was created by Kiefer L. Jackson -->
</html>
