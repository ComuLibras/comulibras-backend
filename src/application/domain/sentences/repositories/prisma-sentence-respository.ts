import { Prisma } from '@prisma/client';

import { prismaClient } from '@shared/clients/prisma-client';

import { Sentence } from '../entities/sentence';
import { SentenceMapper } from '../mappers/sentence-mapper';
import { type GetSentencesService } from '../use-cases/get-sentences/get-sentences-service';

import { IGetSentencesResponse, ISentenceRepository } from './sentence-repository';

export class PrismaSentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma = prismaClient) {}

  async favorite(sentenceId: string, accountId: string): Promise<void> {
    await this.prisma.userFavoriteSentence.create({
      data: {
        accountId,
        sentenceId,
      },
    });
  }

  async unfavorite(sentenceId: string, accountId: string): Promise<void> {
    await this.prisma.userFavoriteSentence.deleteMany({
      where: {
        accountId,
        sentenceId,
      },
    });
  }

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
    const { search, categoryId, page, perPage, orderBy, orderDirection = 'asc', isActive } = input;

    const whereClause: Prisma.SentenceWhereInput = {
      content: { contains: search, mode: 'insensitive' },
      categoryId: categoryId,
      ...(isActive !== undefined && { isActive }),
    };

    const orderByClause = orderBy ? this.getOrderByClause(orderBy, orderDirection) : { content: orderDirection as Prisma.SortOrder };

    const [totalSentences, sentences] = await Promise.all([
      this.prisma.sentence.count({ where: whereClause }),
      this.prisma.sentence.findMany({
        skip: page ? (page - 1) * perPage : 0,
        take: perPage,
        where: whereClause,
        orderBy: orderByClause,
        include: {
          category: true,
          userFavoriteSentences: {
            where: {
              accountId: input.account?.id,
            },
            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    return {
      sentences: sentences.map(SentenceMapper.toDomain),
      totalSentences,
    };
  }

  private getOrderByClause(orderBy: string, orderDirection: string): Prisma.SentenceOrderByWithRelationInput {
    const direction = orderDirection as Prisma.SortOrder;

    switch (orderBy) {
      case 'content':
        return { content: direction };
      case 'categoryName':
        return { category: { name: direction } };
      case 'isActive':
        return { isActive: direction };
      default:
        return { content: direction };
    }
  }

  async findById(id: string): Promise<Sentence | null> {
    const sentence = await this.prisma.sentence.findUnique({
      where: { id },
      include: {
        category: true,
      },
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
