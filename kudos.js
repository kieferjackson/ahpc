
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
    {
        "author": "",
        "remark": "Missing Info Test. Only the kudos remark has been defined in this example, whereas author and source are unknown.",
        "source": ""
    },
    {
        "author": "Sum Gai",
        "remark": "",
        "source": "MySpace"
    },
];

let even_or_odd = [".kudos_even", ".kudos_odd"]

document.addEventListener('DOMContentLoaded', () => {

    for (var i = 0 ; i < msg.length ; i++) {
        msgChecker(i); // Ensures that if a kudos message has null values or empty strings, that a valid value will replace it (e.g. if there is no author, it will be listed as 'Anonymous')
        addElement(i);
        addAffiliation(i, even_or_odd[i%2]); // CHANGE - This uses code from addElement, should just change addElement() so that it can accommodate both functions.
    }

    function addElement (i) {
        // create a new div element
        const newDiv = document.createElement("div");

        // Add kudos remark to new remark
        const content = `&quot;${msg[i].remark}&quot;`;
        
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

    function addAffiliation (i, class_name) {
        // create a new div element
        const newDiv = document.createElement("div");

        const content = `${msg[i].author} ${msg[i].source}`;

        // add the text node to the newly created div
        newDiv.innerHTML = content;
        newDiv.classList.add("affiliation");

        // add the newly created element and its content into the DOM
        const current_remark = document.querySelectorAll(class_name)[Math.floor(i/2)];

        current_remark.append(newDiv);
    }

    function msgChecker (i) {
        if (!msg[i].author) {
            msg[i].author = "Anonymous";
        }

        if (!msg[i].remark) {
            msg[i].remark = "[No message]";
        }

        if (!msg[i].source) {
            msg[i].source = " from Unknown";
        } else {
            msg[i].source = " from " + msg[i].source;
        }
    }

})
