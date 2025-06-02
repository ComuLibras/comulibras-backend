import { JWTTokenProvider } from '../../../providers/token-provider/jwt-token-provider';
import { ITokenProvider } from '../../../providers/token-provider/token-provider';
import { AuthenticationMiddleware } from '../authentication-middleware';

export function makeAuthenticationMiddleware(
  tokenProviderParam?: ITokenProvider,
) {
  const tokenProvider = tokenProviderParam ?? new JWTTokenProvider();

  return new AuthenticationMiddleware(tokenProvider);
}
