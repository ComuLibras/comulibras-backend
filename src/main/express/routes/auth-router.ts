import { Router } from 'express';

import { SignInController } from '@domain/auth/use-cases/sign-in/sign-in-controller';
import { SignUpController } from '@domain/auth/use-cases/sign-up/sign-up-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const authRouter = Router();

authRouter.post('/sign-in', routeAdapter(container.resolve(SignInController)));
authRouter.post('/sign-up', routeAdapter(container.resolve(SignUpController)));
