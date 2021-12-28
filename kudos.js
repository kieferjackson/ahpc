document.addEventListener('DOMContentLoaded', () => {
    var remarks = ["Best hospice in the Valley!","Thank you, Advocate!"];

    for (var i = 0 ; i < remarks.length ; i++) {
        document.getElementById("remark").innerHTML = `${remarks[i]}`;
    }

})
