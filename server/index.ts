import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import leadsRouter from './routes/leads';
import storedRouter from './routes/stored';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS — only allow the Replit dev domain and localhost
const allowedOrigins = [
  /^http:\/\/localhost(:\d+)?$/,
  /^https?:\/\/.*\.replit\.dev(:\d+)?$/,
  /^https?:\/\/.*\.picard\.replit\.dev(:\d+)?$/,
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    const allowed = allowedOrigins.some(pattern => pattern.test(origin));
    callback(allowed ? null : new Error('CORS: origin not allowed'), allowed);
  },
}));

app.use(express.json({ limit: '16kb' }));

// Rate limiting — max 30 scrape requests per 10 minutes per IP
const scrapeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please wait and try again.' },
});

// Routes
app.use('/api/scrape', scrapeLimiter);
app.use('/api', leadsRouter);
app.use('/api', storedRouter);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
