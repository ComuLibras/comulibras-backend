import { SENTENCE_NOT_FOUND_ERROR } from '@domain/sentences/docs/constants';
import { Sentence } from '@domain/sentences/entities/sentence';
import { ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateSentenceFavoriteBody, UpdateSentenceFavoriteParams } from './update-sentence-favorite-dto';

@Injectable()
export class UpdateSentenceFavoriteService implements IService<UpdateSentenceFavoriteService.Input, UpdateSentenceFavoriteService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,
  ) {}

  async execute(input: UpdateSentenceFavoriteService.Input): Promise<UpdateSentenceFavoriteService.Output> {
    const sentence = await this.sentenceRepo.findById(input.sentenceId);

    if (!sentence) {
      throw new NotFoundHTTPError(SENTENCE_NOT_FOUND_ERROR);
    }

    if (input.isFavorite) {
      await this.sentenceRepo.favorite(sentence.id, input.accountId);
      sentence.updateFavorite(true);
    } else {
      await this.sentenceRepo.unfavorite(sentence.id, input.accountId);
      sentence.updateFavorite(false);
    }

    return sentence;
  }
}

export namespace UpdateSentenceFavoriteService {
  export type Input = UpdateSentenceFavoriteBody & UpdateSentenceFavoriteParams & { accountId: string };
  export type Output = Sentence;
}
