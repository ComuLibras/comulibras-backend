
import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { type UpdateSentenceStatusBody, updateSentenceStatusBody, type UpdateSentenceStatusParams, updateSentenceStatusParams } from './update-sentence-status-dto';
import { UpdateSentenceStatusService } from './update-sentence-status-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateSentenceStatusBody, params: updateSentenceStatusParams })
export class UpdateSentenceStatusController extends Controller<SentenceHttpSchema> {
  constructor(
    @Inject('UpdateSentenceStatusService')
    private readonly updateSentenceStatusService: UpdateSentenceStatusService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateSentenceStatusBody, never, UpdateSentenceStatusParams>): Controller.HandleResponse<SentenceHttpSchema> {
    const sentence = await this.updateSentenceStatusService.execute({
      ...request.body,
      ...request.params,
    });

    return SentenceMapper.toHttp(sentence);
  }
}
