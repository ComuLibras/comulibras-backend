import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetSentencesQuery, getSentencesQuery } from './get-sentences-dto';
import { GetSentencesService } from './get-sentences-service';

type GetSentencesResponse = {
  sentences: SentenceHttpSchema[];
  totalSentences: number;
};

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ query: getSentencesQuery })
export class GetSentencesController extends Controller<GetSentencesResponse> {
  constructor(
    @Inject('GetSentencesService')
    private readonly getSentencesService: GetSentencesService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, GetSentencesQuery>): Controller.HandleResponse<GetSentencesResponse> {
    const sentences = await this.getSentencesService.execute(request.query);
    return {
      sentences: sentences.sentences.map(SentenceMapper.toHttp),
      totalSentences: sentences.totalSentences,
    };
  }
}
