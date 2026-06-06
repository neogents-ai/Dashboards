import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import leadsRouter from './routes/leads';
import storedRouter from './routes/stored';
import affiliatesRouter from './routes/affiliates';

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
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(pattern => pattern.test(origin));
    callback(allowed ? null : new Error('CORS: origin not allowed'), allowed);
  },
}));

app.use(express.json({ limit: '16kb' }));

// Stamp all responses with API version
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-API-Version', '1');
  next();
});

// Request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const level = res.statusCode >= 500 ? 'ERROR' : res.statusCode >= 400 ? 'WARN' : 'INFO';
    console.log(`[${level}] ${req.method} ${req.path} ${res.statusCode} — ${ms}ms`);
  });
  next();
});

// Rate limiters
const scrapeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please wait and try again.', code: 'RATE_LIMITED' },
});

const storeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests.', code: 'RATE_LIMITED' },
});

// Routes
app.use('/api/scrape', scrapeLimiter);
app.use('/api/leads', storeLimiter);
app.use('/api/affiliates', storeLimiter);
app.use('/api', leadsRouter);
app.use('/api', storedRouter);
app.use('/api', affiliatesRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', version: 1 });
});

// Global error handler — never leak stack traces
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[UNHANDLED]', err.message);
  res.status(500).json({ success: false, error: 'Internal server error', code: 'SERVER_ERROR' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
