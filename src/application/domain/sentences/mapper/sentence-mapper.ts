import { Prisma, Sentence as RawSentence } from '../../../../../prisma/generated/prisma';
import { Sentence } from '../entities/sentence';

export class SentenceMapper {
  static toDomain(raw: RawSentence): Sentence {
    return new Sentence({
      id: raw.id,
      content: raw.content,
      videoUrl: raw.video_url,
      categoryId: raw.categoryId,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(domain: Sentence): Prisma.SentenceCreateInput {
    return {
      id: domain.id,
      content: domain.content,
      video_url: domain.videoUrl,
      category: {
        connect: {
          id: domain.categoryId,
        },
      },
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toHttp(domain: Sentence) {
    return {
      id: domain.id,
      content: domain.content,
      videoUrl: domain.videoUrl,
      categoryId: domain.categoryId,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}