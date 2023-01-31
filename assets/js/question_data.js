
const DEFAULT_RESPONSES = ['Yes', 'No', "I don't know"];

class Term
{
    constructor(term, definition)
    {
        this.term = term;
        this.definition = definition;
    }
}

const term_definitions = {}

// Set terms and their definitions, where key value is the term itself
term_definitions['aspiration'] = new Term('aspiration', 'Commonly, when food, drink, or any foreign object are accidentally inhaled into the lungs.');
term_definitions['abdomen'] = new Term('abdomen', 'The belly region, including: the stomach, intestines, liver, and pancreas.');
term_definitions['weakness'] = new Term('weakness', 'The sensation of physical weakness, often expressed by a loss of strength; mental and/or physical exhaustion.');
term_definitions['fatigue'] = new Term('fatigue', 'Result of physical or mental exertion, where symptoms do not fully improve with rest.');
term_definitions['unsteady gait'] = new Term('unsteady gait', 'Uncoordinated, unsteady, or abnormal movement while walking.');

class Question 
{
    constructor(prompt, terms = [], responses = DEFAULT_RESPONSES)
    {
        this.prompt = prompt;
        this.responses = responses;
        this.terms = terms;
    }
}

const assessment_questions = 
[
    new Question(`Have you recently suffered from infection requiring antibiotics or resulting in hospitalization?`,
        [],
        [
            'Yes, within the last month',
            'Yes, within the last three months',
            'No',
            `I don't know`
        ]
    ),
    new Question(`Have you suffered unintentional weight loss within the last six months to a year?`),
    new Question(`Do you have trouble swallowing, causing aspiration or decreased food intake?`, [term_definitions['aspiration']]),
    new Question(`Are you experiencing swelling of the abdomen or limbs?`, [term_definitions['abdomen']]),
    new Question(`Do you experience shortness of breath?`),
    new Question(`Have you experienced severe pain requiring strong pain medication?`),
    new Question(`Do you experience weakness or fatigue?`, [term_definitions['weakness'], term_definitions['fatigue']]),
    new Question(`Have you recently experienced falls or have an unsteady gait?`, [term_definitions['unsteady gait']]),
    new Question(`Have you received abnormal labs that suggest serious illness?`),
    new Question(`Do you experience low blood pressure?`),
    new Question(`Are you experiencing other on-going, severe symptoms which do not respond to treatment?`)
];