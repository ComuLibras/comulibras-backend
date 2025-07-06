
import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';
import { SENTENCE_ALREADY_EXISTS_ERROR } from '@domain/sentences/docs/create-sentence-swagger';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { CreateSentenceBody } from './create-sentence-dto';

@Injectable()
export class CreateSentenceService implements IService<CreateSentenceService.Input, CreateSentenceService.Output> {
  constructor(
    @Inject('SentenceRepository') private readonly sentenceRepository: ISentenceRepository,
    @Inject('CategoryRepository') private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: CreateSentenceService.Input): Promise<CreateSentenceService.Output> {
    const category = await this.validateCategory(input.categoryId);

    await this.validateSentence(input.content, input.categoryId);

    const sentence = new Sentence({
      content: input.content,
      categoryId: input.categoryId,
      videoUrl: input.videoUrl,
      isActive: true,
    });

    await this.sentenceRepository.create(sentence);

    category.increaseSentenceCount();

    await this.categoryRepository.update(category);

    return sentence;
  }

  private async validateCategory(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }

    return category;
  }

  private async validateSentence(content: string, categoryId: string): Promise<void> {
    const sentenceAlreadyExists = await this.sentenceRepository.findByContent(content, categoryId);
    if (sentenceAlreadyExists) {
      throw new ConflictHTTPError(SENTENCE_ALREADY_EXISTS_ERROR);
    }
  }
}

export namespace CreateSentenceService {
  export type Input = CreateSentenceBody;
  export type Output = Sentence;
}
