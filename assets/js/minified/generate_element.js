function generate_element(tagname,attributes)
{if(tagname==='svg'||tagname==='rect')
{const SVG_NAMESPACE='http://www.w3.org/2000/svg';const svgElement=document.createElementNS(SVG_NAMESPACE,tagname);for(const attribute in attributes)
{const attributeValue=attributes[attribute];svgElement.setAttribute(attribute,attributeValue);}
return svgElement;}
else
{const element=document.createElement(tagname);for(const attribute in attributes)
{const attributeValue=attributes[attribute];element[attribute]=attributeValue;}
return element;}}