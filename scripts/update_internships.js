import Database from 'better-sqlite3';
const db = new Database('database.db');

// 1. Remove the old generic entry
const deleteStmt = db.prepare('DELETE FROM careers WHERE title = ?');
deleteStmt.run("Summer Internship Program 2025");
console.log('Removed: Summer Internship Program 2025');

// 2. Add the new specific cohorts
const newInternships = [
    {
        title: "Internship Program (Rolling Basis)",
        department: "General",
        location: "Remote / Hybrid",
        type: "Internship",
        description: "Flexible internship opportunities available year-round. Work on live projects, gain industry exposure, and contribute to our mission at your own pace.",
        requirements: "Open to students and recent graduates. Minimum commitment of 3 months. flexible hours."
    },
    {
        title: "Summer Internship Cohort 2025",
        department: "General",
        location: "Pune / Remote",
        type: "Internship",
        description: "A structured 8-week intensive program running from May to July. Includes mentorship, workshops, and a capstone project. Ideal for students looking for a comprehensive learning experience.",
        requirements: "Full-time availability during the summer break. Strong academic record and passion for social impact."
    },
    {
        title: "Winter Internship Cohort 2024",
        department: "General",
        location: "Pune / Remote",
        type: "Internship",
        description: "A 4-week fast-track program during the winter break (December - January). Focuses on specific short-term projects and campaigns.",
        requirements: "Availability during winter break. Quick learner and team player."
    }
];

const insert = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (@title, @department, @location, @type, @description, @requirements)');
const check = db.prepare('SELECT id FROM careers WHERE title = ?');

newInternships.forEach(internship => {
    const existing = check.get(internship.title);
    if (!existing) {
        insert.run(internship);
        console.log(`Added: ${internship.title}`);
    } else {
        console.log(`Skipped (already exists): ${internship.title}`);
    }
});
