import db from './db-client.js';

const fixUsersTable = async () => {
    console.log('Fixing users table...');
    try {
        const isPostgres = process.env.NODE_ENV === 'production' || !!process.env.POSTGRES_URL || !!process.env.DATABASE_URL;
        const autoIncrement = isPostgres ? 'SERIAL' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
        const textType = 'TEXT';

        await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id ${autoIncrement},
        name ${textType},
        email ${textType} UNIQUE,
        password ${textType},
        role ${textType} DEFAULT 'donor',
        createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
    )`);
        console.log('Users table created successfully!');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

fixUsersTable();
