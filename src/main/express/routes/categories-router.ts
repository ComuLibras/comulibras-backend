import { Router } from 'express';

import { CreateCategoryController } from '@domain/categories/use-cases/create-category/create-category-controller';
import { UpdateCategoryController } from '@domain/categories/use-cases/update-category/update-category-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const categoriesRouter = Router();

categoriesRouter.post('/',  routeAdapter(container.resolve(CreateCategoryController)));
categoriesRouter.put('/:categoryId',  routeAdapter(container.resolve(UpdateCategoryController)));
