import fetch from 'node-fetch';

const API_URL = 'https://thinkminnt-api.onrender.com';
const SECRET_KEY = 'ThinkMinntSecretKey2024';

async function forceSeed() {
    console.log('Attempting to force-seed production database...');

    try {
        const response = await fetch(`${API_URL}/api/seed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secret: SECRET_KEY })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('SUCCESS:', data.message);
        } else {
            console.error('FAILED:', data.message || response.statusText);
        }

    } catch (error) {
        console.error('ERROR:', error.message);
    }
}

forceSeed();
