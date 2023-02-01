
// Progress Bar ID Attributes
const PROGRESS_BAR_IDS = 
{ 
    container: 'progress_bar_container',
    svg: 'progress_bar_svg',
    rect: 'progress_bar'
};

// Holds the Progress Bar Element generated with the ProgressBar class
let PROGRESS_BAR;

document.addEventListener('DOMContentLoaded', () => {
    const eligibility_assessment_form = document.querySelector('#eligibility_assessment_form');

    // Generate Progress Bar to indicate responses given
    const { container, svg, rect } = PROGRESS_BAR_IDS;
    PROGRESS_BAR = new ProgressBar(container, svg, rect);

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
                    <span aria-describedby="${term}-definition" aria-label="${term}" class="term_tooltip">
                        ${term}
                        <span id="${term}-definition" class="tooltip_text">
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
            const response_label = createResponseLabel(QUESTION_NUMBER, RESPONSE_NUMBER, response);
            
            // Append radio input and its label to the input block container
            input_block.append(response_input, response_label);

            question_responses.appendChild(input_block);
        });
        
        // Append question prompt and responses to container
        question_container.append(question_prompt, question_responses);

        eligibility_assessment_form.appendChild(question_container);
    });

    // Create and append submit button to form
    const submit_button = document.createElement('button');
    submit_button.className = 'submit_button';
    submit_button.innerText = 'Submit';
    submit_button.disabled = true;

    eligibility_assessment_form.appendChild(submit_button);
});

// Check for input fields selected, and update Progress Bar if necessary
document.addEventListener('change', () => {
    // Select assessment input fields by class name
    const ASSESSMENT_FIELDS = document.querySelectorAll('.option_input');
    const response_inputs = Array.from(ASSESSMENT_FIELDS);
    
    const CHECKED_RESPONSES = response_inputs.filter(response_input => response_input.checked);
    const num_complete_responses = CHECKED_RESPONSES.length;
    const num_total_responses = assessment_questions.length;
    
    PROGRESS_BAR.updateProgressBar(num_complete_responses, num_total_responses);
});
