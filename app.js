// app.js

document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const form = document.getElementById('rentalForm');
    
    if (form.checkValidity()) {
        // Serialize the form data
        const formData = new FormData(form);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Send form data to Formspree
        fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject)
        }).then(response => {
            if (response.ok) {
                showFeedback('Your application has been submitted successfully!', 'success');
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.hasOwnProperty('errors')) {
                        showFeedback('There was a problem submitting your form. Please try again.', 'error');
                    }
                });
            }
        }).catch(error => {
            showFeedback('There was a problem submitting your form. Please try again.', 'error');
        });
    } else {
        showFeedback('Please fill out all required fields correctly before submitting.', 'error');
    }
});

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    feedback.innerHTML = message;

    if (type === 'success') {
        feedback.style.backgroundColor = '#d4edda'; // Success message background
        feedback.style.color = '#155724'; // Success message text
    } else {
        feedback.style.backgroundColor = '#f8d7da'; // Error message background
        feedback.style.color = '#721c24'; // Error message text
    }
}

// Payment method toggle
const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
paymentOptions.forEach(option => {
    option.addEventListener('change', function() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        console.log(`Selected Payment Method: ${selectedMethod}`);
        // You can add additional logic here if needed
    });
});