
document.addEventListener('DOMContentLoaded', () => {
    const eligibility_assessment_form = document.querySelector('#eligibility_assessment_form');
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

    assessment_questions.forEach((question, q_index) => {
        const QUESTION_NUMBER = q_index + 1;
        const question_container = createDivClass('question_container');

        // Create question prompt container, containing its number and prompt text
        const question_prompt = createDivClass('question_prompt');
        const question_number = createDivClass('question_prompt');
        question_number.innerText = `Question ${QUESTION_NUMBER}`;
        const question_text = createParagraphClass('question_text');
        question_text.innerText = `${question.prompt}`;
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
})
