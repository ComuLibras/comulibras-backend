import { IAccountRepository, IGetAccountsResponse } from '@domain/accounts/repositories/account-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { IService } from '@shared/http/interfaces/service';

import { GetAccountsQuery } from './get-accounts-dto';

@Injectable()
export class GetAccountsService implements IService<GetAccountsService.Input, GetAccountsService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: GetAccountsService.Input): Promise<GetAccountsService.Output> {
    const accountResponse = await this.accountRepo.findAll(input);

    return accountResponse;
  }
}

export namespace GetAccountsService {
  export type Input = GetAccountsQuery & {
    accountId: string;
  };
  export type Output = IGetAccountsResponse;
}
