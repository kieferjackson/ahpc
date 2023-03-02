
function generate_element(tagname, attributes)
{
    // For SVG Elements using .createElementNS
    if (tagname === 'svg' || tagname === 'rect')
    {
        const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

        const svgElement = document.createElementNS(SVG_NAMESPACE, tagname);
        // Set SVG attributes
        for (const attribute in attributes)
        {
            const attributeValue = attributes[attribute];
            svgElement.setAttribute(attribute, attributeValue);
        }

        return svgElement;
    }
    // For standard elements using .createElement
    else
    {
        const element = document.createElement(tagname);
        // Set Element Attributes
        for (const attribute in attributes)
        {
            const attributeValue = attributes[attribute];
            element[attribute] = attributeValue;
        }

        return element;
    }
}