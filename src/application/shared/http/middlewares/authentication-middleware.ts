import { Inject } from '@kernel/decorators/inject';
import { ITokenProvider } from '../../providers/token-provider/token-provider';
import { UnauthorizedHTTPError } from '../errors/unauthorized-http-error';
import { IData, IMiddleware } from '../interfaces/middleware';

export const INVALID_TOKEN_ERROR = 'Token de acesso inválido';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(
    @Inject('TokenProvider') private readonly tokenProvider: ITokenProvider,
  ) {}

  async handle({ headers }: Http.Request): Promise<Http.Response | IData> {
    const { authorization } = headers;

    if (!authorization) {
      throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
      }

      const payload = this.tokenProvider.verifyToken(token);

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      throw new UnauthorizedHTTPError(INVALID_TOKEN_ERROR);
    }
  }
}
