
import db from './server/db-client.js';

async function checkData() {
    try {
        console.log('Checking applications table...');
        const stmt = db.prepare('SELECT * FROM applications ORDER BY id DESC LIMIT 2');
        const rows = await stmt.all();
        console.log('Applications found:', rows.length);
        rows.forEach(row => {
            console.log('Row keys:', Object.keys(row));
            console.log('Row data:', {
                id: row.id,
                firstname: row.firstname, // Postgres usually returns lowercase
                firstName: row.firstName,
                resume: row.resume,
                dataSize: row.resumedata ? row.resumedata.length : 'NULL'
            });
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

checkData();
