import express from 'express';
import db from './db.js';

const router = express.Router();

router.post('/contact', (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO contacts (firstName, lastName, email, subject, message) VALUES (?, ?, ?, ?, ?)');
        const info = stmt.run(firstName, lastName, email, subject, message);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/donate', (req, res) => {
    const { amount, frequency, paymentMethod } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO donations (amount, frequency, paymentMethod) VALUES (?, ?, ?)');
        const info = stmt.run(amount, frequency, paymentMethod || 'Card');
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/careers', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM careers');
        const careers = stmt.all();
        res.json(careers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/programs', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM programs');
        const programs = stmt.all();
        res.json(programs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './index.js';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials for simplicity as per plan
    if (username === 'admin' && password === 'ThinkMinnt2024!') {
        const user = { name: username };
        const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, accessToken });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

router.get('/contacts', authenticateToken, (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC');
        const contacts = stmt.all();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/donations', authenticateToken, (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM donations ORDER BY createdAt DESC');
        const donations = stmt.all();
        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/apply', upload.single('resume'), (req, res) => {
    const { jobId, firstName, lastName, email, phone, coverLetter } = req.body;
    const resume = req.file ? req.file.filename : null;

    console.log('Received application:', { jobId, firstName, lastName });

    try {
        const stmt = db.prepare('INSERT INTO applications (jobId, firstName, lastName, email, phone, resume, coverLetter) VALUES (?, ?, ?, ?, ?, ?, ?)');
        const info = stmt.run(parseInt(jobId), firstName, lastName, email, phone, resume, coverLetter);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/applications', authenticateToken, (req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT applications.*, careers.title as jobTitle 
            FROM applications 
            LEFT JOIN careers ON applications.jobId = careers.id 
            ORDER BY applications.createdAt DESC
        `);
        const applications = stmt.all();
        console.log('Fetched applications:', applications);
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/analytics', authenticateToken, (req, res) => {
    try {
        // 1. Applications by Role
        const appsByRoleStmt = db.prepare(`
            SELECT c.title, COUNT(a.id) as count
            FROM careers c
            LEFT JOIN applications a ON c.id = a.jobId
            GROUP BY c.title
        `);
        const appsByRole = appsByRoleStmt.all();

        // 2. Contact Subjects
        const contactsBySubjectStmt = db.prepare(`
            SELECT subject, COUNT(*) as count
            FROM contacts
            GROUP BY subject
        `);
        const contactsBySubject = contactsBySubjectStmt.all();

        // 3. Donations Over Time (Daily)
        const donationsOverTimeStmt = db.prepare(`
            SELECT strftime('%Y-%m-%d', createdAt) as date, SUM(amount) as total
            FROM donations
            GROUP BY date
            ORDER BY date DESC
            LIMIT 30
        `);
        const donationsOverTime = donationsOverTimeStmt.all().reverse();

        res.json({
            appsByRole,
            contactsBySubject,
            donationsOverTime
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/applications/:id/status', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?');
        const info = stmt.run(status, id);
        if (info.changes > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Application not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/export/contacts', authenticateToken, (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC');
        const contacts = stmt.all();

        const header = 'ID,Name,Email,Subject,Message,Date\n';
        const rows = contacts.map(c => {
            const name = `"${c.firstName} ${c.lastName}"`;
            const message = `"${(c.message || '').replace(/"/g, '""')}"`;
            const subject = `"${(c.subject || '').replace(/"/g, '""')}"`;
            return `${c.id},${name},${c.email},${subject},${message},${c.createdAt}`;
        }).join('\n');

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="contacts.csv"');
        res.send(header + rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/export/donations', authenticateToken, (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM donations ORDER BY createdAt DESC');
        const donations = stmt.all();

        const header = 'ID,Amount,Frequency,Payment Method,Date\n';
        const rows = donations.map(d => {
            return `${d.id},${d.amount},${d.frequency},${d.paymentMethod},${d.createdAt}`;
        }).join('\n');

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="donations.csv"');
        res.send(header + rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
        stmt.run(email);
        res.json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.json({ success: true, message: 'Already subscribed' });
        }
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
