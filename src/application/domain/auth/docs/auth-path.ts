import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { signInSwagger } from './sign-in-swagger';
import { signUpSwagger } from './sign-up-swagger';

export const authPathSignIn: PathItem = {
  post: addDefaultResponsesSwagger(signInSwagger, { omitResponses: ['403'] }),
};

export const authPathSignUp: PathItem = {
  post: addDefaultResponsesSwagger(signUpSwagger, {
    omitResponses: ['403', '401'],
  }),
};
