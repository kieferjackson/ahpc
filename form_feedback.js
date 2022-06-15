
function checkFormSubmission() {
    // Record how many error messages are currently displayed on the webpage
    let error_msg_count = document.getElementsByClassName("input_feedback_box").length;
    
    // Check if there are existing error messages generated, and remove them if so
    if (error_msg_count > 0) {
        let msgs_to_remove = document.querySelectorAll(".input_feedback_box");
        // Remove every error message previously displayed
        msgs_to_remove.forEach(input_feedback_box => {
            input_feedback_box.remove();
        })
    }

    class Field {
        constructor(name, element, max_char) {
            this.name = name;
            this.element = element;
            this.max_char = max_char;
            }

        get is_empty() {
            return this.checkContents();
        }

        checkContents() {
            return this.element.value == "";
        }
    }
    
    field_names = [
        "first_name",
        "last_name",
        "phone_number",
        "email_address",
        "comments"
    ];

    let input_fields = document.getElementsByClassName("input_field");
    
    const field_elements = {
        "first_name"    : new Field("first_name", input_fields[0], parseInt(input_fields[0].getAttribute("maxlength"))),
        "last_name"     : new Field("last_name", input_fields[1], parseInt(input_fields[1].getAttribute("maxlength"))),
        "phone_number"  : new Field("phone_number", input_fields[2], parseInt(input_fields[2].getAttribute("maxlength"))),
        "email_address" : new Field("email_address", input_fields[4], parseInt(input_fields[4].getAttribute("maxlength"))),
        "comments"      : new Field("comments", input_fields[5], parseInt(input_fields[5].getAttribute("maxlength")))
    }

    // submitOK initializes to true and only changes to false if a submitted value is determined to be invalid.
    var submitOK = true;

    for (var i = 0 ; i < Object.keys(field_elements).length ; i++) {
        /* 
        Check that a form field is empty or not, if it is and it is not the comment section (which is optional)
        then an error message should be displayed 
        */
        field_type = field_names[i];
        
        if (field_type != "comments") {
            if (field_elements[field_type].is_empty) {
                generateFeedback (
                    "Nothing here!", 
                    "Please enter a value into this field", 
                    field_type
                );

                submitOK = false;
            }
        }
        
        // If a field has been entered, then the value should be validated
        if (!field_elements[field_type].is_empty) {
            
            let form_field = field_elements[field_type];
            
            // Validate form field and set submitOK to false if the input is invalid
            if (!checkFormValue(form_field)) {
                submitOK = false;
            }
        }

    }

    // Validating uploaded file type
    var file_path = document.getElementById("resume").value;

    if (file_path != "") {
        // Obtain the file name and file extension
        file_name       = file_path.split("\\").pop();
        file_extension  = file_name.split(".").pop();
        
        if (file_extension != ('pdf' || 'docx' || 'doc')) {
            generateFeedback (
                "Invalid file type", 
                "Only .pdf, .doc, and .docx file types are allowed to be uploaded.", 
                "file_upload"
            );
            submitOK = false;
        }
    }

    if (submitOK) {
        console.log("Input looks good. Form should be ready to be submitted");
    } else {
        console.log("Something is wrong with the form's input");
    }
    return false;
    //return submitOK;
}

function checkFormValue (form_field) {
    let form_value = form_field.element.value;

    // Check character count of input
    if (form_value.length > form_field.max_char) {
        
        generateFeedback (
            "Too many characters", 
            `You entered too many characters (${form_field.element.value.length}).\nThe maximum characters allowed is ${form_field.max_char}.`, 
            form_field.name
        );

        return false;
    }
    
    switch (form_field.name) {
        case 'first_name':
            // This case also applies to last_name
            
        case 'last_name':
            onlyAlphaChars = /^[a-zA-Z]+$/.test(form_value);
            if (!onlyAlphaChars) {
                generateFeedback (
                    "Invalid input", 
                    "Only upper-case and lower-case characters are allowed.\nPlease enter a valid input and try again.", 
                    form_field.name
                );

                return false; 
            } else {
                return true;
            }
        
        case 'phone_number':
            // Check that the string only contains numbers
            contains_only_num = form_value.match(/\d+/) != null;
            console.log(contains_only_num);

            if (contains_only_num) {
                // Verify that there are at least eight digits in the phone number
                num_digits = form_field.element.value.length;

                if (num_digits >= 8) {
                    // Phone number is valid if it only contains integers and is at least 8 digits.
                    return true;

                } else {
                    generateFeedback (
                        "Invalid phone number", 
                        "Your phone number must be at least 8 digits long.\nPlease enter a valid input and try again.", 
                        form_field.name
                    );

                    return false
                }
            } else {
                generateFeedback (
                    "Invalid input", 
                    "Only integers and simple digits are allowed.\nPlease enter a valid input and try again.", 
                    form_field.name
                );

                return false;
            }

        case 'email_address':
            // This should check that the string would be a valid email address
            email_address = form_field.element.value;

            email_username = email_address.slice(0, email_address.indexOf('@'));
            email_domain = email_address.split("@").pop();
            console.log(email_address);
            console.log(email_username);
            console.log(email_domain);
            return true;

        case 'comments':
            return true;

    }
}

function generateFeedback (heading_title, feedback, input_field_name) {
    // Set anchor point for appending div elements
    const anchor = document.querySelector(`#${input_field_name}_anchor`);
    var br = document.createElement("br");

    // Declare element for feedback container
    const feedback_element = document.createElement("div");
    feedback_element.setAttribute("class", "input_feedback_box"); 

    // Declare heading and append to container element
    let h2 = document.createElement("h2");
    let heading_content = `${heading_title}`;
    h2.innerHTML = heading_content;
    feedback_element.append(h2);
    
    // Declare element for feedback message
    feedback_message = document.createElement("div");
    feedback_message.setAttribute("class", "input_feedback_msg");
    let content = `${feedback}`;
    feedback_message.innerHTML = content;
    
    // Append feedback message to its container
    feedback_element.append(feedback_message);
    feedback_element.appendChild(br.cloneNode());

    anchor.append(feedback_element);
}