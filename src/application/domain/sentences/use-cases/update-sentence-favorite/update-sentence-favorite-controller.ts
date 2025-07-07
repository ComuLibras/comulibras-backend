import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { type UpdateSentenceFavoriteBody, updateSentenceFavoriteBody, type UpdateSentenceFavoriteParams, updateSentenceFavoriteParams } from './update-sentence-favorite-dto';
import { UpdateSentenceFavoriteService } from './update-sentence-favorite-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateSentenceFavoriteBody, params: updateSentenceFavoriteParams })
export class UpdateSentenceFavoriteController extends Controller<SentenceHttpSchema> {
  constructor(
    @Inject('UpdateSentenceFavoriteService')
    private readonly updateSentenceFavoriteService: UpdateSentenceFavoriteService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateSentenceFavoriteBody, never, UpdateSentenceFavoriteParams>): Controller.HandleResponse<SentenceHttpSchema> {
    const sentence = await this.updateSentenceFavoriteService.execute({
      ...request.body,
      ...request.params,
      accountId: request.account?.id ?? '',
    });

    return SentenceMapper.toHttp(sentence);
  }
}
