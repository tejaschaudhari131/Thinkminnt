import fetch from 'node-fetch';

const API_URL = 'https://api.thinkminnt.com';

async function testNewApi() {
    console.log('Testing new production API:', API_URL);

    try {
        const res = await fetch(`${API_URL}/api/careers`);
        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
            return;
        }

        const data = await res.json();
        console.log('Careers Data Count:', data.length);
        console.log('Connection successful!');

    } catch (error) {
        console.error('Error:', error);
    }
}

testNewApi();
