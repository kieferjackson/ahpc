help = ["ID", "CLASS"];

function getElement (type) {
    switch(type) {
        case ID:
            id_name = prompt("Please enter the desired id:");
            return document.getElementById(id_name);
            break;
        case CLASS:
            class_name = prompt("Please enter the desired class name:");
            return document.getElementsByClassName(class_name);
            break;
    }
}
document.getElement
function simpleMath () {
    four = 2 + 2;
}

class Elements {
    constructor(id_name, class_name, plain_name, tag_name) {
        this.id_name = id_name;
        this.class_name = class_name;
        this.plain_name = plain_name;
        this.tag_name = tag_name;
    }
    getId(name) {
        return document.getElementById(name);    
    }
    getClass(name) {
        return document.getElementsByClassName(name);    
    }
    getName(name) {
        return document.getElementsByName(name);    
    }
    getTag(name) {
        return document.getElementsByTagName(name);    
    }
}