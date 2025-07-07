import { Router } from 'express';

import { Roles } from '@domain/accounts/entities/role';
import { CreateSentenceController } from '@domain/sentences/use-cases/create-sentence/create-sentence-controller';
import { DeleteSentenceController } from '@domain/sentences/use-cases/delete-sentence/delete-sentence-controller';
import { DeleteSentencesController } from '@domain/sentences/use-cases/delete-sentences/delete-sentences-controller';
import { GetSentencesController } from '@domain/sentences/use-cases/get-sentences/get-sentences-controller';
import { UpdateSentenceController } from '@domain/sentences/use-cases/update-sentence/update-sentence-controller';
import { UpdateSentenceFavoriteController } from '@domain/sentences/use-cases/update-sentence-favorite/update-sentence-favorite-controller';
import { UpdateSentenceStatusController } from '@domain/sentences/use-cases/update-sentence-status/update-sentence-status-controller';
import { UpdateSentencesCategoryController } from '@domain/sentences/use-cases/update-sentences-category/update-sentences-category-controller';

import { container } from '@kernel/di/container';

import { makeAuthenticationMiddleware } from '@shared/http/middlewares/factories/make-authentication-middleware';
import { makeAuthorizationMiddleware } from '@shared/http/middlewares/factories/make-authorization-middleware';

import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

const authenticationMiddleware  = middlewareAdapter(makeAuthenticationMiddleware());
const optionalAuthenticationMiddleware  = middlewareAdapter(makeAuthenticationMiddleware({ optional: true }));
const authorizationMiddleware = middlewareAdapter(makeAuthorizationMiddleware([Roles.SENTENCES_MANAGER]));

export const sentencesRouter = Router();

sentencesRouter.get('/',
  optionalAuthenticationMiddleware,
  routeAdapter(container.resolve(GetSentencesController)),
);

sentencesRouter.post('/',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(CreateSentenceController)),
);

sentencesRouter.put('/:sentenceId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(UpdateSentenceController)),
);

sentencesRouter.patch('/',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(UpdateSentencesCategoryController)),
);

sentencesRouter.patch('/:sentenceId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(UpdateSentenceStatusController)),
);

sentencesRouter.patch('/:sentenceId/favorite',
  authenticationMiddleware,
  routeAdapter(container.resolve(UpdateSentenceFavoriteController)),
);

sentencesRouter.delete('/',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(DeleteSentencesController)),
);

sentencesRouter.delete('/:sentenceId',
  authenticationMiddleware,
  authorizationMiddleware,
  routeAdapter(container.resolve(DeleteSentenceController)),
);
