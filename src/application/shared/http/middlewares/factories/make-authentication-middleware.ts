import { JWTTokenProvider } from '@shared/providers/token-provider/jwt-token-provider';
import { ITokenProvider } from '@shared/providers/token-provider/token-provider';

import { AuthenticationMiddleware } from '../authentication-middleware';

export function makeAuthenticationMiddleware(
  options?: {
    tokenProvider?: ITokenProvider;
    optional?: boolean;
  },
) {
  const { tokenProvider = new JWTTokenProvider(), optional = false } = options ?? {};

  return new AuthenticationMiddleware(tokenProvider, optional);
}
