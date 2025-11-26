import Database from 'better-sqlite3';
const db = new Database('database.db');

try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Subscribers table initialized.');
} catch (error) {
    console.error('Error initializing subscribers table:', error);
}
