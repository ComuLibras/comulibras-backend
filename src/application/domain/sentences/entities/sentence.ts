import { Prisma } from '@prisma/client';

import { Entity, IEntityProps } from '@shared/entities/entity';

import { SentenceHttpSchema } from '../mappers/sentence-mapper';

interface ISentenceProps extends IEntityProps {
  content: string;
  videoUrl: string;
  categoryId?: string | null;
  isActive: boolean;
}

export class Sentence extends Entity {
  readonly props: ISentenceProps;

  constructor(props: ISentenceProps) {
    super(props);
    this.props = props;
  }

  toPrisma(): Prisma.SentenceCreateInput {
    const domain = this.props;

    return {
      id: domain.id,
      content: domain.content,
      video_url: domain.videoUrl,
      category: domain.categoryId ? {
        connect: {
          id: domain.categoryId,
        },
      } : undefined,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toHttp(): SentenceHttpSchema {
    const domain = this.props;

    return {
      id: domain.id ?? '',
      content: domain.content,
      videoUrl: domain.videoUrl,
      categoryId: domain.categoryId ?? null,
      isActive: domain.isActive,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
