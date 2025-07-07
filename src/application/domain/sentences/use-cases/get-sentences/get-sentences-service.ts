import { IGetSentencesResponse, ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { IService } from '@shared/http/interfaces/service';

import { GetSentencesQuery } from './get-sentences-dto';

@Injectable()
export class GetSentencesService implements IService<GetSentencesService.Input, GetSentencesService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,
  ) {}

  async execute(input: GetSentencesService.Input): Promise<GetSentencesService.Output> {

    const { sentences, totalSentences } = await this.sentenceRepo.findAll(input);

    return {
      sentences: sentences,
      totalSentences,
    };
  }
}

export namespace GetSentencesService {
  export type Input = GetSentencesQuery & { account?: Http.Account };
  export type Output = IGetSentencesResponse;
}
