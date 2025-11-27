import db from './db-client.js';

const initDatabase = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT, -- SQLite syntax, PG uses SERIAL but we handle via adapter or generic SQL if possible. 
      -- Actually, for PG we might need different CREATE syntax if we want to be strict.
      -- But let's rely on the fact that 'INTEGER PRIMARY KEY AUTOINCREMENT' is accepted by some PG versions or we need to adjust.
      -- Wait, PG uses SERIAL. 'INTEGER PRIMARY KEY AUTOINCREMENT' is SQLite specific.
      -- I should use a more generic syntax or handle it.
      -- Let's use a simple check in the SQL or just use 'SERIAL PRIMARY KEY' for PG and 'INTEGER PRIMARY KEY AUTOINCREMENT' for SQLite?
      -- No, I can't easily switch SQL strings inside the exec call unless I split it.
      -- I will split the CREATE statements.
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    -- ... (other tables)
  `);

  // Actually, I need to handle the schema differences.
  // SQLite: INTEGER PRIMARY KEY AUTOINCREMENT
  // Postgres: SERIAL PRIMARY KEY

  // I will define the schema creation based on the DB type inside initDatabase.
  // But wait, db-client.js abstracts the DB.
  // I should probably move the schema creation to db-client.js or have db.js check the type.
  // db-client doesn't export the type.

  // Let's just use a try-catch or specific SQL for each.
  // Or better, let's use standard SQL that works for both?
  // 'id SERIAL PRIMARY KEY' works in PG.
  // SQLite supports 'INTEGER PRIMARY KEY', but 'AUTOINCREMENT' is optional.
  // If I use 'id INTEGER PRIMARY KEY', SQLite auto-increments.
  // PG needs SERIAL.

  // Let's just do this:
  const isPostgres = process.env.NODE_ENV === 'production' || !!process.env.POSTGRES_URL || !!process.env.DATABASE_URL;
  const autoIncrement = isPostgres ? 'SERIAL' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
  const textType = 'TEXT'; // PG supports TEXT.

  const createTable = (name, columns) => {
    return `CREATE TABLE IF NOT EXISTS ${name} (${columns});`;
  };

  await db.exec(createTable('contacts', `
    id ${autoIncrement},
    firstName ${textType},
    lastName ${textType},
    email ${textType},
    subject ${textType},
    message ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  await db.exec(createTable('donations', `
    id ${autoIncrement},
    amount REAL,
    frequency ${textType},
    paymentMethod ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  await db.exec(createTable('programs', `
    id ${autoIncrement},
    title ${textType},
    category ${textType},
    description ${textType},
    image ${textType},
    icon ${textType}
  `));

  await db.exec(createTable('careers', `
    id ${autoIncrement},
    title ${textType},
    department ${textType},
    location ${textType},
    type ${textType},
    description ${textType},
    requirements ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  await db.exec(createTable('applications', `
    id ${autoIncrement},
    jobId INTEGER,
    firstName ${textType},
    lastName ${textType},
    email ${textType},
    phone ${textType},
    resume ${textType},
    coverLetter ${textType},
    status ${textType} DEFAULT 'Pending',
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  await db.exec(createTable('subscribers', `
    id ${autoIncrement},
    email ${textType} UNIQUE,
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Seed programs
  const insertProgram = db.prepare('INSERT INTO programs (title, category, description, image, icon) VALUES (?, ?, ?, ?, ?)');
  const checkProgram = db.prepare('SELECT id FROM programs WHERE title = ?');

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

  for (const program of programs) {
    const existing = await checkProgram.get(program.title);
    if (!existing) {
      await insertProgram.run(program.title, program.category, program.description, program.image, program.icon);
      console.log(`Seeded program: ${program.title}`);
    }
  }

  // Seed careers
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

  for (const career of careers) {
    const existing = await checkCareer.get(career.title);
    if (!existing) {
      await insertCareer.run(career.title, career.department, career.location, career.type, career.description, career.requirements);
      console.log(`Seeded career: ${career.title}`);
    }
  }
};

export { initDatabase };
export default db;

