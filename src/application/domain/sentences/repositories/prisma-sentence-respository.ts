import { prismaClient } from '@shared/clients/prisma-client';

import { Sentence } from '../entities/sentence';
import { SentenceMapper } from '../mappers/sentence-mapper';

import { ISentenceRepository } from './sentence-repository';

export class PrismaSentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma = prismaClient) {}

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

  async findAll(): Promise<Sentence[]> {
    const sentences = await this.prisma.sentence.findMany();
    return sentences.map(SentenceMapper.toDomain);
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
