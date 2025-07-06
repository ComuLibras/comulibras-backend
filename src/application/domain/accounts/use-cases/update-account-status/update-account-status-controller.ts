
import { AccountHttpSchema, AccountMapper } from '@domain/accounts/mappers/account-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { UpdateAccountStatusBody, updateAccountStatusBody, UpdateAccountStatusParams, updateAccountStatusParams } from './update-account-status-dto';
import { UpdateAccountStatusService } from './update-account-status-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateAccountStatusBody, params: updateAccountStatusParams })
export class UpdateAccountStatusController extends Controller<AccountHttpSchema> {
  constructor(
    @Inject('UpdateAccountStatusService')
    private readonly updateAccountStatusService: UpdateAccountStatusService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateAccountStatusBody, never, UpdateAccountStatusParams>): Controller.HandleResponse<AccountHttpSchema> {
    const account = await this.updateAccountStatusService.execute({
      ...request.body,
      ...request.params,
    });

    return AccountMapper.toHttp(account);
  }
}
