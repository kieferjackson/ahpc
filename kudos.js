
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
    {
        "author": "Annabelle",
        "remark": "This truly is the best hospice ever made. Amazing to work for and their treatment of patients is unparalleled in the valley. I mean, some of them (I won't name any names) literally murder people, so take that with what you will.",
        "source": "Email"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    
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
        const content = `&quot;${msg[i].remark}&quot; - ${msg[i].author} from ${msg[i].source}`;
        
        // add the text node to the newly created div
        newDiv.innerHTML = content;

        if (i % 2 == 0) {
            newDiv.classList.add("kudos_even");
        } else {
            newDiv.classList.add("kudos_odd");
        }

        // add the newly created element and its content into the DOM
        const current_remark = document.querySelector(".remarks");

        current_remark.append(newDiv);
        
    }

})
