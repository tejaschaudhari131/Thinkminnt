import fetch from 'node-fetch';

const API_URL = 'https://api.thinkminnt.com';

async function checkCustomDomain() {
    console.log('Checking custom domain:', API_URL);
    try {
        const res = await fetch(`${API_URL}/api/careers`);
        const data = await res.json();
        console.log('Count:', data.length);
        if (data.length > 3) {
            console.log('SUCCESS: Custom domain returns full data.');
        } else {
            console.log('FAILURE: Custom domain still returns partial data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

checkCustomDomain();
