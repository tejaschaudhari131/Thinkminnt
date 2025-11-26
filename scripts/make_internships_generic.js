import Database from 'better-sqlite3';
const db = new Database('database.db');

// Update Summer Internship
const updateSummer = db.prepare('UPDATE careers SET title = ? WHERE title = ?');
const summerResult = updateSummer.run("Summer Internship Cohort", "Summer Internship Cohort 2025");
console.log(`Updated Summer Internship: ${summerResult.changes} changes`);

// Update Winter Internship
const updateWinter = db.prepare('UPDATE careers SET title = ? WHERE title = ?');
const winterResult = updateWinter.run("Winter Internship Cohort", "Winter Internship Cohort 2024");
console.log(`Updated Winter Internship: ${winterResult.changes} changes`);

console.log('Done making internships generic.');
