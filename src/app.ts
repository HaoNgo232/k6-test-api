import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './modules/auth';
import itemsRouter from './modules/items';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import config from './config/env.config';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: config.service.name,
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth/login',
      items: '/api/items'
    }
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    service: config.service.name,
    timestamp: new Date().toISOString() 
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/items', authMiddleware, itemsRouter);

// Error handling
app.use(errorMiddleware);

export default app;