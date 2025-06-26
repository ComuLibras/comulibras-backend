import { Express } from 'express';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from '../../application/config/env';
import { accountsPath, accountsPathRole, accountsPathStatus, accountsPathWithId } from '../../application/domain/accounts/docs/accounts-path';
import { accountHttpSchemaOpenAPI } from '../../application/domain/accounts/mappers/account-mapper';
import { createAccountOpenAPIBody } from '../../application/domain/accounts/use-cases/create-account/create-account-dto';
import { updateAccountRoleOpenAPIBody } from '../../application/domain/accounts/use-cases/update-account-role/update-account-role-dto';
import { updateAccountStatusOpenAPIBody } from '../../application/domain/accounts/use-cases/update-account-status/update-account-status-dto';
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
import { sentencesPath, sentencesPathWithId } from '../../application/domain/sentences/docs/sentences-path';
import { sentenceHttpSchemaOpenAPI } from '../../application/domain/sentences/mapper/sentence-mapper';
import { createSentenceOpenAPIBody } from '../../application/domain/sentences/use-cases/create-sentence/create-sentence-dto';
import { deleteSentencesOpenAPIBody } from '../../application/domain/sentences/use-cases/delete-sentences/delete-sentences-dto';
import { updateSentenceStatusOpenAPIBody } from '../../application/domain/sentences/use-cases/update-sentence-status/update-sentence-status-dto';
import { updateSentenceOpenAPIBody } from '../../application/domain/sentences/use-cases/update-sentence/update-sentence-dto';
import { updateSentencesCategoryOpenAPIBody } from '../../application/domain/sentences/use-cases/update-sentences-category/update-sentences-category-dto';
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
        CreateSentence: createSentenceOpenAPIBody,
        UpdateSentence: updateSentenceOpenAPIBody,
        UpdateSentenceStatus: updateSentenceStatusOpenAPIBody,
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
      '/categories/:categoryId': categoriesPathWithId,
      '/sentences': sentencesPath,
      '/sentences/:sentenceId': sentencesPathWithId,
      '/accounts': accountsPath,
      '/accounts/:accountId': accountsPathWithId,
      '/accounts/:accountId/status': accountsPathStatus,
      '/accounts/:accountId/role': accountsPathRole,
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
