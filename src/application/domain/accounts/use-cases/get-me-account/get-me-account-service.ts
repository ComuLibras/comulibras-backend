import { IAccountRepository } from '@domain/accounts/repositories/account-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

@Injectable()
export class GetMeAccountService implements IService<GetMeAccountService.Input, GetMeAccountService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: GetMeAccountService.Input): Promise<GetMeAccountService.Output> {
    const account = await this.accountRepo.findById(input.accountId);

    if (!account) {
      throw new NotFoundHTTPError('Account not found');
    }

    return account;
  }
}

export namespace GetMeAccountService {
  export type Input = { accountId: string };
  export type Output = NonNullable<Awaited<ReturnType<IAccountRepository['findById']>>>;
}

