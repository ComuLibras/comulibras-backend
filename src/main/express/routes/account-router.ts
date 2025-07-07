import { Router } from 'express';

import { CreateAccountController } from '@domain/accounts/use-cases/create-account/create-account-controller';
import { DeleteAccountController } from '@domain/accounts/use-cases/delete-account/delete-account-controller';
import { GetAccountsController } from '@domain/accounts/use-cases/get-accounts/get-accounts-controller';
import { UpdateAccountRoleController } from '@domain/accounts/use-cases/update-account-role/update-account-role-controller';
import { UpdateAccountStatusController } from '@domain/accounts/use-cases/update-account-status/update-account-status-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const accountsRouter = Router();

accountsRouter.post('/', routeAdapter(container.resolve(CreateAccountController)));
accountsRouter.get('/', routeAdapter(container.resolve(GetAccountsController)));
accountsRouter.patch('/:accountId/role',  routeAdapter(container.resolve(UpdateAccountRoleController)));
accountsRouter.patch('/:accountId/status',  routeAdapter(container.resolve(UpdateAccountStatusController)));
accountsRouter.delete('/:accountId',  routeAdapter(container.resolve(DeleteAccountController)));
