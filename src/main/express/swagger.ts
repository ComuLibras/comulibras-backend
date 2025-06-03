import { Express } from 'express';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from '../../application/config/env';
import {
  authPathSignIn,
  authPathSignUp,
} from '../../application/domain/auth/docs/auth-path';
import { signInHttpSchema } from '../../application/domain/auth/docs/sign-in-swagger';
import { signUpHttpSchema } from '../../application/domain/auth/docs/sign-up-swagger';
import { signInOpenAPIBody } from '../../application/domain/auth/use-cases/sign-in/sign-in-dto';
import { signUpOpenAPIBody } from '../../application/domain/auth/use-cases/sign-up/sign-up-dto';
import { categoriesPathCreate, categoriesPathWithId } from '../../application/domain/categories/docs/categories-path';
import { categoryHttpSchemaOpenAPI } from '../../application/domain/categories/mappers/category-mapper';
import { createCategoryOpenAPIBody } from '../../application/domain/categories/use-cases/create-category/create-category-dto';
import { updateCategoryStatusOpenAPIBody } from '../../application/domain/categories/use-cases/update-category-status/update-category-status-dto';
import { updateCategoryOpenAPIBody } from '../../application/domain/categories/use-cases/update-category/update-category-dto';
import { Tags } from '../../application/shared/docs/tags';
import { INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE } from '../../application/shared/http/errors/internal-server-http-error';
import { INVALID_TOKEN_ERROR } from '../../application/shared/http/middlewares/authentication-middleware';
import { ACCESS_FORBIDDEN_ERROR } from '../../application/shared/http/middlewares/authorization-middleware';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    tags: [
      {
        name: Tags.AUTH,
        description: 'Endpoints relacionados a autenticação',
      },
      {
        name: Tags.ACCOUNTS,
        description: 'Endpoints relacionados a contas de usuários',
      },
      {
        name: Tags.CATEGORIES,
        description: 'Endpoints relacionados a categorias',
      },
      {
        name: Tags.SENTENCES,
        description: 'Endpoints relacionados a frases',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        ValidationError: {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorsResponse' },
            },
          },
        },
        UnauthorizedError: {
          description: 'Token inválido ou não fornecido',
          content: {
            'application/json': {
              example: {
                messages: [INVALID_TOKEN_ERROR],
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Acesso negado à funcionalidade.',
          content: {
            'application/json': {
              example: {
                messages: [ACCESS_FORBIDDEN_ERROR],
              },
            },
          },
        },
        InternalServerError: {
          description: 'Erro interno do servidor.',
          content: {
            'application/json': {
              example: {
                messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE],
              },
            },
          },
        },
      },
      schemas: {
        SignIn: signInOpenAPIBody,
        SignInResponse: signInHttpSchema,
        SignUp: signUpOpenAPIBody,
        SignUpResponse: signUpHttpSchema,
        CreateCategory: createCategoryOpenAPIBody,
        UpdateCategory: updateCategoryOpenAPIBody,
        UpdateCategoryStatus: updateCategoryStatusOpenAPIBody,
        Category: categoryHttpSchemaOpenAPI,
        ErrorsResponse: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Mensagens de erro',
            },
          },
        },
        MultipleErrorsResponse: {
          oneOf: [{ $ref: '#/components/schemas/ErrorsResponse' }],
          description: 'Possíveis mensagens de erro',
        },
      },
    },
    info: {
      title: 'sinaliza',
      version: '1.0.0',
      description: 'Documentação da API utilizando Swagger',
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor Local',
      },
    ],
    paths: {
      '/auth/sign-up': authPathSignUp,
      '/auth/sign-in': authPathSignIn,
      '/categories': categoriesPathCreate,
      '/categories/:categoryId': categoriesPathWithId,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📖 Swagger docs available at http://localhost:${env.port}/api-docs`,
  );
};
