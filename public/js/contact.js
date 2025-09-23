import { value } from "p5";

(function() {
"use strict";

let form = document.querySelector('#contact-form')
document
.querySelector("#contact-form-buttom")
.addEventListener("click", (event)=> {
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
    let firstName = document.querySelector("#first-name").value;
    let lastName = document.querySelector("#last-name").value;
    let email = document.querySelector("#mail").value;
    let message = document.querySelector("#msg").value;
    console.log("First name: " + firstName);
    console.log("Last name: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
}

}());