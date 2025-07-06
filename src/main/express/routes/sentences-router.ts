import { Router } from 'express';

import { CreateSentenceController } from '@domain/sentences/use-cases/create-sentence/create-sentence-controller';
import { DeleteSentenceController } from '@domain/sentences/use-cases/delete-sentence/delete-sentence-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const sentencesRouter = Router();

sentencesRouter.post('/', routeAdapter(container.resolve(CreateSentenceController)));
sentencesRouter.delete('/:sentenceId', routeAdapter(container.resolve(DeleteSentenceController)));
