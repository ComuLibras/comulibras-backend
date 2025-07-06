import { Router } from 'express';

import { CreateCategoryController } from '@domain/categories/use-cases/create-category/create-category-controller';
import { DeleteCategoryController } from '@domain/categories/use-cases/delete-category/delete-category-controller';
import { GetCategoriesController } from '@domain/categories/use-cases/get-categories/get-categories-controller';
import { UpdateCategoryController } from '@domain/categories/use-cases/update-category/update-category-controller';
import { UpdateCategoryStatusController } from '@domain/categories/use-cases/update-category-status/update-category-status-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const categoriesRouter = Router();

categoriesRouter.get('/', routeAdapter(container.resolve(GetCategoriesController)));
categoriesRouter.post('/', routeAdapter(container.resolve(CreateCategoryController)));
categoriesRouter.put('/:categoryId', routeAdapter(container.resolve(UpdateCategoryController)));
categoriesRouter.delete('/:categoryId', routeAdapter(container.resolve(DeleteCategoryController)));
categoriesRouter.patch('/:categoryId', routeAdapter(container.resolve(UpdateCategoryStatusController)));
