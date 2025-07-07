import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { env } from '@config/env';

import { accountsPath, accountsPathRole, accountsPathStatus, accountsPathWithId } from '@domain/accounts/docs/accounts-path';
import { accountHttpSchemaOpenAPI } from '@domain/accounts/mappers/account-mapper';
import { createAccountOpenAPIBody } from '@domain/accounts/use-cases/create-account/create-account-dto';
import { updateAccountRoleOpenAPIBody } from '@domain/accounts/use-cases/update-account-role/update-account-role-dto';
import { updateAccountStatusOpenAPIBody } from '@domain/accounts/use-cases/update-account-status/update-account-status-dto';
import {
  authPathSignIn,
  authPathSignUp,
} from '@domain/auth/docs/auth-path';
import { signInHttpSchema } from '@domain/auth/docs/sign-in-swagger';
import { signUpHttpSchema } from '@domain/auth/docs/sign-up-swagger';
import { signInOpenAPIBody } from '@domain/auth/use-cases/sign-in/sign-in-dto';
import { signUpOpenAPIBody } from '@domain/auth/use-cases/sign-up/sign-up-dto';
import { categoriesPathCreate, categoriesPathFavorite, categoriesPathWithId } from '@domain/categories/docs/categories-path';
import { categoryHttpSchemaOpenAPI } from '@domain/categories/mappers/category-mapper';
import { createCategoryOpenAPIBody } from '@domain/categories/use-cases/create-category/create-category-dto';
import { updateCategoryOpenAPIBody } from '@domain/categories/use-cases/update-category/update-category-dto';
import { updateCategoryFavoriteOpenAPIBody } from '@domain/categories/use-cases/update-category-favorite/update-category-favorite-dto';
import { updateCategoryStatusOpenAPIBody } from '@domain/categories/use-cases/update-category-status/update-category-status-dto';
import { sentencesPath, sentencesPathFavorite, sentencesPathWithId } from '@domain/sentences/docs/sentences-path';
import { sentenceHttpSchemaOpenAPI } from '@domain/sentences/mappers/sentence-mapper';
import { createSentenceOpenAPIBody } from '@domain/sentences/use-cases/create-sentence/create-sentence-dto';
import { deleteSentencesOpenAPIBody } from '@domain/sentences/use-cases/delete-sentences/delete-sentences-dto';
import { updateSentenceOpenAPIBody } from '@domain/sentences/use-cases/update-sentence/update-sentence-dto';
import { updateSentenceFavoriteOpenAPIBody } from '@domain/sentences/use-cases/update-sentence-favorite/update-sentence-favorite-dto';
import { updateSentenceStatusOpenAPIBody } from '@domain/sentences/use-cases/update-sentence-status/update-sentence-status-dto';
import { updateSentencesCategoryOpenAPIBody } from '@domain/sentences/use-cases/update-sentences-category/update-sentences-category-dto';

import { Tags } from '@shared/docs/tags';
import { INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE } from '@shared/http/errors/internal-server-http-error';
import { INVALID_TOKEN_ERROR } from '@shared/http/middlewares/authentication-middleware';
import { ACCESS_FORBIDDEN_ERROR } from '@shared/http/middlewares/authorization-middleware';

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
        UpdateCategoryFavorite: updateCategoryFavoriteOpenAPIBody,
        CreateSentence: createSentenceOpenAPIBody,
        UpdateSentence: updateSentenceOpenAPIBody,
        UpdateSentenceStatus: updateSentenceStatusOpenAPIBody,
        UpdateSentenceFavorite: updateSentenceFavoriteOpenAPIBody,
        UpdateSentencesCategory: updateSentencesCategoryOpenAPIBody,
        DeleteSentences: deleteSentencesOpenAPIBody,
        Account: accountHttpSchemaOpenAPI,
        CreateAccount: createAccountOpenAPIBody,
        UpdateAccountStatus: updateAccountStatusOpenAPIBody,
        UpdateAccountRole: updateAccountRoleOpenAPIBody,
        Category: categoryHttpSchemaOpenAPI,
        Sentence: sentenceHttpSchemaOpenAPI,
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
      title: 'ComuLibras',
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
      '/categories/{categoryId}': categoriesPathWithId,
      '/categories/{categoryId}/favorite': categoriesPathFavorite,
      '/sentences': sentencesPath,
      '/sentences/{sentenceId}': sentencesPathWithId,
      '/sentences/{sentenceId}/favorite': sentencesPathFavorite,
      '/accounts': accountsPath,
      '/accounts/{accountId}': accountsPathWithId,
      '/accounts/{accountId}/status': accountsPathStatus,
      '/accounts/{accountId}/role': accountsPathRole,
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
