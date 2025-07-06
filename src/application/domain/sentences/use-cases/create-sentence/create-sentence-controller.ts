import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { CreateSentenceBody, createSentenceBody } from './create-sentence-dto';
import { CreateSentenceService } from './create-sentence-service';

@Injectable()
@HttpResponse(StatusCode.CREATED)
@Schema({ body: createSentenceBody })
export class CreateSentenceController extends Controller {

  constructor(
    @Inject('CreateSentenceService')
    private readonly createSentenceService: CreateSentenceService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<CreateSentenceBody>): Promise<Controller.HandleResponse<SentenceHttpSchema>> {
    const sentence = await this.createSentenceService.execute(request.body);

    return SentenceMapper.toHttp(sentence);
  }
}
