import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001/api';

async function testEndpoint(name, url, method = 'GET', body = null) {
    console.log(`\nTesting ${name}...`);
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) options.body = JSON.stringify(body);

        const res = await fetch(url, options);
        const data = await res.json();

        if (res.ok) {
            console.log(`✅ ${name} passed`);
            if (Array.isArray(data)) {
                console.log(`   Got ${data.length} items`);
            } else {
                console.log('   Response:', data);
            }
        } else {
            console.error(`❌ ${name} failed with status ${res.status}`);
            console.error('   Error:', data);
        }
    } catch (error) {
        console.error(`❌ ${name} failed with error:`, error.message);
    }
}

async function testEndpoints() {
    console.log('Starting API tests...');

    // 1. Test GET /api/programs
    await testEndpoint('GET /api/programs', `${BASE_URL}/programs`);

    // 2. Test POST /api/contact
    await testEndpoint('POST /api/contact', `${BASE_URL}/contact`, 'POST', {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from the test script.'
    });

    // 3. Test POST /api/donate
    await testEndpoint('POST /api/donate', `${BASE_URL}/donate`, 'POST', {
        amount: 50,
        frequency: 'monthly',
        paymentMethod: 'credit_card'
    });

    // 4. Test Auth & Protected Routes
    console.log('\nTesting Authentication...');

    // 4a. Try accessing protected route without token (Should fail)
    try {
        const res = await fetch(`${BASE_URL}/contacts`);
        if (res.status === 401 || res.status === 403) {
            console.log('✅ Protected route blocked unauthorized access (Expected 401/403)');
        } else {
            console.error(`❌ Protected route failed to block access. Status: ${res.status}`);
        }
    } catch (err) {
        console.error('❌ Error testing protected route:', err);
    }

    // 4b. Login to get token
    let token = '';
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'ThinkMinnt2024!' })
        });
        const data = await res.json();
        if (data.success && data.accessToken) {
            token = data.accessToken;
            console.log('✅ Login successful, token received');
        } else {
            console.error('❌ Login failed:', data);
        }
    } catch (err) {
        console.error('❌ Error testing login:', err);
    }

    // 4c. Access protected route with token
    if (token) {
        try {
            const res = await fetch(`${BASE_URL}/contacts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                console.log('✅ Accessed protected route with token');
                const data = await res.json();
                console.log(`   Retrieved ${data.length} contacts`);
            } else {
                console.error(`❌ Failed to access protected route with token. Status: ${res.status}`);
            }
        } catch (err) {
            console.error('❌ Error accessing protected route with token:', err);
        }
    }
}

testEndpoints();
