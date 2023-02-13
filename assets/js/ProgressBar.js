
// Generate Progress Bar Element
class ProgressBar
{
    constructor(container_id, svg_id, rect_id)
    {
        // Check that all ids have been given and that all ids are of type `String`
        const IDs = { container_id, svg_id, rect_id };
        checkIDsExist(IDs);
        checkIDsType(IDs);
        
        // Generate container, SVG, and rect elements
        this.container = generate_element('div', { id: container_id });
        this.svg = generate_element('svg', { id: svg_id, width: '100%', height: '100%' });
        this.progress_bar = generate_element('rect', { id: rect_id, width: '0%', height: '100%', rx: '1' });
        
        // Append progress_bar to svg, then append svg to container
        this.svg.appendChild(this.progress_bar);
        this.container.appendChild(this.svg);
    }

    updateProgressBar(num_complete_responses, num_total_responses)
    {
        const PERCENTAGE_COMPLETE = (num_complete_responses / num_total_responses) * 100;
        const starting_scale = (num_complete_responses - 1) / num_complete_responses

        const progressBarExpanding =
        [
            { transform: `scaleX(${starting_scale})` },
            { transform: `scaleX(1)` }
        ];

        const progressBarTiming =
        {
            duration: 128,
            iterations: 1
        };
        
        this.progress_bar.setAttribute('width', `${PERCENTAGE_COMPLETE}%`);
        this.progress_bar.animate(progressBarExpanding, progressBarTiming);
    }
}

function checkIDsExist (ids)
{
    const { container_id, svg_id, rect_id } = ids;

    try {
        let fields_missing = [];

        if (!container_id)
            fields_missing.push('Container ID');

        if (!svg_id)
            fields_missing.push('SVG ID');

        if (!rect_id)
            fields_missing.push('Rectangle ID');

        if (fields_missing.length > 0)
            throw new Error(`Missing: ${fields_missing.reduce((missing_fields, field, i, list) => {
                missing_fields += `${field}${i < list.length - 1 ? ', ' : ''}`;
                return missing_fields;
            }, '')}`);
    }
    catch (error) {
        console.error(error);
    }
}

function checkIDsType (ids)
{
    const { container_id, svg_id, rect_id } = ids;

    try {
        let invalid_types = [];
        const STRING = 'string';

        if (typeof container_id !== STRING)
            invalid_types.push('Container ID');

        if (typeof svg_id !== STRING)
            invalid_types.push('SVG ID');

        if (typeof rect_id !== STRING)
            invalid_types.push('Rectangle ID');

        if (invalid_types.length > 0)
            throw new TypeError(`Invalid Types for: ${invalid_types.reduce((invalid_fields, field, i, list) => {
                invalid_fields += `${field}${i < list.length - 1 ? ', ' : ''}`;
                return invalid_fields;
            }, '')}`);
    }
    catch (error) {
        console.error(error);
    }
}