import { Router } from 'express';
import { authRouter } from './auth-router';
import { categoriesRouter } from './categories-router';

export const appRouter = Router();

appRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

appRouter.use('/auth', authRouter);
appRouter.use('/categories', categoriesRouter);
