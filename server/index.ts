import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadsRouter from './routes/leads';
import storedRouter from './routes/stored';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', leadsRouter);
app.use('/api', storedRouter);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
