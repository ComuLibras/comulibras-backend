
import { Router } from 'express';

import { Roles } from '@domain/accounts/entities/role';
import { CreateCategoryController } from '@domain/categories/use-cases/create-category/create-category-controller';
import { DeleteCategoryController } from '@domain/categories/use-cases/delete-category/delete-category-controller';
import { GetCategoriesController } from '@domain/categories/use-cases/get-categories/get-categories-controller';
import { UpdateCategoryController } from '@domain/categories/use-cases/update-category/update-category-controller';
import { UpdateCategoryStatusController } from '@domain/categories/use-cases/update-category-status/update-category-status-controller';

import { container } from '@kernel/di/container';

import { makeAuthenticationMiddleware } from '@shared/http/middlewares/factories/make-authentication-middleware';
import { makeAuthorizationMiddleware } from '@shared/http/middlewares/factories/make-authorization-middleware';

import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

const authenticationMiddleware = middlewareAdapter(makeAuthenticationMiddleware());
const optionalAuthenticationMiddleware = middlewareAdapter(makeAuthenticationMiddleware({ optional: true }));
const authorizationMiddleware = middlewareAdapter(makeAuthorizationMiddleware([Roles.SENTENCES_MANAGER]));

export const categoriesRouter = Router();

categoriesRouter.get('/',
  optionalAuthenticationMiddleware,
  routeAdapter(container.resolve(GetCategoriesController)),
);

categoriesRouter.post('/',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(CreateCategoryController)),
);

categoriesRouter.put('/:categoryId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(UpdateCategoryController)),
);

categoriesRouter.delete('/:categoryId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(DeleteCategoryController)),
);

categoriesRouter.patch('/:categoryId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(UpdateCategoryStatusController)),
);
