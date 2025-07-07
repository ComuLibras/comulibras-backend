import { SENTENCE_NOT_FOUND_ERROR } from '@domain/sentences/docs/constants';
import { SENTENCE_ALREADY_EXISTS_ERROR } from '@domain/sentences/docs/update-sentence-swagger';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateSentenceBody, UpdateSentenceParams } from './update-sentence-dto';

@Injectable()
export class UpdateSentenceService implements IService<UpdateSentenceService.Input, UpdateSentenceService.Output> {
  constructor(
    @Inject('SentenceRepository') private readonly sentenceRepository: ISentenceRepository,
  ) {}

  async execute(input: UpdateSentenceService.Input): Promise<UpdateSentenceService.Output> {
    const sentence = await this.sentenceRepository.findById(input.sentenceId);

    if (!sentence) {
      throw new NotFoundHTTPError(SENTENCE_NOT_FOUND_ERROR);
    }

    if (input.content) {
      await this.validateContent(input.content, sentence.id, sentence.props.categoryId ?? null);
    }

    sentence.update(input);

    await this.sentenceRepository.update(sentence);

    return sentence;
  }

  private async validateContent(content: string, sentenceId: string, categoryId: string | null): Promise<void> {
    const sentenceFoundByContent = await this.sentenceRepository.findByContent(content, categoryId);

    if (sentenceFoundByContent && sentenceFoundByContent.id !== sentenceId) {
      throw new ConflictHTTPError(SENTENCE_ALREADY_EXISTS_ERROR);
    }
  }
}

export namespace UpdateSentenceService {
  export type Input = UpdateSentenceBody & UpdateSentenceParams;
  export type Output = Sentence;
}
