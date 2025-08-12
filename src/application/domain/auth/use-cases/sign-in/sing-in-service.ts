import { IAccountRepository } from '@domain/accounts/repositories/account-repository';
import { INVALID_CREDENTIALS_ERROR, SignInSchema } from '@domain/auth/docs/sign-in-swagger';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { UnauthorizedHTTPError } from '@shared/http/errors/unauthorized-http-error';
import { IService } from '@shared/http/interfaces/service';
import { IHashProvider } from '@shared/providers/hash-provider/hash-provider';
import { ITokenProvider } from '@shared/providers/token-provider/token-provider';

import { SignInBody } from './sign-in-dto';

@Injectable()
export class SignInService
  implements IService<SignInService.Input, SignInService.Output>
{
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
    @Inject('HashProvider') private readonly hashProvider: IHashProvider,
    @Inject('TokenProvider') private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute({
    email,
    password,
  }: SignInService.Input): Promise<SignInService.Output> {
    const account = await this.accountRepo.findByEmail(email);

    if (!account || !account.props.password || !account.props.isActive) {
      throw new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR);
    }

    const isPasswordValid = await this.hashProvider.compare(
      password,
      account.props.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedHTTPError(INVALID_CREDENTIALS_ERROR);
    }

    const accessToken = this.tokenProvider.generateToken({
      sub: account.id,
      role: account.props.role,
      expiresIn: '1d',
    });

    return {
      accessToken,
      role: account.props.role,
    };
  }
}

export namespace SignInService {
  export type Input = SignInBody;
  export type Output = SignInSchema;
}
