import Database from 'better-sqlite3';
const db = new Database('database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    frequency TEXT,
    paymentMethod TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    description TEXT,
    image TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS careers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    department TEXT,
    location TEXT,
    type TEXT,
    description TEXT,
    requirements TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobId INTEGER,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT,
    resume TEXT,
    coverLetter TEXT,
    status TEXT DEFAULT "Pending",
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed programs if empty
const stmt = db.prepare('SELECT count(*) as count FROM programs');
const { count } = stmt.get();

if (count === 0) {
  const insert = db.prepare('INSERT INTO programs (title, category, description, image, icon) VALUES (@title, @category, @description, @image, @icon)');
  const programs = [
    {
      title: "Tech for All",
      category: "Education",
      description: "Bridging the digital divide by providing laptops, tablets, and comprehensive coding workshops to under-resourced schools. We empower students with the digital literacy skills required for the 21st-century workforce, ensuring no child is left behind in the tech revolution.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Code"
    },
    {
      title: "Green Roots",
      category: "Environment",
      description: "A community-driven initiative focused on urban reforestation and sustainable gardening. We transform neglected urban spaces into vibrant green hubs that improve air quality, provide fresh organic produce to local food banks, and serve as educational centers for environmental stewardship.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Sprout"
    },
    {
      title: "Future Leaders",
      category: "Mentorship",
      description: "Connecting ambitious youth with industry professionals for 1-on-1 mentorship, career guidance, and leadership development. Our program focuses on soft skills, networking, and confidence building to prepare the next generation of ethical and innovative leaders.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "HeartHandshake"
    },
    {
      title: "Literacy First",
      category: "Education",
      description: "Establishing community libraries and after-school reading programs to foster a love for learning in early childhood. We provide access to diverse books and educational resources, believing that literacy is the fundamental building block for all future academic and personal success.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "BookOpen"
    }
  ];

  programs.forEach(program => insert.run(program));
  console.log('Seeded programs data');
}

// Seed careers if empty
const stmtCareers = db.prepare('SELECT count(*) as count FROM careers');
const { count: countCareers } = stmtCareers.get();

if (countCareers === 0) {
  const insert = db.prepare('INSERT INTO careers (title, department, location, type, description, requirements) VALUES (@title, @department, @location, @type, @description, @requirements)');
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
    }
  ];

  careers.forEach(career => insert.run(career));
  console.log('Seeded careers data');
}

export default db;
