import fetch from 'node-fetch';

const API_URL = 'https://thinkminnt-api.onrender.com';

async function testCareers() {
    console.log('Testing production careers API:', API_URL);

    try {
        const res = await fetch(`${API_URL}/api/careers`);
        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
            return;
        }

        const data = await res.json();
        console.log('Count:', data.length);
        console.log('Titles:', data.map(c => c.title));

    } catch (error) {
        console.error('Error:', error);
    }
}

testCareers();
