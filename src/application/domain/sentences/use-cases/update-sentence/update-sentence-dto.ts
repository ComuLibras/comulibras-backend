import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

import { createSentenceBody } from '../create-sentence/create-sentence-dto';

export const updateSentenceBody = createSentenceBody.partial();

export type UpdateSentenceBody = z.infer<typeof updateSentenceBody>;

export const updateSentenceOpenAPIBody = generateSchema(updateSentenceBody);
