import Database from 'better-sqlite3';
const db = new Database('database.db');

const newCareers = [
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
    }
];

const insert = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (@title, @department, @location, @type, @description, @requirements)');

// Check if these already exist to avoid duplicates (simple check by title)
const check = db.prepare('SELECT id FROM careers WHERE title = ?');

newCareers.forEach(career => {
    const existing = check.get(career.title);
    if (!existing) {
        insert.run(career);
        console.log(`Added: ${career.title}`);
    } else {
        console.log(`Skipped (already exists): ${career.title}`);
    }
});

console.log('Done adding new careers.');
