import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateSentenceFavoriteParams = z.object({
  sentenceId: z.string().uuid(),
});

export type UpdateSentenceFavoriteParams = z.infer<typeof updateSentenceFavoriteParams>;

export const updateSentenceFavoriteBody = z.object({
  isFavorite: z.boolean(),
});

export type UpdateSentenceFavoriteBody = z.infer<typeof updateSentenceFavoriteBody>;

export const updateSentenceFavoriteOpenAPIBody = generateSchema(updateSentenceFavoriteBody);
