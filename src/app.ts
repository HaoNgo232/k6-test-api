import express, { Application } from 'express';
import cors from 'cors';
import authRouter from './modules/auth';
import itemsRouter from './modules/items';
import { errorMiddleware } from './middleware/error.middleware';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'K6 Test API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth/login',
      items: '/api/items'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);

// Error handling
app.use(errorMiddleware);

export default app;
