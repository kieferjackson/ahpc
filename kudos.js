
let msg = [
    {
        "author": "Gladys",
        "remark": "Best hospice in the Valley!",
        "source": "Facebook"
    },
    {
        "author": "Ned",
        "remark": "Thank you, Advocate!",
        "source": "In-person"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    remarks = ["Best hospice in the Valley!","Thank you, Advocate!", "Test with lots of text in the following remark", "no really", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."];
    
    let element = [
        {
            "id": "kudos",
            "tag": "div"
        },
        {
            "id": "affiliation",
            "tag": "p"
        },
    ];

    const gap = document.createElement("br");

    for (var i = 0 ; i < msg.length ; i++) {
        addElement(i);
    }

    function addElement (i) {
        // create a new div element
        const newDiv = document.createElement("div");

        // Add kudos remark to new remark
        //if (element.id == "kudos") {
        const content = document.createTextNode('"' + `${msg[i].remark}` + '"' + " - " + `${msg[i].author}` + " from " + `${msg[i].source}`);
        
        // add the text node to the newly created div
        newDiv.appendChild(content);

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
        rem.position = "relative";

        rem.padding = "50px";
        if (iteration % 2 == 0) {
            rem.textAlign = "justify";
            rem.textAlignLast = "left";
            rem.background = "#333";
            rem.color = "#fff"; 
        } else {
            rem.textAlign = "justify";
            rem.textAlignLast = "right";
            rem.background = "#fff"; 
            rem.color = "#333";
        }
        
        rem.fontFamily = "Noto Sans";
        rem.fontSize = "16px"; 
        rem.borderRadius = "20px";
        rem.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

        
    }

})

