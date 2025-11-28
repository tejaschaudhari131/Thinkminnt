import express from 'express';
import db from './db.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO contacts (firstName, lastName, email, subject, message) VALUES (?, ?, ?, ?, ?)');
        const info = await stmt.run(firstName, lastName, email, subject, message);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/donate', async (req, res) => {
    const { amount, frequency, paymentMethod } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO donations (amount, frequency, paymentMethod) VALUES (?, ?, ?)');
        const info = await stmt.run(amount, frequency, paymentMethod || 'Card');
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/careers', async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM careers');
        const careers = await stmt.all();
        res.json(careers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/programs', async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM programs');
        const programs = await stmt.all();
        res.json(programs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

import jwt from 'jsonwebtoken';
const SECRET_KEY = 'ThinkMinntSecretKey2024';

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

router.get('/contacts', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT 
                id, 
                firstname as "firstName", 
                lastname as "lastName", 
                email, 
                subject, 
                message, 
                createdat as "createdAt" 
            FROM contacts 
            ORDER BY createdat DESC
        `);
        const contacts = await stmt.all();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/donations', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT 
                id, 
                amount, 
                frequency, 
                paymentmethod as "paymentMethod", 
                createdat as "createdAt" 
            FROM donations 
            ORDER BY createdat DESC
        `);
        const donations = await stmt.all();
        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve uploads from Database
router.get('/uploads/:filename', async (req, res) => {
    try {
        const stmt = db.prepare('SELECT resumeData, resumeType FROM applications WHERE resume = ?');
        const file = await stmt.get(req.params.filename);

        if (file && file.resumeData) {
            res.setHeader('Content-Type', file.resumeType || 'application/pdf');
            res.send(file.resumeData);
        } else {
            // Fallback for old files or if not found
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).send('Error retrieving file');
    }
});

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer for Memory Storage (to save to DB)
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post('/apply', upload.single('resume'), async (req, res) => {
    const { jobId, firstName, lastName, email, phone, coverLetter } = req.body;
    const resume = req.file ? (Date.now() + '-' + req.file.originalname) : null;
    const resumeData = req.file ? req.file.buffer : null;
    const resumeType = req.file ? req.file.mimetype : null;

    console.log('Received application:', { jobId, firstName, lastName });

    try {
        const stmt = db.prepare('INSERT INTO applications (jobId, firstName, lastName, email, phone, resume, resumeData, resumeType, coverLetter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const info = await stmt.run(parseInt(jobId), firstName, lastName, email, phone, resume, resumeData, resumeType, coverLetter);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/applications', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT 
                a.id, 
                a.jobid as "jobId", 
                a.firstname as "firstName", 
                a.lastname as "lastName", 
                a.email, 
                a.phone, 
                a.resume, 
                a.coverletter as "coverLetter", 
                a.status, 
                a.createdat as "createdAt",
                c.title as "jobTitle" 
            FROM applications a
            LEFT JOIN careers c ON a.jobid = c.id 
            ORDER BY a.createdat DESC
        `);
        const applications = await stmt.all();
        console.log('Fetched applications:', applications);
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/analytics', authenticateToken, async (req, res) => {
    try {
        // 1. Applications by Role
        const appsByRoleStmt = db.prepare(`
            SELECT c.title as title, COUNT(a.id) as count
            FROM applications a
            JOIN careers c ON a.jobId = c.id
            GROUP BY c.title
        `);
        const appsByRole = await appsByRoleStmt.all();

        // 2. Donations Over Time
        const donationsStmt = db.prepare(`
            SELECT date(createdAt) as date, SUM(amount) as total
            FROM donations
            GROUP BY date(createdAt)
            ORDER BY date(createdAt) DESC
            LIMIT 30
        `);
        const donationsOverTime = await donationsStmt.all();

        res.json({
            appsByRole,
            donationsOverTime: donationsOverTime.reverse() // Show oldest to newest
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- EVENTS ROUTES ---

// Get all events (Public)
router.get('/events', async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM events ORDER BY date ASC');
        const events = await stmt.all();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new event (Admin)
router.post('/events', authenticateToken, async (req, res) => {
    const { title, date, location, description, image } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO events (title, date, location, description, image) VALUES (?, ?, ?, ?, ?)');
        const info = await stmt.run(title, date, location, description, image);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete event (Admin)
router.delete('/events/:id', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM events WHERE id = ?');
        await stmt.run(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Register for event (Public)
router.post('/events/register', async (req, res) => {
    const { eventId, name, email, phone } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO event_registrations (eventId, name, email, phone) VALUES (?, ?, ?, ?)');
        const info = await stmt.run(eventId, name, email, phone);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get registrations for an event (Admin)
router.get('/events/registrations/:id', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM event_registrations WHERE eventId = ? ORDER BY createdAt DESC');
        const registrations = await stmt.all();
        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Contact Subjects
const contactsBySubjectStmt = db.prepare(`
            SELECT subject, COUNT(*) as count
            FROM contacts
            GROUP BY subject
        `);
const contactsBySubject = await contactsBySubjectStmt.all();

// 3. Donations Over Time (Daily)
const isPostgres = process.env.NODE_ENV === 'production';
const dateExpr = isPostgres ? "TO_CHAR(createdAt, 'YYYY-MM-DD')" : "strftime('%Y-%m-%d', createdAt)";

const donationsOverTimeStmt = db.prepare(`
            SELECT ${dateExpr} as date, SUM(amount) as total
            FROM donations
            GROUP BY 1
            ORDER BY 1 DESC
            LIMIT 30
        `);
const donationsOverTime = (await donationsOverTimeStmt.all()).reverse();

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

router.put('/applications/:id/status', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?');
        const info = await stmt.run(status, id);
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

router.get('/export/contacts', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC');
        const contacts = await stmt.all();

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

router.get('/export/donations', authenticateToken, async (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM donations ORDER BY createdAt DESC');
        const donations = await stmt.all();

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

router.post('/newsletter', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    try {
        const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
        await stmt.run(email);
        res.json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.json({ success: true, message: 'Already subscribed' });
        }
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/seed', async (req, res) => {
    const { secret } = req.body;
    if (secret !== 'ThinkMinntSecretKey2024') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const insertCareer = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)');
        const checkCareer = db.prepare('SELECT id FROM careers WHERE title = ?');

        const careers = [
            {
                title: "Program Coordinator",
                department: "Operations",
                location: "Pune, India",
                type: "Full-time",
                description: "We are looking for a passionate Program Coordinator to oversee our educational initiatives. You will be responsible for planning, executing, and monitoring our 'Tech for All' and 'Literacy First' programs.",
                requirements: "Bachelor's degree in Social Work or related field, 2+ years of experience in NGO operations, strong communication skills."
            },
            {
                title: "Volunteer Manager",
                department: "Human Resources",
                location: "Remote / Pune",
                type: "Part-time",
                description: "Join us to manage our growing community of volunteers. You will recruit, train, and coordinate volunteers for various events and ongoing projects.",
                requirements: "Experience in community management, excellent organizational skills, proficiency with digital tools."
            },
            {
                title: "Grant Writer",
                department: "Fundraising",
                location: "Remote",
                type: "Contract",
                description: "Help us secure funding for our impactful projects. We need a skilled writer to research opportunities and draft compelling grant proposals.",
                requirements: "Proven track record of successful grant applications, exceptional writing abilities, familiarity with non-profit funding landscape."
            },
            {
                title: "Community Volunteer",
                department: "Community",
                location: "Remote / On-site",
                type: "Volunteer",
                description: "Join our community of changemakers! Assist with various initiatives, from event organization to community outreach. A great way to give back and meet like-minded people.",
                requirements: "Passion for social impact, willingness to learn, and a positive attitude. No prior experience required."
            },
            {
                title: "Social Media Intern",
                department: "Marketing",
                location: "Remote",
                type: "Internship",
                description: "Help us tell our story to the world. You will assist in creating content for our social media channels, engaging with our audience, and tracking analytics.",
                requirements: "Current student or recent graduate in Marketing/Communications. Familiarity with Canva, Instagram, and LinkedIn."
            },
            {
                title: "Teaching Assistant Volunteer",
                department: "Education",
                location: "Pune, India",
                type: "Volunteer",
                description: "Support our 'Tech for All' program by assisting instructors during computer literacy workshops. Help students with hands-on practice and answer their questions.",
                requirements: "Basic computer knowledge, patience, and a desire to teach. Fluency in Marathi or Hindi is a plus."
            },
            {
                title: "Research Intern",
                department: "Impact Assessment",
                location: "Remote",
                type: "Internship",
                description: "Assist our team in measuring the impact of our programs. You will help with data collection, analysis, and report writing.",
                requirements: "Strong analytical skills, attention to detail, and proficiency in Excel/Google Sheets."
            },
            {
                title: "Event Coordinator Volunteer",
                department: "Events",
                location: "Pune, India",
                type: "Volunteer",
                description: "Help us plan and execute fundraising events and community gatherings. You will assist with logistics, vendor coordination, and on-site management.",
                requirements: "Strong organizational skills, ability to multitask, and ability to work well under pressure."
            },
            {
                title: "Internship Program (Rolling Basis)",
                department: "General",
                location: "Remote / Hybrid",
                type: "Internship",
                description: "Flexible internship opportunities available year-round. Work on live projects, gain industry exposure, and contribute to our mission at your own pace.",
                requirements: "Open to students and recent graduates. Minimum commitment of 3 months. flexible hours."
            },
            {
                title: "Summer Internship Cohort",
                department: "General",
                location: "Pune / Remote",
                type: "Internship",
                description: "A structured 8-week intensive program running from May to July. Includes mentorship, workshops, and a capstone project. Ideal for students looking for a comprehensive learning experience.",
                requirements: "Full-time availability during the summer break. Strong academic record and passion for social impact."
            },
            {
                title: "Winter Internship Cohort",
                department: "General",
                location: "Pune / Remote",
                type: "Internship",
                description: "A 4-week fast-track program during the winter break (December - January). Focuses on specific short-term projects and campaigns.",
                requirements: "Availability during winter break. Quick learner and team player."
            }
        ];

        let addedCount = 0;
        for (const career of careers) {
            const existing = await checkCareer.get(career.title);
            if (!existing) {
                await insertCareer.run(career.title, career.department, career.location, career.type, career.description, career.requirements);
                addedCount++;
            }
        }

        res.json({ success: true, message: `Seeding complete. Added ${addedCount} new careers.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

import { generateChatResponse, generateImpactStory } from './ai-service.js';

router.post('/ai/chat', async (req, res) => {
    const { message, history } = req.body;
    try {
        // Fetch real-time context from DB
        const careers = await db.prepare('SELECT title, type, location FROM careers').all();
        const programs = await db.prepare('SELECT title, category, description FROM programs').all();

        const contextData = `
        OPEN CAREER POSITIONS:
        ${careers.map(c => `- ${c.title} (${c.type}, ${c.location})`).join('\n')}

        ACTIVE PROGRAMS:
        ${programs.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n')}
        `;

        const response = await generateChatResponse(message, history, contextData);
        res.json({ success: true, response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/ai/impact', async (req, res) => {
    const { amount } = req.body;
    try {
        const story = await generateImpactStory(amount);
        res.json({ success: true, story });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- CMS Endpoints ---

// Careers Management
router.post('/careers', authenticateToken, async (req, res) => {
    const { title, department, location, type, description, requirements } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)');
        const info = await stmt.run(title, department, location, type, description, requirements);
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/careers/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM careers WHERE id = ?');
        const info = await stmt.run(id);
        res.json({ success: true, changes: info.changes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Programs Management
router.post('/programs', authenticateToken, async (req, res) => {
    const { title, category, description, image, icon } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO programs (title, category, description, image, icon) VALUES (?, ?, ?, ?, ?)');
        const info = await stmt.run(title, category, description, image || '', icon || 'Code');
        res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/programs/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM programs WHERE id = ?');
        const info = await stmt.run(id);
        res.json({ success: true, changes: info.changes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
