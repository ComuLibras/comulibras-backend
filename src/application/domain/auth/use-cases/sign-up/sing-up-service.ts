import { Inject } from '../../../../kernel/decorators/inject';
import { Injectable } from '../../../../kernel/decorators/injectable';
import { ConflictHTTPError } from '../../../../shared/http/errors/conflict-http-error';
import { IService } from '../../../../shared/http/interfaces/service';
import { IHashProvider } from '../../../../shared/providers/hash-provider/hash-provider';
import { ITokenProvider } from '../../../../shared/providers/token-provider/token-provider';
import { Account } from '../../../accounts/entities/account';
import { Roles } from '../../../accounts/entities/role';
import { IAccountRepository } from '../../../accounts/repositories/account-repository';
import {
  ACCOUNT_ALREADY_EXISTS_ERROR,
  SignUpSchema,
} from '../../docs/sign-up-swagger';
import { SignUpBody } from './sign-up-dto';

@Injectable()
export class SignUpService
  implements IService<SignUpService.Input, SignUpService.Output>
{
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
    @Inject('HashProvider') private readonly hashProvider: IHashProvider,
    @Inject('TokenProvider') private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute({
    name,
    email,
    password,
  }: SignUpService.Input): Promise<SignUpService.Output> {
    const accountFound = await this.accountRepo.getAccountByEmail(email);

    if (accountFound) {
      throw new ConflictHTTPError(ACCOUNT_ALREADY_EXISTS_ERROR);
    }

    const hashedPassword = await this.hashProvider.encrypt(password);

    const account = new Account({
      name,
      email,
      password: hashedPassword,
      role: Roles.USER,
    });

    await this.accountRepo.createAccount(account);

    const accessToken = this.tokenProvider.generateToken({
      sub: account.id,
      role: account.role,
      expiresIn: '1d',
    });

    return {
      accessToken,
      role: account.role,
    };
  }
}

export namespace SignUpService {
  export type Input = SignUpBody;
  export type Output = SignUpSchema;
}
