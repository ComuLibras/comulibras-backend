import { Operation } from 'swagger-jsdoc';

import { accountHttpSchemaOpenAPI } from '@domain/accounts/mappers/account-mapper';

import { Tags } from '@shared/docs/tags';

export const getMeAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Obtém os dados da conta do usuário autenticado',
  security: [{ BearerAuth: [] }],
  responses: {
    '200': {
      description: 'Dados do usuário autenticado',
      content: {
        'application/json': {
          schema: accountHttpSchemaOpenAPI,
        },
      },
    },
  },
};

