
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

const get_ahpc_stylesheet = () => {
    const AHPC_STYLE = 'ahpc_style.css';

    try
    {
        const { styleSheets } = document;

        const [ ahpc_style ] = Array.from(styleSheets).filter(styleSheet => styleSheet.href.includes(AHPC_STYLE));
        
        if (!ahpc_style)
        {
            console.error(
                new Error(`The stylesheet ${AHPC_STYLE} could not be found. 
                \nCheck that the file is available and correctly named.`)
            );

            return;
        }

        return ahpc_style;
    }
    catch (error)
    {
        console.error(error);
    }
}

// Select `nav_anchor` css rule
const ahpc_style = get_ahpc_stylesheet();
const nav_anchor_rule = find_css_rule(ahpc_style.cssRules, '.nav_anchor');
const { rule, index } = nav_anchor_rule;

// Set the offset for the element's `top` styling property by the determined navbar height
rule.style.top = `-${Math.floor(determineTopNavbarHeight() * 1.25)}px`;
// Update the stylesheet with the updated Nav Anchor rule at its associated index
ahpc_style.cssRules[index] = rule;