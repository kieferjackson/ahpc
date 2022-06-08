
function checkFormSubmission() {
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

    const user_info = [
        "first_name",
        "last_name",
        "phone_number",
        "email_address",
        "comments"
    ];

    let input_fields = document.getElementsByClassName("input_field");
    
    const field_elements = {
        "first_name"    : new Field("first_name", input_fields[0], input_fields[0].getAttribute("maxlength")),
        "last_name"     : new Field("last_name", input_fields[1], input_fields[1].getAttribute("maxlength")),
        "phone_number"  : new Field("phone_number", input_fields[2], input_fields[2].getAttribute("maxlength")),
        "email_address" : new Field("email_address", input_fields[4], input_fields[4].getAttribute("maxlength")),
        "comments"      : new Field("comments", input_fields[5], input_fields[5].getAttribute("maxlength"))
    }

    var submitOK = false;

    for (var i = 0 ; i < Object.keys(field_elements).length ; i++) {
        field_elements[user_info[i]];

        if (field_elements[user_info[i]].is_empty) {
            generateFeedback("Nothing here!", 
            "Please enter a value into this field", 
            user_info[i]);
        } else {
            let form_field = field_elements[user_info[i]];
            checkFormValue(form_field)
        }

    }

    console.log("testing form submission button");
    return false;
}

function checkFormValue (form_field) {
    let form_value = form_field.element.value;

    if (form_value.length > form_field.max_char) {
        
        generateFeedback(
            "Too many characters", 
            `You entered too many characters (${form_field.element.value.length}).\nThe maximum characters allowed is ${form_field.max_char}`, 
            user_info[i]);
    }
    
    switch (form_field.name) {
        case 'first_name':
            onlyAlphaChars = /^[a-zA-Z]+$/.test(form_value);
            break;
        case 'last_name':
            onlyAlphaChars = /^[a-zA-Z]+$/.test(form_value);
            break;
        case 'phone_number':
            // This should check that the string only contains numbers or standard notation (e.g. (505)-456-7890)
            break;
        case 'email_address':
            // This should check that the string would be a valid email address
            break;
        case 'comments':
            break;
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