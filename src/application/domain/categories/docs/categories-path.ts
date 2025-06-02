import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { createCategorySwagger } from './create-category-swagger';

export const categoriesPathCreate: PathItem = {
  post: addDefaultResponsesSwagger(createCategorySwagger),
};
