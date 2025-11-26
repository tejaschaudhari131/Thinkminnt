import fetch from 'node-fetch';

const API_URL = 'https://thinkminnt-api.onrender.com';

async function test() {
    console.log('Testing production API:', API_URL);

    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'ThinkMinnt2024!' })
        });

        if (!loginRes.ok) {
            console.error('Login failed:', loginRes.status, loginRes.statusText);
            const text = await loginRes.text();
            console.error('Response:', text);
            return;
        }

        const loginData = await loginRes.json();
        console.log('Login successful. Token:', loginData.accessToken ? 'Received' : 'Missing');
        const token = loginData.accessToken;

        // 2. Fetch Analytics
        console.log('Fetching analytics...');
        const analyticsRes = await fetch(`${API_URL}/api/analytics`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!analyticsRes.ok) {
            console.error('Analytics fetch failed:', analyticsRes.status, analyticsRes.statusText);
            const text = await analyticsRes.text();
            console.error('Response:', text);
            return;
        }

        const analyticsData = await analyticsRes.json();
        console.log('Analytics Data:', JSON.stringify(analyticsData, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

test();
