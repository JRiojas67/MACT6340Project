(function() {
"use strict";

let form = document.querySelector('#contact-form')
document.querySelector("#send-contact").addEventListener("click", (event)=> {
    event.preventDefault();
    event.stopPropagation();
    let formValid = true;
    if (!form.checkValidity()) {
        formValid = false;
    }
    form.classList.add('was-validated');
    if (!formValid) {
        senTheEmail();
    }
});

function senTheEmail() {
    
    let obj = {
        subject:"Someone submitted the contact form!",
        text:`${document.querySelector("#contact-first").value} ${
            document.querySelector("#contact-last").value} 
         sent you a message that reads ${
            document.querySelector("#contact-question").value}. 
         They're email address is ${
            document.querySelector("#contact-email-addr").value
        }`,
    };
  
}
    fetch("/mail", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
    })
    .then((response) => response.json())
    .then((response) => {
        document.querySelector("#contact-button-response").innerHTML =
        response.result;
    })
    .then(() => {
        setTimeout(() => {
            document.querySelector("#contact-button-response").innerHTML = "";
        }, 5000);
    })
    .catch((error) => {
        console.log(
            "We were unable to send your message", 
            error);
    });

})(); 