import express from 'express';
import routes from './routes.js';
const app = express();
app.get('/', (req, res) => res.send('Hello'));
app.listen(3002, () => console.log('Test server running on 3002'));
