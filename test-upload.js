
import fs from 'fs';
import { Blob } from 'buffer';

async function testUpload() {
    try {
        // Create a dummy PDF file
        fs.writeFileSync('test.pdf', 'Dummy PDF Content');
        const fileBuffer = fs.readFileSync('test.pdf');
        const blob = new Blob([fileBuffer], { type: 'application/pdf' });

        const form = new FormData();
        form.append('jobId', '1');
        form.append('firstName', 'Test');
        form.append('lastName', 'User');
        form.append('email', 'test@example.com');
        form.append('phone', '1234567890');
        form.append('resume', blob, 'test.pdf');

        console.log('Uploading test file...');
        const response = await fetch('http://localhost:3001/api/apply', {
            method: 'POST',
            body: form
        });

        const result = await response.json();
        console.log('Upload result:', result);

        if (result.success) {
            console.log('Upload successful. ID:', result.id);
        } else {
            console.error('Upload failed:', result);
        }

        // Clean up
        fs.unlinkSync('test.pdf');

    } catch (err) {
        console.error('Error:', err);
    }
}

testUpload();
