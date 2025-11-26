import Database from 'better-sqlite3';
const db = new Database('database.db');

try {
    db.exec('ALTER TABLE applications ADD COLUMN status TEXT DEFAULT "Pending"');
    console.log('Successfully added status column to applications table.');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('Status column already exists.');
    } else {
        console.error('Error adding status column:', error);
    }
}
