import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Listar contas',
  description: 'Lista todas as contas',
  security: [],
  parameters: [
    {
      name: 'page',
      in: 'query',
      description: 'Página atual',
      required: false,
      schema: {
        type: 'integer',
        default: 1,
      },
    },
    {
      name: 'perPage',
      in: 'query',
      description: 'Número de items por página',
      required: false,
      schema: {
        type: 'integer',
        default: 10,
      },
    },
  ],
  responses: {
    '200': {
      description: 'Contas listadas com sucesso',
      content: {
        'application/json': {
          type: 'array',
          schema: { $ref: '#/components/schemas/Account' },
        },
      },
    },
  },
};
