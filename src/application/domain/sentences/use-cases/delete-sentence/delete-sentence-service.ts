
import { SENTENCE_NOT_FOUND_ERROR } from '@domain/sentences/docs/constants';
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
  ) {}

  async execute(input: DeleteSentenceService.Input): Promise<DeleteSentenceService.Output> {
    await this.validateSentence(input.sentenceId);

    await this.sentenceRepository.delete(input.sentenceId);
  }

  private async validateSentence(sentenceId: string): Promise<void> {
    const sentence = await this.sentenceRepository.findById(sentenceId);
    if (!sentence) {
      throw new NotFoundHTTPError(SENTENCE_NOT_FOUND_ERROR);
    }
  }
}

export namespace DeleteSentenceService {
  export type Input = DeleteSentenceParams;
  export type Output = void;
}
