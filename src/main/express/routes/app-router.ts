import { Router } from 'express';

import { GetMeAccountController } from '@domain/accounts/use-cases/get-me-account/get-me-account-controller';

import { container } from '@kernel/di/container';

import { makeAuthenticationMiddleware } from '@shared/http/middlewares/factories/make-authentication-middleware';
import { makeAuthorizationMiddleware } from '@shared/http/middlewares/factories/make-authorization-middleware';

import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

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
appRouter.get(
  '/accounts/me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(container.resolve(GetMeAccountController)),
);
appRouter.use('/accounts',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware()),
  accountsRouter,
);
appRouter.use('/categories', categoriesRouter);
appRouter.use('/sentences', sentencesRouter);
