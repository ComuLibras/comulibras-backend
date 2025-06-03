import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { createSentenceSwagger } from './create-sentence-swagger';
import { getSentencesSwagger } from './get-sentences-swagger';

export const sentencesPath: PathItem = {
  get: addDefaultResponsesSwagger(getSentencesSwagger, { omitResponses: ['401', '403'] }),
  post: addDefaultResponsesSwagger(createSentenceSwagger),
};

export const sentencesPathWithId: PathItem = {
};
