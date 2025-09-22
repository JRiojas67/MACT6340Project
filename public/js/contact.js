import { value } from "p5";

(function() {
"use strict";


document
.querySelector("#contact-form-buttom")
.addEventListener("click", (event)=> {
    event.preventDefault();
    event.stopPropagation();
    console.log("You clicked the submit button.");
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#mail").value;
    let message = document.querySelector("#msg").value;
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);

});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()










}());