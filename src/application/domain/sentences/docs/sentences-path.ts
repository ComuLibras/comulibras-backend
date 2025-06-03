import { PathItem } from 'swagger-jsdoc';
import { addDefaultResponsesSwagger } from '../../../shared/docs/add-default-responses-swagger';
import { getSentencesSwagger } from './get-sentences-swagger';

export const sentencesPath: PathItem = {
  get: addDefaultResponsesSwagger(getSentencesSwagger, { omitResponses: ['401', '403'] }),
};

export const sentencesPathWithId: PathItem = {
};
