import { AccountHttpSchema, AccountMapper } from '@domain/accounts/mappers/account-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetMeAccountService } from './get-me-account-service';

@Injectable()
@HttpResponse(StatusCode.OK)
export class GetMeAccountController extends Controller<AccountHttpSchema> {
  constructor(
    @Inject('GetMeAccountService')
    private readonly getMeAccountService: GetMeAccountService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request): Controller.HandleResponse<AccountHttpSchema> {
    const account = await this.getMeAccountService.execute({
      accountId: request.account!.id,
    });

    return AccountMapper.toHttp(account);
  }
}

