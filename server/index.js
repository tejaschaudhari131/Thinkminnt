import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
export const SECRET_KEY = 'ThinkMinntSecretKey2024'; // In production, use env var

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// CORS Configuration - Allow both local and production domains
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://thinkminnt.com',
    'https://www.thinkminnt.com',
    'https://thinkminnt.vercel.app',
    'https://thinkminnt-*.vercel.app', // Allow all Vercel preview deployments
    'https://tejaschaudhari131.github.io', // Allow GitHub Pages
    process.env.FRONTEND_URL // Allow custom frontend URL from environment variable
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list or matches Vercel pattern
        if (allowedOrigins.some(allowed => {
            if (allowed.includes('*')) {
                const pattern = allowed.replace('*', '.*');
                return new RegExp(pattern).test(origin);
            }
            return allowed === origin;
        })) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static(uploadDir));
app.use('/api', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

import { initDatabase } from './db.js';

app.listen(PORT, async () => {
    try {
        await initDatabase();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
});
