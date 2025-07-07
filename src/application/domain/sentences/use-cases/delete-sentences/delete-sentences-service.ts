
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { IService } from '@shared/http/interfaces/service';

import { DeleteSentencesBody } from './delete-sentences-dto';

@Injectable()
export class DeleteSentencesService implements IService<DeleteSentencesService.Input, DeleteSentencesService.Output> {
  constructor(
    @Inject('SentenceRepository') private readonly sentenceRepository: ISentenceRepository,
  ) {}

  async execute(input: DeleteSentencesService.Input): Promise<DeleteSentencesService.Output> {
    await this.sentenceRepository.deleteMany(input.sentenceIds);
  }
}

export namespace DeleteSentencesService {
  export type Input = DeleteSentencesBody;
  export type Output = void;
}
