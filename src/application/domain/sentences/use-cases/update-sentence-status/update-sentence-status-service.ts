
import { SENTENCE_NOT_FOUND_ERROR } from '@domain/sentences/docs/constants';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateSentenceStatusBody, UpdateSentenceStatusParams } from './update-sentence-status-dto';

@Injectable()
export class UpdateSentenceStatusService implements IService<UpdateSentenceStatusService.Input, UpdateSentenceStatusService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,
  ) {}

  async execute(input: UpdateSentenceStatusService.Input): Promise<UpdateSentenceStatusService.Output> {
    const sentence = await this.sentenceRepo.findById(input.sentenceId);

    if (!sentence) {
      throw new NotFoundHTTPError(SENTENCE_NOT_FOUND_ERROR);
    }

    sentence.updateStatus(input.isActive);

    await this.sentenceRepo.update(sentence);

    return sentence;
  }
}

export namespace UpdateSentenceStatusService {
  export type Input = UpdateSentenceStatusBody & UpdateSentenceStatusParams;
  export type Output = Sentence;
}
