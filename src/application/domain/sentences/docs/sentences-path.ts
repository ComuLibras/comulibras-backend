import { PathItem } from 'swagger-jsdoc';

import { addDefaultResponsesSwagger } from '@shared/docs/add-default-responses-swagger';

import { createSentenceSwagger } from './create-sentence-swagger';
import { deleteSentenceSwagger } from './delete-sentence-swagger';
import { deleteSentencesSwagger } from './delete-sentences-swagger';
import { getSentencesSwagger } from './get-sentences-swagger';
import { updateSentenceStatusSwagger } from './update-sentence-status';
import { updateSentenceSwagger } from './update-sentence-swagger';
import { updateSentencesCategorySwagger } from './update-sentences-category';

export const sentencesPath: PathItem = {
  get: addDefaultResponsesSwagger(getSentencesSwagger, { omitResponses: ['401', '403'] }),
  post: addDefaultResponsesSwagger(createSentenceSwagger),
  patch: addDefaultResponsesSwagger(updateSentencesCategorySwagger),
  delete: addDefaultResponsesSwagger(deleteSentencesSwagger),
};

export const sentencesPathWithId: PathItem = {
  delete: addDefaultResponsesSwagger(deleteSentenceSwagger),
  patch: addDefaultResponsesSwagger(updateSentenceStatusSwagger),
  put: addDefaultResponsesSwagger(updateSentenceSwagger),
};
