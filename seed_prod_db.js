import fetch from 'node-fetch';

const API_URL = 'https://thinkminnt-api.onrender.com';

async function seed() {
    console.log('Seeding production database at:', API_URL);

    try {
        // 1. Create Contacts
        console.log('Creating contacts...');
        const contacts = [
            { firstName: 'John', lastName: 'Doe', email: 'john@example.com', subject: 'Volunteer Opportunities', message: 'I would like to volunteer.' },
            { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', subject: 'Donation Question', message: 'How can I donate via check?' },
            { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', subject: 'Partnership Proposal', message: 'We want to partner with you.' }
        ];

        for (const contact of contacts) {
            await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
        }

        // 2. Create Donations
        console.log('Creating donations...');
        const donations = [
            { amount: 500, frequency: 'one-time', paymentMethod: 'Card' },
            { amount: 1000, frequency: 'monthly', paymentMethod: 'UPI' },
            { amount: 2500, frequency: 'one-time', paymentMethod: 'Card' }
        ];

        for (const donation of donations) {
            await fetch(`${API_URL}/api/donate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donation)
            });
        }

        // 3. Create Applications (Need valid job IDs, assuming 1, 2, 3 exist from initial seed)
        // Since we can't easily get job IDs without login, we'll try 1, 2, 3.
        console.log('Creating applications...');
        const applications = [
            { jobId: 1, firstName: 'Bob', lastName: 'Builder', email: 'bob@example.com', phone: '1234567890', coverLetter: 'I can build things.' },
            { jobId: 2, firstName: 'Sara', lastName: 'Connor', email: 'sara@example.com', phone: '0987654321', coverLetter: 'I am a survivor.' }
        ];

        for (const app of applications) {
            // We need to use FormData for file upload if we were doing it properly, 
            // but the endpoint expects multipart/form-data. 
            // For simplicity, we might skip applications or try to send JSON if the endpoint supports it (it doesn't, it uses multer).
            // Actually, let's skip applications for now as it requires file upload handling which is complex in a simple script without form-data lib.
            // Or we can just use the contacts and donations to verify analytics.
        }

        console.log('Seeding complete (Contacts and Donations).');

    } catch (error) {
        console.error('Error seeding:', error);
    }
}

seed();
