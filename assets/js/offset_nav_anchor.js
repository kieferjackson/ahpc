
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

function find_media_rule(media_stylesheet, selected_css_rule)
{
    const media_rules = [];

    // Find the Media Rules in the given stylesheet
    for (let i = 0 ; i < media_stylesheet.length ; i++)
    {
        const media_rule = media_stylesheet[i];

        if (media_rule instanceof CSSMediaRule) {
            media_rules.push({ media_rule, media_index: i });
        }
    }
    
    // Find the selected css rules out of the media rule(s)
    const [ css_rule ] = media_rules.map(({ media_rule, media_index }) => {
        const { rule, index } = find_css_rule(media_rule.cssRules, selected_css_rule)

        return { rule, index, media_index };
    });
    
    return css_rule;
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

// Get top navbar height, including height from padding and horizontal scroll bar
const top_navbar_height = determineTopNavbarHeight();

// Set the offset for the element's `top` styling property by the determined navbar height
nav_anchor_rule.rule.style.top = `-${Math.floor(top_navbar_height * 1.25)}px`;
// Update the stylesheet with the updated Nav Anchor rule at its associated index
ahpc_style.cssRules[nav_anchor_rule.index] = nav_anchor_rule.rule;

// Set Form & Assessment Anchor Rules if on /eligibility
const eligibility_style = getStylesheet('eligibility.css');
if (eligibility_style)
{
    // Select `assessment_anchor` and `form_anchor` (nav_anchor override) css rules from Media rules
    const eligibility_rules = eligibility_style.cssRules || eligibility_style.rules;
    const override_rules = find_media_rule(eligibility_rules, '.assessment_anchor, .form_anchor');

    // Set rules for mobile media rules
    override_rules.rule.style.top = `-${Math.floor(top_navbar_height * 2.5)}px`;
    // Update the stylesheet with the updated Form Anchor and Assessment Anchor at their associated index
    eligibility_style.cssRules[override_rules.media_index].cssRules[override_rules.index] = override_rules.rule;
}
