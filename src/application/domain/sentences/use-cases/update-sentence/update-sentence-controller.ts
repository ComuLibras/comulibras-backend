import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { UpdateSentenceBody, updateSentenceBody, UpdateSentenceParams, updateSentenceParams } from './update-sentence-dto';
import { UpdateSentenceService } from './update-sentence-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateSentenceBody, params: updateSentenceParams })
export class UpdateSentenceController extends Controller {

  constructor(
    @Inject('UpdateSentenceService')
    private readonly updateSentenceService: UpdateSentenceService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateSentenceBody, never, UpdateSentenceParams>): Promise<Controller.HandleResponse<SentenceHttpSchema>> {
    const sentence = await this.updateSentenceService.execute({
      ...request.body,
      ...request.params,
    });

    return SentenceMapper.toHttp(sentence);
  }
}
