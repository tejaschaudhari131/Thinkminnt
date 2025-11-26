import db from './server/db.js';

console.log('DB imported, checking counts...');

try {
    // Check Careers
    const stmtCareers = db.prepare('SELECT count(*) as count FROM careers');
    const { count: careersCount } = stmtCareers.get();
    console.log(`Careers count in local DB: ${careersCount}`);

    if (careersCount >= 11) {
        console.log('SUCCESS: Database has expected number of careers.');
    } else {
        console.log('WARNING: Database has fewer careers than expected.');
    }

    // Check Programs
    const stmtPrograms = db.prepare('SELECT count(*) as count FROM programs');
    const { count: programsCount } = stmtPrograms.get();
    console.log(`Programs count in local DB: ${programsCount}`);

    if (programsCount >= 4) {
        console.log('SUCCESS: Database has expected number of programs.');
    } else {
        console.log('WARNING: Database has fewer programs than expected.');
    }

} catch (error) {
    console.error('Error verifying DB:', error);
}
