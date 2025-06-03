import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { getAccountsSwagger } from './get-accounts';

export const accountsPath: PathItem = {
  get: addDefaultResponsesSwagger(getAccountsSwagger),
};

export const accountsPathWithId: PathItem = {
};
