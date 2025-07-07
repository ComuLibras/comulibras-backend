
import { SENTENCE_ALREADY_EXISTS_ERROR } from '@domain/sentences/docs/create-sentence-swagger';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { IService } from '@shared/http/interfaces/service';

import { CreateSentenceBody } from './create-sentence-dto';

@Injectable()
export class CreateSentenceService implements IService<CreateSentenceService.Input, CreateSentenceService.Output> {
  constructor(
    @Inject('SentenceRepository') private readonly sentenceRepository: ISentenceRepository,
  ) {}

  async execute(input: CreateSentenceService.Input): Promise<CreateSentenceService.Output> {

    await this.validateSentence(input.content, input.categoryId);

    const sentence = new Sentence({
      content: input.content,
      categoryId: input.categoryId,
      videoUrl: input.videoUrl,
      isActive: true,
    });

    await this.sentenceRepository.create(sentence);

    return sentence;
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
