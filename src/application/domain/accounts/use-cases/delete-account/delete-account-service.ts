import { ACCOUNT_NOT_FOUND_ERROR } from '@domain/accounts/docs/constants';
import { IAccountRepository } from '@domain/accounts/repositories/account-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { DeleteAccountParams } from './delete-account-dto';

@Injectable()
export class DeleteAccountService implements IService<DeleteAccountService.Input, DeleteAccountService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: DeleteAccountService.Input): Promise<DeleteAccountService.Output> {
    const accountFound = await this.accountRepo.getAccountById(input.accountId);

    if (!accountFound) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    await this.accountRepo.deleteAccount(input.accountId);
  }
}

export namespace DeleteAccountService {
  export type Input = DeleteAccountParams;
  export type Output = void;
}
