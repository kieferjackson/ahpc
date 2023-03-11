
function find_css_rule(stylesheet, selected_css_rule)
{
    // Loop over stylesheet rules to find selected css rule and return its rule object and index
    for (let i = 0 ; i < stylesheet.length ; i++)
    {
        const rule = stylesheet[i];

        if (rule.selectorText === selected_css_rule) return { rule, index: i };
    }
    
    // The selected css rule could not be found, log error message
    console.error(new Error(`The CSS rule ${selected_css_rule} could not be found.`));
}

function determineTopNavbarHeight()
{
    // Get Top Navbar to find its current height
    const [ top_navbar ] = document.getElementsByClassName('top_navbar');
    const top_navbarHeight = top_navbar.offsetHeight;
    
    return top_navbarHeight;
}

const getStylesheet = (stylesheet_filename) => {
    try
    {
        const { styleSheets } = document;

        const [ ahpc_style ] = Array.from(styleSheets).filter(({ href }) => href.includes(stylesheet_filename));
        
        if (!ahpc_style)
        {
            throw new Error(`The stylesheet ${stylesheet_filename} could not be found. 
            \nCheck that the file is available and correctly named.`);
        }

        return ahpc_style;
    }
    catch (error)
    {
        console.error(error);
    }
}

// Select `nav_anchor` css rule
const ahpc_style = getStylesheet('ahpc_style.css');
const ahpc_rules = ahpc_style.cssRules || ahpc_style.rules;
const nav_anchor_rule = find_css_rule(ahpc_rules, '.nav_anchor');

// Set the offset for the element's `top` styling property by the determined navbar height
nav_anchor_rule.rule.style.top = `-${Math.floor(determineTopNavbarHeight() * 1.25)}px`;
// Update the stylesheet with the updated Nav Anchor rule at its associated index
ahpc_style.cssRules[nav_anchor_rule.index] = nav_anchor_rule.rule;
