import { Router } from 'express';

import { accountsRouter } from './account-router';
import { authRouter } from './auth-router';
import { categoriesRouter } from './categories-router';
import { sentencesRouter } from './sentences-router';

export const appRouter = Router();

appRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

appRouter.use('/auth', authRouter);
appRouter.use('/accounts', accountsRouter);
appRouter.use('/categories', categoriesRouter);
appRouter.use('/sentences', sentencesRouter);
