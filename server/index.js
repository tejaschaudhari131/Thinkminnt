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
    'https://thinkminnt-api.onrender.com', // Render Default URL
    'https://api.thinkminnt.com', // Custom Domain for API
    'https://test.payu.in', // PayU Test Environment
    'https://secure.payu.in', // PayU Production Environment
    'https://payu.in',
    process.env.FRONTEND_URL // Allow custom frontend URL from environment variable
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        console.log('Incoming Request Origin:', origin); // Debug log

        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin || origin === 'null') return callback(null, true);

        // Check if origin is in allowed list or matches Vercel pattern
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed.includes('*')) {
                const pattern = allowed.replace('*', '.*');
                return new RegExp(pattern).test(origin);
            }
            return allowed === origin;
        });

        if (isAllowed) {
            return callback(null, true);
        }

        // Allow any PayU domain (broad check)
        if (origin.includes('payu.in') || origin.includes('payu')) {
            console.log('Allowed PayU Origin:', origin);
            return callback(null, true);
        }

        console.log('BLOCKED ORIGIN:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

import paymentRoutes from './routes/payment.js';
app.use('/api', routes);
app.use('/api/payment', paymentRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/^(.*)$/, (req, res) => {
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
