import { Router } from 'express';

import { CreateSentenceController } from '@domain/sentences/use-cases/create-sentence/create-sentence-controller';
import { DeleteSentenceController } from '@domain/sentences/use-cases/delete-sentence/delete-sentence-controller';
import { DeleteSentencesController } from '@domain/sentences/use-cases/delete-sentences/delete-sentences-controller';
import { GetSentencesController } from '@domain/sentences/use-cases/get-sentences/get-sentences-controller';
import { UpdateSentenceController } from '@domain/sentences/use-cases/update-sentence/update-sentence-controller';
import { UpdateSentenceStatusController } from '@domain/sentences/use-cases/update-sentence-status/update-sentence-status-controller';
import { UpdateSentencesCategoryController } from '@domain/sentences/use-cases/update-sentences-category/update-sentences-category-controller';

import { container } from '@kernel/di/container';

import { routeAdapter } from '../adapters/route-adapter';

export const sentencesRouter = Router();

sentencesRouter.get('/', routeAdapter(container.resolve(GetSentencesController)));
sentencesRouter.post('/', routeAdapter(container.resolve(CreateSentenceController)));
sentencesRouter.put('/:sentenceId', routeAdapter(container.resolve(UpdateSentenceController)));
sentencesRouter.patch('/', routeAdapter(container.resolve(UpdateSentencesCategoryController)));
sentencesRouter.patch('/:sentenceId', routeAdapter(container.resolve(UpdateSentenceStatusController)));
sentencesRouter.delete('/', routeAdapter(container.resolve(DeleteSentencesController)));
sentencesRouter.delete('/:sentenceId', routeAdapter(container.resolve(DeleteSentenceController)));
