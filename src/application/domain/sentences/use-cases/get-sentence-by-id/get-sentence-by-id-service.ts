import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { GetSentenceByIdParams } from './get-sentence-by-id-dto';

@Injectable()
export class GetSentenceByIdService implements IService<GetSentenceByIdService.Input, GetSentenceByIdService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,
  ) {}

  async execute(input: GetSentenceByIdService.Input): Promise<GetSentenceByIdService.Output> {
    const sentence = await this.sentenceRepo.findById(input.sentenceId, input.account?.id);

    if (!sentence) {
      throw new NotFoundHTTPError('Sentence not found');
    }

    if (input.account?.role === 'USER' && !sentence.props.isActive) {
      throw new NotFoundHTTPError('Sentence not found');
    }

    return sentence;
  }
}

export namespace GetSentenceByIdService {
  export type Input = GetSentenceByIdParams & { account?: Http.Account };
  export type Output = NonNullable<Awaited<ReturnType<ISentenceRepository['findById']>>>;
}
