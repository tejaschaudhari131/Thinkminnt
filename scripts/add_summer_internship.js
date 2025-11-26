import Database from 'better-sqlite3';
const db = new Database('database.db');

const internship = {
    title: "Summer Internship Program 2025",
    department: "General",
    location: "Pune / Remote",
    type: "Internship",
    description: "Kickstart your career with our comprehensive Summer Internship Program. Gain hands-on experience in non-profit operations, project management, and community development. Open to students from all disciplines.",
    requirements: "Currently enrolled in an undergraduate or postgraduate program. Strong communication skills, eagerness to learn, and a passion for social change. Duration: 8-10 weeks."
};

const insert = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (@title, @department, @location, @type, @description, @requirements)');

// Check if exists
const check = db.prepare('SELECT id FROM careers WHERE title = ?');
const existing = check.get(internship.title);

if (!existing) {
    insert.run(internship);
    console.log(`Added: ${internship.title}`);
} else {
    console.log(`Skipped (already exists): ${internship.title}`);
}
