import fetch from 'node-fetch';

async function checkServer() {
    try {
        const res = await fetch('https://thinkminnt-api.onrender.com/api/programs');
        console.log('Status:', res.status);
        console.log('Content-Type:', res.headers.get('content-type'));
        const text = await res.text();
        console.log('Body Preview:', text.substring(0, 100));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkServer();
