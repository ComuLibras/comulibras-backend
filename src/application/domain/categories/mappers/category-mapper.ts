import { generateSchema } from '@anatine/zod-openapi';
import { Category as RawCategory, Prisma } from '@prisma/client';
import z from 'zod';

import { Category } from '../entities/category';

export const categoryHttpSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  sentenceCount: z.number().min(0),
  color: z.string().min(1),
  icon: z.string().min(1),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isFavorite: z.boolean().optional(),
});

export type CategoryHttpSchema = z.infer<typeof categoryHttpSchema>;

export const categoryHttpSchemaOpenAPI = generateSchema(categoryHttpSchema);

export class CategoryMapper {
  static toDomain(raw: RawCategory & { _count?: { sentences: number }, userFavoriteCategories?: { id: string }[] }): Category {
    return new Category({
      id: raw.id,
      name: raw.name,
      sentenceCount: raw._count?.sentences ?? 0,
      color: raw.color,
      icon: raw.icon,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isFavorite: (raw.userFavoriteCategories?.length ?? 0) > 0,
    });
  }

  static toPersistence(domain: Category): Prisma.CategoryCreateInput {
    return domain.toPrisma();
  }

  static toHttp(domain: Category): CategoryHttpSchema {
    return domain.toHttp();
  }
}
