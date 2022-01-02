
document.addEventListener('DOMContentLoaded', () => {
    remarks = ["Best hospice in the Valley!","Thank you, Advocate!"];

    for (var i = 0 ; i < remarks.length ; i++) {
        addElement(i);
    }

    function addElement (i) {
        // create a new div element
        const newDiv = document.createElement("div");

        // Add kudos remark to new remark
        const new_remark = document.createTextNode(`${remarks[i]}`);

        // add the text node to the newly created div
        newDiv.appendChild(new_remark);

        // add the newly created element and its content into the DOM
        const current_remark = document.getElementById("kudos");
        document.body.insertBefore(newDiv, current_remark);
    }
})

/*document.addEventListener('DOMContentLoaded', () => {
    var remarks = ["Best hospice in the Valley!","Thank you, Advocate!"];
    
    for (var i = 0 ; i < remarks.length ; i++) {
        document.getElementById("remark").innerHTML = `${remarks[i]}`;
    }
    

    
})
*/