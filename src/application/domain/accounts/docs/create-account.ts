import { Operation } from 'swagger-jsdoc';
import { Tags } from '@shared/docs/tags';
import { ACCOUNT_ALREADY_EXISTS_ERROR } from '../../auth/docs/sign-up-swagger';

export const createAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Criar conta',
  description: 'Cria uma nova conta',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateAccount' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Conta criada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Account' },
        },
      },
    },
    '409': {
      description: 'Conta já existe',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse', example: { messages: [ACCOUNT_ALREADY_EXISTS_ERROR] } },
        },
      },
    },
  },
};
