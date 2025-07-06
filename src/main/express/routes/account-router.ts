import { Router } from 'express';

import { CreateAccountController } from '@domain/accounts/use-cases/create-account/create-account-controller';
import { UpdateAccountRoleController } from '@domain/accounts/use-cases/update-account-role/update-account-role-controller';
import { UpdateAccountStatusController } from '@domain/accounts/use-cases/update-account-status/update-account-status-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const accountsRouter = Router();

accountsRouter.post('/',  routeAdapter(container.resolve(CreateAccountController)));
accountsRouter.patch('/:accountId/role',  routeAdapter(container.resolve(UpdateAccountRoleController)));
accountsRouter.patch('/:accountId/status',  routeAdapter(container.resolve(UpdateAccountStatusController)));
