
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { IService } from '@shared/http/interfaces/service';

import { UpdateSentencesCategoryBody } from './update-sentences-category-dto';

@Injectable()
export class UpdateSentencesCategoryService implements IService<UpdateSentencesCategoryService.Input, UpdateSentencesCategoryService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,
  ) {}

  async execute(input: UpdateSentencesCategoryService.Input): Promise<UpdateSentencesCategoryService.Output> {
    const sentences = await this.sentenceRepo.findByIds(input.sentenceIds);

    const sentencesIds: string[] = [];
    sentences.forEach(sentence => {
      sentence.updateCategory(input.categoryId);
      sentencesIds.push(sentence.id);
    });

    await this.sentenceRepo.updateManyCategoryId(sentencesIds, input.categoryId);

    return sentences;
  }
}

export namespace UpdateSentencesCategoryService {
  export type Input = UpdateSentencesCategoryBody;
  export type Output = Sentence[];
}
