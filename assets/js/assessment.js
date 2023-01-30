
document.addEventListener('DOMContentLoaded', () => {
    const eligibility_assessment_form = document.querySelector('#eligibility_assessment_form');

    for (const question of assessment_questions)
    {
        debugger;
        const question_container = document.createElement('div');
        question_container.innerText = `${question.prompt}`;

        eligibility_assessment_form.appendChild(question_container);
    }
})
