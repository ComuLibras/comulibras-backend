import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { createAccountSwagger } from './create-account';
import { deleteAccountSwagger } from './delete-account';
import { getAccountsSwagger } from './get-accounts';
import { updateAccountStatusSwagger } from './update-account-status';

export const accountsPath: PathItem = {
  get: addDefaultResponsesSwagger(getAccountsSwagger),
  post: addDefaultResponsesSwagger(createAccountSwagger),
};

export const accountsPathWithId: PathItem = {
  delete: addDefaultResponsesSwagger(deleteAccountSwagger),
  patch: addDefaultResponsesSwagger(updateAccountStatusSwagger),
};
