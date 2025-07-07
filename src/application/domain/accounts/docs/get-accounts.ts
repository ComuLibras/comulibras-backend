import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Listar contas',
  description: 'Lista todas as contas',
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
    {
      name: 'orderBy',
      in: 'query',
      description: 'Campo para ordenação',
      required: false,
      schema: {
        type: 'string',
        enum: ['name', 'email', 'role', 'isPasswordCreated', 'isActive'],
      },
    },
    {
      name: 'orderDirection',
      in: 'query',
      description: 'Direção da ordenação',
      required: false,
      schema: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'asc',
      },
    },
    {
      name: 'isActive',
      in: 'query',
      description: 'Filtrar por status ativo (true = apenas ativas, false = apenas inativas, omitir = todas)',
      required: false,
      schema: {
        type: 'boolean',
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
