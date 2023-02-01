
// Generate Progress Bar Element
class ProgressBar
{
    constructor(container_id, svg_id, rect_id)
    {
        // Check that all ids have been given and that all ids are of type `String`
        const IDs = { container_id, svg_id, rect_id };
        checkIDsExist(IDs);
        checkIDsType(IDs);
        
        // Check if container with given container id exists
        try {
            this.container = document.querySelector(`#${container_id}`);
            if (!this.container)
                throw new Error(`No container with id (${container_id}) exists.`);
        }
        catch (error) {
            console.error(error);
        }
        
        const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(SVG_NAMESPACE, 'svg');
        
        // Set SVG Attributes
        this.svg.setAttribute('id', svg_id);
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        
        this.progress_bar = document.createElementNS(SVG_NAMESPACE, 'rect');
        
        // Set Progress Bar Attributes
        this.progress_bar.setAttribute('id', rect_id);
        this.progress_bar.setAttribute('width', '0%');
        this.progress_bar.setAttribute('height', '100%');
        this.progress_bar.setAttribute('rx', '1');
        
        // Append progress_bar to svg, then append svg to container
        this.svg.appendChild(this.progress_bar);
        this.container.appendChild(this.svg);
    }

    updateProgressBar(num_complete_responses, num_total_responses)
    {
        const PERCENTAGE_COMPLETE = (num_complete_responses / num_total_responses) * 100;
        this.progress_bar.setAttribute('width', `${PERCENTAGE_COMPLETE}%`)
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