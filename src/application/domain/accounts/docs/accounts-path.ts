import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { createAccountSwagger } from './create-account';
import { getAccountsSwagger } from './get-accounts';

export const accountsPath: PathItem = {
  get: addDefaultResponsesSwagger(getAccountsSwagger),
  post: addDefaultResponsesSwagger(createAccountSwagger),
};

export const accountsPathWithId: PathItem = {
};
