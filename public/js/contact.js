(function() {
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact-form');
    const submitButton = document.querySelector("#send-contact");
    const responseDiv = document.querySelector("#contact-button-response");

    if (!form || !submitButton) {
        console.error('Contact form elements not found');
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // Check form validity
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        hideResponse();

        try {
            await sendTheEmail();
        } catch (error) {
            console.error('Error sending email:', error);
            showResponse('Failed to send message. Please try again.', 'danger');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Request';
        }
    });

    async function sendTheEmail() {
        const formData = {
            firstName: document.querySelector("#contact-first").value.trim(),
            lastName: document.querySelector("#contact-last").value.trim(),
            email: document.querySelector("#contact-email-addr").value.trim(),
            message: document.querySelector("#contact-question").value.trim()
        };

        const emailData = {
            subject: "New Contact Form Submission",
            text: `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
            from: formData.email,
            to: "your-email@example.com" // Replace with your actual email
        };

        const response = await fetch("/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
            showResponse('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            showResponse(result.message || 'Failed to send message. Please try again.', 'danger');
        }
    }

    function showResponse(message, type) {
        responseDiv.className = `alert alert-${type}`;
        responseDiv.innerHTML = message;
        responseDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideResponse();
        }, 5000);
    }

    function hideResponse() {
        responseDiv.style.display = 'none';
    }
});

})(); 