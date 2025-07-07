import { generateSchema } from '@anatine/zod-openapi';
import { Prisma, Sentence as RawSentence } from '@prisma/client';
import z from 'zod';

import { Sentence } from '../entities/sentence';

export const sentenceHttpSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  videoUrl: z.string().url(),
  categoryId: z.string().uuid().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isFavorite: z.boolean().optional(),
});

export type SentenceHttpSchema = z.infer<typeof sentenceHttpSchema>;

export const sentenceHttpSchemaOpenAPI = generateSchema(sentenceHttpSchema);

export class SentenceMapper {
  static toDomain(raw: RawSentence & { userFavoriteSentences?: { id: string }[] }): Sentence {
    return new Sentence({
      id: raw.id,
      content: raw.content,
      videoUrl: raw.video_url,
      categoryId: raw.categoryId,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isFavorite: raw.userFavoriteSentences?.some((favorite) => favorite.id === raw.id) ?? false,
    });
  }

  static toPersistence(domain: Sentence): Prisma.SentenceCreateInput {
    return domain.toPrisma();
  }

  static toHttp(domain: Sentence): SentenceHttpSchema {
    return domain.toHttp();
  }
}
