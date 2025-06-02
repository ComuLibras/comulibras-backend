import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../../../config/env';
import {
  IDecodedAccount,
  ITokenOptions,
  ITokenProvider,
} from './token-provider';

export class JWTTokenProvider implements ITokenProvider {
  constructor(private readonly jwtSecret: string = env.jwtSecret) {}

  generateToken(options: ITokenOptions): string {
    const accessToken = jwt.sign(
      {
        sub: options.sub,
        role: options.role,
      },
      this.jwtSecret,
      { expiresIn: (options.expiresIn ?? '1d') as unknown as number },
    );

    return accessToken;
  }

  verifyToken(token: string): IDecodedAccount {
    const payload = jwt.verify(token, this.jwtSecret) as JwtPayload;

    return {
      sub: payload.sub,
      role: payload.role,
    };
  }
}
