
const data = {
    service_id: 'service_mao2bzd',
    template_id: 'template_bcwrx2r',
    user_id: 'Q50KacLeY8z0yfCN4',
    template_params: {
        to_name: 'ThinkMinnt Admin',
        to_email: 'tejaschaudhari131@gmail.com',
        reply_to: 'tejaschaudhari131@gmail.com'
    }
};

console.log('Sending test email via EmailJS API...');

fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://thinkminnt.com' // Mimic the production domain
    },
    body: JSON.stringify(data)
})
    .then(response => {
        if (response.ok) {
            console.log('SUCCESS: Email sent successfully!');
        } else {
            return response.text().then(text => {
                console.log('FAILURE: ' + text);
            });
        }
    })
    .catch(error => {
        console.log('ERROR: ' + error);
    });
