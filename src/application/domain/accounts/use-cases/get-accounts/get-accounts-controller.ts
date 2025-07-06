
import { AccountHttpSchema, AccountMapper } from '@domain/accounts/mappers/account-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetAccountsQuery, getAccountsQuery } from './get-accounts-dto';
import { GetAccountsService } from './get-accounts-service';

type GetAccountsResponse = {
  accounts: AccountHttpSchema[];
  totalAccounts: number;
};

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ query: getAccountsQuery })
export class GetAccountsController extends Controller<GetAccountsResponse> {
  constructor(
    @Inject('GetAccountsService')
    private readonly getAccountsService: GetAccountsService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, GetAccountsQuery>): Controller.HandleResponse<GetAccountsResponse> {
    const account = await this.getAccountsService.execute(request.query);

    return {
      accounts: account.accounts.map(AccountMapper.toHttp),
      totalAccounts: account.totalAccounts,
    };
  }
}
