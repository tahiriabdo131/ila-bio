document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('infos-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;

        // Prepare data to send via email (you can modify this part based on how you send emails via JavaScript)
        const recipientEmail = 'tahiriabdo131@gmail.com'; // Replace with your recipient's email address
        const subject = 'New Form Submission';
        const message = `
            Full Name: ${fullname}
            Phone Number: ${phone}
            City: ${city}
            Address: ${address}
        `;

        // Construct the mailto link
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        // Open the mail client with the pre-filled email
        window.location.href = mailtoLink;

        // Optionally, you can redirect or show a success message here
        console.log('Email sent');
    });
});
