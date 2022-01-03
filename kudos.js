
document.addEventListener('DOMContentLoaded', () => {
    remarks = ["Best hospice in the Valley!","Thank you, Advocate!", "Test with lots of text in the following remark", "here it goes!", "no really", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."];

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
        addStyle(newDiv, i);

        // add the newly created element and its content into the DOM
        const current_remark = document.getElementById("kudos");
        

        document.body.insertBefore(newDiv, current_remark);
        
    }

    function addStyle (element, iteration) {
        rem = element.style;

        rem.display = "block";
        rem.marginLeft = "auto";
        rem.marginRight = "auto";
        rem.width = "50%";

        rem.padding = "50px";
        if (iteration % 2 == 0) {
            rem.textAlign = "left";
            rem.background = "#333";
            rem.color = "#fff"; 
        } else {
            rem.textAlign = "right";
            rem.background = "#fff"; 
            rem.color = "#333";
        }
        
        rem.fontFamily = "Noto Sans";
        rem.fontSize = "16px"; 
        rem.borderRadius = "20px";
        rem.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

        /*
        for (var i =  0 ; i < document.styleSheets.length ; i++) {
            if (document.styleSheets[i].title == 'KUDOS PAGE') {
                let page_view = document.styleSheets[i].cssRules;
                //current_rem = page_view;
                remark.setAttribute("style", page_view);
                i = document.styleSheets.length;
            }
                
        }
        */
    }

})

/*document.addEventListener('DOMContentLoaded', () => {
    var remarks = ["Best hospice in the Valley!","Thank you, Advocate!"];
    
    for (var i = 0 ; i < remarks.length ; i++) {
        document.getElementById("remark").innerHTML = `${remarks[i]}`;
    }
    

    
})
*/