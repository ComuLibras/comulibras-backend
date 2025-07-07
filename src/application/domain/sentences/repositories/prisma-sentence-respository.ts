import { Prisma } from '@prisma/client';

import { prismaClient } from '@shared/clients/prisma-client';

import { Sentence } from '../entities/sentence';
import { SentenceMapper } from '../mappers/sentence-mapper';
import { type GetSentencesService } from '../use-cases/get-sentences/get-sentences-service';

import { IGetSentencesResponse, ISentenceRepository } from './sentence-repository';

export class PrismaSentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma = prismaClient) {}

  async updateManyCategoryId(sentencesIds: string[], categoryId: string): Promise<void> {
    await this.prisma.sentence.updateMany({
      where: {
        id: { in: sentencesIds },
      },
      data: { categoryId },
    });
  }

  async findByIds(ids: string[]): Promise<Sentence[]> {
    const sentences = await this.prisma.sentence.findMany({
      where: {
        id: { in: ids },
      },
    });
    return sentences.map(SentenceMapper.toDomain);
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.sentence.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async findByContent(content: string, categoryId: string): Promise<Sentence | null> {
    const sentence = await this.prisma.sentence.findUnique({
      where: {
        sentences_content_category_id_unique: { content, categoryId },
      },
    });
    return sentence ? SentenceMapper.toDomain(sentence) : null;
  }

  async create(sentence: Sentence): Promise<void> {
    await this.prisma.sentence.create({
      data: SentenceMapper.toPersistence(sentence),
    });
  }

  async findAll(input: GetSentencesService.Input): Promise<IGetSentencesResponse> {
    const where: Prisma.SentenceWhereInput = {
      content: { contains: input.search, mode: 'insensitive' },
      categoryId: input.categoryId,
      isActive: input.onlyActive ? true : undefined,
    };

    const includeFavorites = input.includeFavorites && input.account?.id;

    const [totalSentences, sentences] = await Promise.all([
      this.prisma.sentence.count({ where }),
      this.prisma.sentence.findMany({
        skip: input.page ? (input.page - 1) * input.perPage : 0,
        take: input.perPage,
        where,
        include: {
          ...(includeFavorites ? {
            userFavoriteSentences: {
              where: {
                accountId: input.account?.id,
              },
              select: {
                id: true,
              },
            },
          } : {}),
        },
      }),
    ]);

    return {
      sentences: sentences.map(SentenceMapper.toDomain),
      totalSentences,
    };
  }

  async findById(id: string): Promise<Sentence | null> {
    const sentence = await this.prisma.sentence.findUnique({
      where: { id },
    });
    return sentence ? SentenceMapper.toDomain(sentence) : null;
  }

  async update(sentence: Sentence): Promise<void> {
    await this.prisma.sentence.update({
      where: { id: sentence.id },
      data: SentenceMapper.toPersistence(sentence),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sentence.delete({
      where: { id },
    });
  }
}
