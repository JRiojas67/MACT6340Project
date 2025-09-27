import { value } from "p5";

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
    console.log("You clicked the submit button.");
    let obj = {
        subject:"Someone submitted the contact form!",
        text:`${document.querySelector("#contact-first").value}
         ${document.querySelector("#contact-last").value} 
         sent you a message that reads ${document.querySelector("#contact-question").value}. 
         They're email address is ${document.querySelector("#contact-email-addr").value}`,
    };
  
}

})();