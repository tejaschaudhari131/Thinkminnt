import pg from 'pg';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.POSTGRES_URL || !!process.env.DATABASE_URL;

let db;

if (isProduction) {
    const { Pool } = pg;
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    console.log('Using PostgreSQL database');

    db = {
        prepare: (sql) => {
            // Convert ? to $1, $2, etc.
            let paramIndex = 1;
            let pgSql = sql;

            // Simple regex replace for ? to $n
            // Note: This assumes ? is not inside strings/comments, which is true for our simple app
            while (pgSql.includes('?')) {
                pgSql = pgSql.replace('?', `$${paramIndex++}`);
            }

            return {
                run: async (...args) => {
                    let finalSql = pgSql;

                    // Auto-append RETURNING id for INSERTs if not present to mimic sqlite's lastInsertRowid
                    const upperSql = finalSql.trim().toUpperCase();
                    if (upperSql.startsWith('INSERT') && !upperSql.includes('RETURNING')) {
                        finalSql += ' RETURNING id';
                    }

                    try {
                        const res = await pool.query(finalSql, args);
                        // If INSERT with RETURNING, get id
                        const lastInsertRowid = res.rows.length > 0 && res.rows[0].id ? res.rows[0].id : 0;
                        return {
                            lastInsertRowid,
                            changes: res.rowCount
                        };
                    } catch (err) {
                        console.error('Database Error:', err);
                        throw err;
                    }
                },
                all: async (...args) => {
                    try {
                        const res = await pool.query(pgSql, args);
                        return res.rows;
                    } catch (err) {
                        console.error('Database Error:', err);
                        throw err;
                    }
                },
                get: async (...args) => {
                    try {
                        const res = await pool.query(pgSql, args);
                        return res.rows[0];
                    } catch (err) {
                        console.error('Database Error:', err);
                        throw err;
                    }
                }
            };
        },
        exec: async (sql) => {
            try {
                await pool.query(sql);
            } catch (err) {
                console.error('Database Exec Error:', err);
                throw err;
            }
        }
    };
} else {
    console.log('Using Local SQLite database');
    const sqlite = new Database('database.db');

    db = {
        prepare: (sql) => {
            const stmt = sqlite.prepare(sql);
            return {
                run: async (...args) => {
                    return stmt.run(...args);
                },
                all: async (...args) => {
                    return stmt.all(...args);
                },
                get: async (...args) => {
                    return stmt.get(...args);
                }
            };
        },
        exec: async (sql) => {
            sqlite.exec(sql);
        }
    };
}

export default db;
