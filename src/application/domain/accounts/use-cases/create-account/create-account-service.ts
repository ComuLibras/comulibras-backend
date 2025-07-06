import { Account } from '@domain/accounts/entities/account';
import { IAccountRepository } from '@domain/accounts/repositories/account-repository';
import { ACCOUNT_ALREADY_EXISTS_ERROR } from '@domain/auth/docs/sign-up-swagger';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { IService } from '@shared/http/interfaces/service';

import { CreateAccountBody } from './create-account-dto';

@Injectable()
export class CreateAccountService implements IService<CreateAccountService.Input, CreateAccountService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: CreateAccountService.Input): Promise<CreateAccountService.Output> {
    const accountAlreadyExists = await this.accountRepo.getAccountByEmail(input.email);

    if (accountAlreadyExists) {
      throw new ConflictHTTPError(ACCOUNT_ALREADY_EXISTS_ERROR);
    }

    const account = new Account({
      name: input.name,
      email: input.email,
      role: input.role,
      isActive: true,
      isPasswordCreated: false,
    });

    await this.accountRepo.createAccount(account);

    return account;
  }
}

export namespace CreateAccountService {
  export type Input = CreateAccountBody;
  export type Output = Account;
}
