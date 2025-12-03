import db from './db-client.js';

const initDatabase = async () => {
  // Determine if we are in production (Postgres) or development (SQLite)
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
    frequency ${textType},
    paymentMethod ${textType},
    status ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  await db.exec(createTable('users', `
    id ${autoIncrement},
    name ${textType},
    email ${textType} UNIQUE,
    password ${textType},
    role ${textType} DEFAULT 'donor',
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Migration for donations table
  try {
    await db.exec(`ALTER TABLE donations ADD COLUMN txnid ${textType} `);
    await db.exec(`ALTER TABLE donations ADD COLUMN donorName ${textType} `);
    await db.exec(`ALTER TABLE donations ADD COLUMN donorEmail ${textType} `);
    await db.exec(`ALTER TABLE donations ADD COLUMN status ${textType} `);
    console.log('Added missing columns to donations table');
  } catch (err) {
    // Ignore if columns already exist
  }

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
    resumeData ${isPostgres ? 'BYTEA' : 'BLOB'},
    resumeType ${textType},
    coverLetter ${textType},
    status ${textType} DEFAULT 'Pending',
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Migration to add columns if they don't exist (for existing production DB)
  try {
    await db.exec(`ALTER TABLE applications ADD COLUMN resumeData ${isPostgres ? 'BYTEA' : 'BLOB'} `);
    console.log('Added resumeData column to applications table');
  } catch (err) {
    // Ignore if column already exists
    if (!err.message.includes('duplicate column') && !err.message.includes('already exists')) {
      console.log('Note: resumeData column might already exist or error:', err.message);
    }
  }

  try {
    await db.exec(`ALTER TABLE applications ADD COLUMN resumeType ${textType} `);
    console.log('Added resumeType column to applications table');
  } catch (err) {
    // Ignore if column already exists
    if (!err.message.includes('duplicate column') && !err.message.includes('already exists')) {
      console.log('Note: resumeType column might already exist or error:', err.message);
    }
  }

  await db.exec(createTable('subscribers', `
    id ${autoIncrement},
    email ${textType} UNIQUE,
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Create Events Table
  await db.exec(createTable('events', `
    id ${autoIncrement},
    title ${textType},
    date ${textType},
    location ${textType},
    description ${textType},
    image ${textType},
    status ${textType} DEFAULT 'Upcoming'
    `));

  // Create Event Registrations Table
  await db.exec(createTable('event_registrations', `
    id ${autoIncrement},
    eventId INTEGER,
    name ${textType},
    email ${textType},
    phone ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Create Posts Table (Blog)
  await db.exec(createTable('posts', `
    id ${autoIncrement},
    title ${textType},
    excerpt ${textType},
    content ${textType},
    author ${textType},
    category ${textType},
    image ${textType},
    readTime ${textType},
    createdAt ${isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP'}
  `));

  // Indexes for High Performance
  try {
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donorEmail)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_events_status ON events(status)`);
    await db.exec(`CREATE INDEX IF NOT EXISTS idx_applications_jobId ON applications(jobId)`);
    console.log('Database indexes verified');
  } catch (err) {
    console.error('Error creating indexes:', err);
  }

  // Seed programs
  const insertProgram = db.prepare('INSERT INTO programs (title, category, description, image, icon) VALUES (?, ?, ?, ?, ?)');
  const checkProgram = db.prepare('SELECT id FROM programs WHERE title = ?');

  const programs = [
    {
      title: "Tech for All",
      category: "Education",
      description: "Bridging the digital divide by providing laptops, tablets, and comprehensive coding workshops to under-resourced schools. We empower students with the digital literacy skills required for the 21st-century workforce, ensuring no child is left behind in the tech revolution.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Code"
    },
    {
      title: "Green Roots",
      category: "Environment",
      description: "A community-driven initiative focused on urban reforestation and sustainable gardening. We transform neglected urban spaces into vibrant green hubs that improve air quality, provide fresh organic produce to local food banks, and serve as educational centers for environmental stewardship.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Sprout"
    },
    {
      title: "Future Leaders",
      category: "Mentorship",
      description: "Connecting ambitious youth with industry professionals for 1-on-1 mentorship, career guidance, and leadership development. Our program focuses on soft skills, networking, and confidence building to prepare the next generation of ethical and innovative leaders.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "HeartHandshake"
    },
    {
      title: "Literacy First",
      category: "Education",
      description: "Establishing community libraries and after-school reading programs to foster a love for learning in early childhood. We provide access to diverse books and educational resources, believing that literacy is the fundamental building block for all future academic and personal success.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "BookOpen"
    }
  ];

  for (const program of programs) {
    const existing = await checkProgram.get(program.title);
    if (!existing) {
      await insertProgram.run(program.title, program.category, program.description, program.image, program.icon);
      console.log(`Seeded program: ${program.title} `);
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
      console.log(`Seeded career: ${career.title} `);
    }
  }

  // Seed Events
  const insertEvent = db.prepare('INSERT INTO events (title, date, location, description, image, status) VALUES (?, ?, ?, ?, ?, ?)');
  const checkEvent = db.prepare('SELECT id FROM events WHERE title = ?');

  const events = [
    {
      title: "Tech for All Workshop",
      date: "2025-12-15",
      location: "Pune Community Center",
      description: "A hands-on coding workshop for students from underprivileged backgrounds. Volunteers needed to mentor students.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Upcoming"
    },
    {
      title: "Green City Plantation Drive",
      date: "2025-12-20",
      location: "Riverside Park, Pune",
      description: "Join us to plant 500 saplings and make our city greener. Tools and refreshments provided.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "Upcoming"
    }
  ];

  for (const event of events) {
    const existing = await checkEvent.get(event.title);
    if (!existing) {
      await insertEvent.run(event.title, event.date, event.location, event.description, event.image, event.status);
      console.log(`Seeded event: ${event.title} `);
    }
  }

  // Seed Posts
  const insertPost = db.prepare('INSERT INTO posts (title, excerpt, content, author, category, image, readTime) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const checkPost = db.prepare('SELECT id FROM posts WHERE title = ?');

  const posts = [
    {
      title: "Empowering Rural India Through Digital Literacy",
      excerpt: "How our 'Tech for All' initiative is bridging the digital divide in Maharashtra's remote villages.",
      content: "In the heart of rural Maharashtra, a quiet revolution is underway. Our 'Tech for All' initiative has reached over 50 villages, providing not just laptops, but the skills to use them. We believe that digital literacy is the key to unlocking economic opportunities in the 21st century...",
      author: "Tejas S.",
      category: "Education",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read"
    },
    {
      title: "Sustainable Living: Small Steps, Big Impact",
      excerpt: "Practical tips for urban residents to contribute to a greener environment, starting from their own balconies.",
      content: "Urbanization doesn't have to mean the end of nature. In this post, we explore how small changes in our daily lives—from composting kitchen waste to starting a balcony garden—can collectively make a massive difference to our city's environment...",
      author: "Priya M.",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read"
    },
    {
      title: "The Power of Mentorship",
      excerpt: "Why guidance from industry professionals is crucial for the career development of underprivileged youth.",
      content: "Talent is everywhere, but opportunity is not. Our mentorship program connects industry veterans with ambitious youth from underserved communities. The results? Increased confidence, clearer career paths, and a network that opens doors...",
      author: "Rahul K.",
      category: "Mentorship",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read"
    },
    {
      title: "Highlights from our Diwali Donation Drive",
      excerpt: "A look back at how we spread joy and warmth to over 500 families this festive season.",
      content: "This Diwali was special. Thanks to your generous donations, we were able to distribute sweets, new clothes, and educational kits to over 500 families in Pune. The smiles on the children's faces were the brightest lights of the festival...",
      author: "Team ThinkMinnt",
      category: "Community",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "3 min read"
    }
  ];

  for (const post of posts) {
    const existing = await checkPost.get(post.title);
    if (!existing) {
      await insertPost.run(post.title, post.excerpt, post.content, post.author, post.category, post.image, post.readTime);
      console.log(`Seeded post: ${post.title} `);
    }
  }
};

export { initDatabase };
export default db;
