import { Blob } from 'buffer';

const API_URL = 'https://thinkminnt.com';

async function testApply() {
    console.log('Testing /api/apply on live server...');

    const form = new FormData();
    form.append('jobId', '1');
    form.append('firstName', 'Test');
    form.append('lastName', 'Bot');
    form.append('email', 'test@example.com');
    form.append('phone', '1234567890');
    form.append('coverLetter', 'This is a test application from the verification script.');

    // Create a dummy resume file
    const fileContent = 'This is a dummy resume.';
    const blob = new Blob([fileContent], { type: 'text/plain' });
    form.append('resume', blob, 'dummy_resume.txt');

    try {
        const response = await fetch(`${API_URL}/api/apply`, {
            method: 'POST',
            body: form
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (data.success) {
            console.log('SUCCESS: Application submitted successfully!');
        } else {
            console.error('FAILURE: Application submission failed.');
        }
    } catch (error) {
        console.error('ERROR:', error);
    }
}

testApply();
