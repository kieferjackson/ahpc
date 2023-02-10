
const PRIVACY_PAGE_LINK = `<a href="privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>`;

// Company Contact Info
const EMAIL_ADDRESS = 'info@advocatehpc.com';
const PHONE_NUMBER = '602-830-0605';

const PRIVACY_DISCLOSURE_TEXT = `<strong>Privacy Disclosure:</strong>
    No personal, identifying information is required for this assessment. However, if you have questions or concerns about your 
    privacy or how we collect data, you can read our ${PRIVACY_PAGE_LINK}, or alternatively contact us:`;

const CHECKBOX_LABEL_TEXT = `I understand that the results of this assessment <strong>do not override or substitute for the assessment 
    of a medical doctor</strong>. As such, the results of this assessment are <strong>not medical advice nor a guarantee 
    of hospice eligibility</strong>. Rather, the assessment is used to indicate general indicators for hospice 
    eligibility and provide resources for learning more about hospice.`;

// Generate and append the form to the eligibility form
document.querySelector('#eligibility_assessment_form').appendChild(generateFormStart());

// Generate Form Start Element
function generateFormStart ()
{
    const generateElement = (tagname, attribute, attribute_value) => {
        const element = document.createElement(tagname);
        element.setAttribute(attribute, attribute_value);
        
        return element;
    }

    // Generate Form Start Container
    const form_start_container = generateElement('div', 'id', 'form_start_container');

    // Generate Privacy Disclosure
    const privacy_disclosure = generateElement('div', 'class', 'privacy_disclosure');
    const privacy_disclosure_text = generateElement('p', 'class', 'privacy_disclosure_text');
    privacy_disclosure_text.innerHTML = PRIVACY_DISCLOSURE_TEXT;
    const privacy_disclosure_contacts = generateElement('ul', 'class', 'privacy_disclosure_contacts');
        const email_contact = document.createElement('li');
        email_contact.innerText = `By email: ${EMAIL_ADDRESS}`;
        const phone_contact = document.createElement('li');
        phone_contact.innerText = `By phone number: ${PHONE_NUMBER}`;
        privacy_disclosure_contacts.append(email_contact, phone_contact);
    
    privacy_disclosure.append(
        privacy_disclosure_text, 
        privacy_disclosure_contacts
    );

    //  Terms & Conditions Check (Generate Form Start Block)
    const form_start_block = generateElement('div', 'class', 'form_start_block');
    const terms_heading = generateElement('strong', 'class', 'terms_heading');
    terms_heading.innerText = 'Terms & Conditions';
    // Generate container for checkbox and its label
    const checkbox_container = generateElement('div', 'class', 'form-check');

    const CHECKBOX_ID = 'terms_checkbox';
    const checkbox_input = generateElement('input', 'class', 'form-check-input');
    checkbox_input.setAttribute('type', 'checkbox');
    checkbox_input.setAttribute('id', CHECKBOX_ID);
    const checkbox_label = generateElement('label', 'class', 'form-check-label');
    checkbox_label.setAttribute('for', CHECKBOX_ID);
    checkbox_label.innerHTML = CHECKBOX_LABEL_TEXT;
    
    checkbox_container.append(checkbox_input, checkbox_label);

    form_start_block.append(
        terms_heading, 
        checkbox_container
    );

    // Generate Start Button
    const start_button = generateElement('button', 'class', 'start_button');
    start_button.setAttribute('type', 'button');
    start_button.setAttribute('id', 'eligibility_start_button');
    start_button.setAttribute('title', 'You must agree to the terms and conditions to begin the assessment');
    start_button.innerText = 'Begin Assessment';
    start_button.disabled = true;

    // Listen for Agreement Checkbox to be clicked and determine if start button should be enabled
    checkbox_input.addEventListener('click', (event) => {
        const agreementChecked = event.target.checked;
        
        if (agreementChecked) {
            start_button.disabled = false;
            start_button.setAttribute('title', '');
        }
        else {
            start_button.disabled = true;
            start_button.setAttribute('title', 'You must agree to the terms and conditions to begin the assessment');
        }
    });

    start_button.addEventListener('click', () => {
        // Select and remove Form Start Container: Privacy disclosure, start button, and Terms and Conditions Checkbox
        const form_start_container = document.querySelector('#form_start_container');
        form_start_container.remove();
        
        // Generate Eligibility Assessment
        generateEligibilityAssessment();
        
        // TESTING: (debugger) Checks all fields
        // Array.from(document.getElementsByClassName('option_input')).forEach((option) => option.checked = true);
    });
    
    // Append Privacy Disclosure, Terms & Conditions Check, and Generate Start Button
    form_start_container.append(
        privacy_disclosure,
        form_start_block,
        start_button
    );

    return form_start_container;
}   
