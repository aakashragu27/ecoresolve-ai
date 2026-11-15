import 'dotenv/config';// reads server/.env into process.env
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import healthRouter from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Security and request handling (NFR-03)
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// The "hello" route
app.get('/', (req, res) => { 
res.send('EcoResolve API is running');
});

// API routes
app.use('/api/health', healthRouter);
// Any other address: reply in the project's error format
app.use((req, res) => { 
res.status(404).json({
error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.originalUrl}` }, 
});
});
// Connect to Atlas first, then start listening
async function start() { 
try { 
await mongoose.connect(process.env.MONGODB_URI);
 console.log('Connected to MongoDB Atlas, database:', mongoose.connection.name);
 app.listen(PORT, () => { 
 console.log(`API listening on http://localhost:${PORT}`);
 });
 } catch (err) { console.error('Could not connect to MongoDB:', err.message);
 process.exit(1);
 }
 }
 
 start();
