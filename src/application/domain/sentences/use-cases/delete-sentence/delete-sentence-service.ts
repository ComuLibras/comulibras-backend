
import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';
import { SENTENCE_NOT_FOUND_ERROR } from '@domain/sentences/docs/constants';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { DeleteSentenceParams } from './delete-sentence-dto';

@Injectable()
export class DeleteSentenceService implements IService<DeleteSentenceService.Input, DeleteSentenceService.Output> {
  constructor(
    @Inject('SentenceRepository') private readonly sentenceRepository: ISentenceRepository,
    @Inject('CategoryRepository') private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: DeleteSentenceService.Input): Promise<DeleteSentenceService.Output> {
    const sentence = await this.validateSentence(input.sentenceId);

    await this.sentenceRepository.delete(input.sentenceId);

    if (sentence.props.categoryId) {
      await this.decreaseCategorySentenceCount(sentence.props.categoryId);
    }
  }

  private async validateSentence(sentenceId: string): Promise<Sentence> {
    const sentence = await this.sentenceRepository.findById(sentenceId);
    if (!sentence) {
      throw new NotFoundHTTPError(SENTENCE_NOT_FOUND_ERROR);
    }
    return sentence;
  }

  private async decreaseCategorySentenceCount(categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }
    category.decreaseSentenceCount();
    await this.categoryRepository.update(category);
  }
}

export namespace DeleteSentenceService {
  export type Input = DeleteSentenceParams;
  export type Output = void;
}
