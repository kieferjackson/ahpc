// Make a media query for whether the user prefers reduced motion
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// Set whether animations should be disabled based on media query
const ANIMATION_DISABLED = !mediaQuery || mediaQuery.matches;

// Progress Bar ID Attributes
const PROGRESS_BAR_IDS = 
{ 
    container: 'progress_bar_container',
    svg: 'progress_bar_svg',
    rect: 'progress_bar'
};

// Tracks how many fields have been filled, starting from 0
var fields_filled = 0;

// Tracks and updates Progress Display as needed
const PROGRESS_DISPLAY = {};

function generateEligibilityAssessment() {
    const eligibility_assessment_form = document.querySelector('#eligibility_assessment_form');
    generateProgressDisplay('progress_display_container');

    function generateProgressDisplay(progress_display_container_id)
    {
        const progress_display_container = document.querySelector(`#${progress_display_container_id}`);
        // Change Progress Display from `display: none` to `display: flex`
        progress_display_container.style.display = 'flex';

        // Generate Progress Heading
        const progress_heading = document.createElement('h4');
        progress_heading.setAttribute('id', 'progress_heading');
        progress_heading.innerText = 'Assessment Progress';

        // Generate Progress Bar to visually indicate percentage of responses given
        const { container, svg, rect } = PROGRESS_BAR_IDS;
        PROGRESS_DISPLAY.bar = new ProgressBar(container, svg, rect);

        // Generate Progress Count to show number completed out of total
        const PROGRESS_COUNT = createDivClass('progress_count_container');
        PROGRESS_COUNT.innerText = `0/${assessment_questions.length}`;
        PROGRESS_DISPLAY.count = PROGRESS_COUNT;

        // Generate Progress Indicators Container to hold Progress Bar and Progress Count
        const progress_indicators_container = createDivClass('progress_indicators_container');
        progress_indicators_container.append(PROGRESS_DISPLAY.bar.container, PROGRESS_DISPLAY.count);

        // Generate Tooltip Notice
        const tooltip_notice = document.createElement('small');
        tooltip_notice.setAttribute('class', 'tooltip_notice');
        tooltip_notice.innerHTML = `Hover, tap on, or press <kbd>Tab</kbd> to focus <em class="tooltip_notice highlight">blue text</em> for definitions of the word or phrase highlighted.`;

        progress_display_container.append(
            progress_heading, 
            progress_indicators_container,
            tooltip_notice
        );
    }

    function createDivClass(class_name) 
    {
        const div = document.createElement('div');
        div.className = class_name;

        return div;
    }

    function createParagraphClass(class_name) 
    {
        const paragraph = document.createElement('p');
        paragraph.className = class_name;

        return paragraph;
    }

    function createResponseInput (question_number, response_number, response)
    {
        const input = document.createElement('input');
        input.className = 'form-check-input option_input';
        input.type = 'radio';
        input.name = `question-${question_number}`;
        input.id = `q${question_number}_option${response_number}`;
        input.value = response;
        input.innerText = response;
        input.required = true;

        return input;
    }

    function createResponseLabel (question_number, response_number, response)
    {
        const label = document.createElement('label');
        label.className = 'form-check-label option_label';
        label.htmlFor = `q${question_number}_option${response_number}`;
        label.innerText = response;

        return label;
    }

    function generateQuestionText(question_data)
    {
        const { prompt, terms } = question_data;

        const base_container = createParagraphClass('question_text');
        // Stores the `innerHTML` fragments so that they can later be combined
        let prompt_fragments = [];

        // Check if there are any terms to define, and generate their tooltip if so
        if (terms.length > 0)
        {
            // Tracks where the start of the prompt to overwrite for the term definitions
            let promptStart = 0;

            terms.forEach(({ term, definition }, term_index, term_list) => {
                const term_loc = prompt.search(term);
                const prior_text = prompt.slice(promptStart, term_loc);
                promptStart = term_loc + term.length;
                
                const term_tooltip = 
                `
                    <span aria-describedby="${term}-definition" aria-label="${term}" class="term_tooltip" tabindex="0">
                        ${term}
                        <span role="tooltip" id="${term}-definition" class="tooltip_text">
                            ${definition}
                        </span>
                    </span>
                `;

                // Check if there are no more terms; if there are none left, return the remaining prompt string
                const endString = term_index === term_list.length - 1 
                    ? prompt.slice(promptStart, prompt.length)
                    : '';

                // Add this fragment to the list
                prompt_fragments.push(prior_text + term_tooltip + endString);
            });

            const term_tooltipsInnerHTML = prompt_fragments.reduce((termInnerHTML, prompt_fragment) => {
                return termInnerHTML += prompt_fragment;
            }, '');

            base_container.innerHTML = term_tooltipsInnerHTML;
            return base_container;
        }
        else
        {
            // There are no terms to define, therefore the prompt is sufficient
            base_container.innerText = prompt;
            return base_container;
        }
    }

    assessment_questions.forEach((question, q_index) => {
        const QUESTION_NUMBER = q_index + 1;
        const question_container = createDivClass('question_container');

        // Create question prompt container, containing its number and prompt text
        const question_prompt = createDivClass('question_prompt');
        const question_number = createDivClass('question_number');
        question_number.innerText = `Question ${QUESTION_NUMBER}`;
        
        // Generate question text, including term definitions if applicable
        const question_text = generateQuestionText(question);
        
        // Append question number and text to prompt container
        question_prompt.append(question_number, question_text);

        // Create and append response inputs to responses container depending on number of options
        const question_responses = createDivClass('question_responses');
        question.responses.forEach((response, r_index) => {
            const RESPONSE_NUMBER = r_index + 1;
            const input_block = createDivClass('form-check input_block');
            const response_input = createResponseInput(QUESTION_NUMBER, RESPONSE_NUMBER, response);
            response_input.addEventListener('change', updateProgressBarFromChange);
            const response_label = createResponseLabel(QUESTION_NUMBER, RESPONSE_NUMBER, response);
            
            // Append radio input and its label to the input block container
            input_block.append(response_input, response_label);

            question_responses.appendChild(input_block);
        });
        
        // Append question prompt and responses to container
        question_container.append(question_prompt, question_responses);

        eligibility_assessment_form.appendChild(question_container);
    });
}

// Check for input fields selected, and update Progress Bar if necessary
function updateProgressBarFromChange() 
{
    // Select assessment input fields by class name
    const ASSESSMENT_FIELDS = document.querySelectorAll('.option_input');
    const response_inputs = Array.from(ASSESSMENT_FIELDS);
    
    const CHECKED_RESPONSES = response_inputs.filter(response_input => response_input.checked);
    const num_complete_responses = CHECKED_RESPONSES.length;
    const num_total_responses = assessment_questions.length;

    // Check if a new field has been selected, and update Progress Display if so
    if (fields_filled < num_complete_responses)
    {
        fields_filled = num_complete_responses;

        PROGRESS_DISPLAY.bar.updateProgressBar(num_complete_responses, num_total_responses);
        PROGRESS_DISPLAY.count.innerText = `${num_complete_responses}/${num_total_responses}`;
    }

    // Get Progress Indicators Container
    const progress_indicators_container = PROGRESS_DISPLAY.bar.container.parentElement;
    
    // Check if all fields have been filled and Progress Indicators Container Exists
    if (fields_filled === num_total_responses && progress_indicators_container)
    {
        // Remove Progress Bar and Progress Count
        PROGRESS_DISPLAY.bar.container.remove();
        PROGRESS_DISPLAY.count.remove();

        // Select and update Progress Display Heading to indicate completion
        const progress_heading = document.querySelector('#progress_heading');
        progress_heading.innerText = 'Assessment Complete';

        // Create and append submit button to Progress Display Container
        const submit_button = document.createElement('button')
        submit_button.setAttribute('type', 'button');
        submit_button.setAttribute('class', 'submit_button')
        submit_button.innerText = 'Submit';
        submit_button.addEventListener('click', generateAssessmentResults);
        
        progress_indicators_container.appendChild(submit_button);
        // Center the submit button within the Progress Indicators Container
        progress_indicators_container.style.justifyContent = 'center';

        // Play animations for Progress Heading and Submit button if animations are enabled
        if(!ANIMATION_DISABLED)
        {
            popInText(progress_heading, progress_heading.innerText.length);
            fadeInPulse(submit_button);
        }
    }
}

function generateAssessmentResults()
{
    // Reset `fields_filled` count to 0
    fields_filled = 0;

    // Select all option inputs, and filter to get only the checked responses
    const option_inputs = document.querySelectorAll('.option_input');
    const checked_responses = Array.from(option_inputs).filter(response_input => response_input.checked);
    
    // Select question containers and remove each one
    const question_containers = document.querySelectorAll('.question_container');
    Array.from(question_containers).forEach(question_container => question_container.remove());
    
    // Clear Progress Display of all contained elements
    const progress_display_container = document.querySelector('#progress_display_container');
    Array.from(progress_display_container.children).forEach(progress_display_el => progress_display_el.remove());
    
    const num_yes_responses = checked_responses.reduce((num_yes, response) => {
        if (response.value === 'Yes')
            num_yes++;
        
        return num_yes;
    }, 0);

    const generateResultMsg = (heading, msg) => {
        // Create Results Container to hold result message and button to start a new assessment
        const results_container = document.createElement('section');
        results_container.setAttribute('id', 'eligibility_results_container');
        results_container.setAttribute('class', 'results_container');

        const result_msg_heading = document.createElement('strong');
        result_msg_heading.setAttribute('class', 'result_msg_heading');
        result_msg_heading.innerText = heading;

        const result_msg = document.createElement('p');
        result_msg.setAttribute('class', 'result_msg');
        result_msg.innerText = msg;

        // Generate Contact Info List
        const contact_list = document.createElement('ul');
        const email_contact = document.createElement('li');
        email_contact.innerText = `By email: ${EMAIL_ADDRESS}`;
        const phone_contact = document.createElement('li');
        phone_contact.innerText = `By phone: ${PHONE_NUMBER}`;
        contact_list.append(email_contact, phone_contact);
        // Append to Result Message
        result_msg.appendChild(contact_list);

        const start_new_assessment = document.createElement('button');
        start_new_assessment.setAttribute('type', 'button');
        start_new_assessment.setAttribute('class', 'start_new_assessment')
        start_new_assessment.innerText = 'Start New Assessment';
        start_new_assessment.addEventListener('click', () => {
            // Remove the results container, then generate a new form start and append to Eligibility Form
            results_container.remove();
            const eligibility_assessment_form = document.querySelector('#eligibility_assessment_form');
            // Generate the Form Start and append to form
            eligibility_assessment_form.appendChild(generateFormStart());
        });

        results_container.append(
            result_msg_heading, 
            result_msg, 
            start_new_assessment
        );

        return results_container;
    }

    let results;

    if (num_yes_responses <= 1) results = generateResultMsg(
        `You appear to be ineligible for hospice`, 
        `Based on your responses, you appear to fulfill ${num_yes_responses === 0 ? 'none' : 'only one'} of the criteria required to be eligible for hospice care. \nHowever, that does not mean that you are ineligible for hospice, and if you still have concerns or questions about hospice care and/or hospice eligibility, you can contact our office for more information. \n\nOur office can be reached with the following contact information:`
    );
    else if (num_yes_responses > 1) results = generateResultMsg(
        `You may qualify for hospice`, 
        `Based on your responses, you may fulfill up to ${numberToEnglish(num_yes_responses)} (${num_yes_responses}) of the conditions required to be eligible for hospice care. \nYou can contact our office and request a hospice evaluation, and we can send a physician to assess you to determine if you meet the necessary requirements for hospice. \n\nOur office can be reached with the following contact information:`
    );

    // Select Eligibility Assessment Container and make Progress Display disappear
    const eligibility_assessment_container = document.querySelector('#eligibility_assessment_container');
    progress_display_container.style.display = 'none';

    // Append Result Message to Eligibility Assessment Container
    eligibility_assessment_container.appendChild(results);
}

function numberToEnglish(number)
{
    switch(number) 
    {
        case 1:     return 'one';
        case 2:     return 'two';
        case 3:     return 'three';
        case 4:     return 'four';
        case 5:     return 'five';
        case 6:     return 'six';
        case 7:     return 'seven';
        case 8:     return 'eight';
        case 9:     return 'nine';
        case 10:    return 'ten';
        case 11:    return 'eleven';
        default:    return number.toString();
    }
}

function popInText(element, textOffset)
{
    const popIn =
    [
        { 
            opacity: 0,
            filter: `blur(0.25ch)`,
            transform: `translateX(-${textOffset}ch)` 
        },
        { 
            opacity: 1,
            filter: `blur(0)`,
            transform: `translateX(2.5ch)` 
        },
        { 
            opacity: 1,
            filter: `blur(0.1ch)`,
            transform: `translateX(0.1ch)` 
        },
        { 
            opacity: 1,
            filter: `blur(0)`,
            transform: `translateX(0.5ch)` 
        },
        { 
            opacity: 1,
            transform: `translateX(0)` 
        }
    ];

    const popInTiming = 
    {
        duration: 800,
        iterations: 1
    }

    element.animate(popIn, popInTiming);
}

function fadeInPulse(element)
{
    const fadeIn =
    [
        { 
            opacity: 0,
            filter: `blur(0.1ch)`,
            transform: `scale(0)` 
        },
        { 
            filter: `blur(0)`,
            transform: `scale(0.7)` 
        },
        { 
            opacity: 1,
            filter: `blur(0)`,
            transform: `scale(1)` 
        }
    ];

    const pulseEffect =
    { 
        boxShadow: 
        [
            `0 0 2px 3px rgba(25, 203, 248, 0.11), 0 0 6px 12px rgba(25, 203, 248, 0.1)`,
            `0 0 3px 6px rgba(25, 203, 248, 0.13), 0 0 8px 15px rgba(25, 203, 248, 0.12)`,
            `0 0 2px 3px rgba(25, 203, 248, 0.11), 0 0 6px 12px rgba(25, 203, 248, 0.1)`
        ]
    }

    const fadeInTiming =
    {
        duration: 500,
        iterations: 1
    }

    const pulseEffectTiming =
    {
        duration: 2000,
        iterations: Infinity
    }

    element.animate(fadeIn, fadeInTiming);
    element.animate(pulseEffect, pulseEffectTiming);
}
