import { PathItem } from 'swagger-jsdoc';

import { addDefaultResponsesSwagger } from '@shared/docs/add-default-responses-swagger';

import { createCategorySwagger } from './create-category-swagger';
import { deleteCategorySwagger } from './delete-categort-swager';
import { getCategoriesSwagger } from './get-categories-swagger';
import { updateCategoryStatusSwagger } from './update-category-status-swagger';
import { updateCategorySwagger } from './update-category-swagger';

export const categoriesPathCreate: PathItem = {
  get: addDefaultResponsesSwagger(getCategoriesSwagger, { omitResponses: ['400', '403'] }),
  post: addDefaultResponsesSwagger(createCategorySwagger),
};

export const categoriesPathWithId: PathItem = {
  patch: addDefaultResponsesSwagger(updateCategoryStatusSwagger),
  put: addDefaultResponsesSwagger(updateCategorySwagger),
  delete: addDefaultResponsesSwagger(deleteCategorySwagger),
};
