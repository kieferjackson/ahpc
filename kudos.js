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
        "remark": "",       // This msg should not be displayed.
        "source": "MySpace"
    },
    {
        "author": "Sum Gai",
        "remark": "test",
        "source": "MySpace"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    var isEven = false;
    var div_num = 0;

    for (var i = 0 ; i < msg.length ; i++) {
        let remarkExists = msgChecker(i); // Ensures that if a kudos message has null values or empty strings, that a valid value will replace it (e.g. if there is no author, it will be listed as 'Anonymous'). However, if there is no remark, no kudos element will be generated and isEven will not be updated.

        if (remarkExists === true) {
            addElement(i);
            addAffiliation(i); // CHANGE - This uses code from addElement, should just change addElement() so that it can accommodate both functions.

            isEven = !isEven; // Successful addition of a div element should switch the message from even to odd, odd to even, etc.
            div_num++;
        }
        
    }

    function addElement (i) {
        // create a new div element
        const newDiv = document.createElement("div");

        // Add kudos remark to new remark
        const content = `&quot;${msg[i].remark}&quot;`;
        
        // add the text node to the newly created div
        newDiv.innerHTML = content;

        if (isEven === true) {
            newDiv.classList.add("kudos_even");
        } else {
            newDiv.classList.add("kudos_odd");
        }

        // add the newly created element and its content into the DOM
        const current_remark = document.querySelector(".remarks");

        current_remark.append(newDiv);
        
    }

    function addAffiliation (i) {
        // create a new div element
        const newDiv = document.createElement("div");

        const content = `${msg[i].author} ${msg[i].source}`;

        // add the text node to the newly created div
        newDiv.innerHTML = content;
        newDiv.classList.add("affiliation");

        // add the newly created element and its content into the DOM
        if (isEven === true) {
            var current_remark = document.querySelectorAll(".kudos_even")[Math.floor(div_num/2)];
        } else {
            var current_remark = document.querySelectorAll(".kudos_odd")[Math.floor(div_num/2)];
        }
        
        current_remark.append(newDiv);
    }

    function msgChecker (i) {
        if (!msg[i].remark) {
            return false; // There is no remark, therefore a kudos message should not be generated.
        }

        if (!msg[i].author) {
            msg[i].author = "Anonymous";
        }

        if (!msg[i].source) {
            msg[i].source = " from Unknown";
        } else {
            msg[i].source = " from " + msg[i].source;
        }

        return true; // Remark, author, and source are validated. Kudos should be generated successfully.
    }

})