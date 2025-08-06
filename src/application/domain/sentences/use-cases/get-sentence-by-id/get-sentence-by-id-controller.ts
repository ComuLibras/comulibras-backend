import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetSentenceByIdParams, getSentenceByIdParams } from './get-sentence-by-id-dto';
import { GetSentenceByIdService } from './get-sentence-by-id-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ params: getSentenceByIdParams })
export class GetSentenceByIdController extends Controller<SentenceHttpSchema> {
  constructor(
    @Inject('GetSentenceByIdService')
    private readonly getSentenceByIdService: GetSentenceByIdService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, never, GetSentenceByIdParams>): Controller.HandleResponse<SentenceHttpSchema> {
    const sentence = await this.getSentenceByIdService.execute({
      ...request.params,
      account: request.account,
    });

    return SentenceMapper.toHttp(sentence);
  }
}
