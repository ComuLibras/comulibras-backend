import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { createCategorySwagger } from './create-category-swagger';
import { updateCategorySwagger } from './update-category-swagger';

export const categoriesPathCreate: PathItem = {
  post: addDefaultResponsesSwagger(createCategorySwagger, { omitResponses: ['403'] }),
};

export const categoriesPathWithId: PathItem = {
  put: addDefaultResponsesSwagger(updateCategorySwagger, { omitResponses: ['403'] }),
};
