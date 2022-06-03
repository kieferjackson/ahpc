
document.addEventListener('DOMContentLoaded',  () => {
    class Form {
        constructor(user_info, content) {
            this.user_info = user_info;
            this.content = content;
            this.max_char = max_char;
            }

        get is_empty() {
            return this.checkContents();
        }

        checkContents(content) {
            is_empty[i] = content == "";
        }
    }

    var user_info = [
        "first_name",
        "last_name",
        "phone_number",
        "email_address",
        "comments"
    ];
    
    var field_content = {
        "first_name": "",
        "last_name": "",
        "phone_number": "",
        "email_address": "",
        "comments": ""
    }

    var input_fields = document.getElementsByClassName("input_field");
    var is_empty = [];
    var submitOK = false;

    for (var i = 0 ; i < input_fields.length ; i++) {
        is_empty[i] = input_fields[i].value == "";
        
        if (is_empty[i]) {
            generateFeedback("Nothing here!", "Please enter a value into this field", user_info[i]);
        } else {
            field_content[user_info[i]] = input_fields[i].value;
            checkFormValue(field_content[user_info[i]], user_info[i])
        }
    }

    function checkFormValue (form_value, user_info_type) {
        form_value.length <= 480;

        switch (user_info_type) {
            case 'first_name':
                onlyAlphaChars = /^[a-zA-Z]+$/.test(form_value);
                break;
            case 'last_name':
                onlyAlphaChars = /^[a-zA-Z]+$/.test(form_value);
                break;
            case 'phone_number':
                break;
            case 'email_address':
                break;
            case 'comments':
                break;
        }
    }

    function generateFeedback (heading_title, feedback, input_field_name) {
        // Set anchor point for appending div elements
        const anchor = document.querySelector(`#${input_field_name}_anchor`);
        console.log(`#${input_field_name}_anchor`);
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
})