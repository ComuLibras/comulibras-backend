export interface IDecodedAccount {
  sub?: string;
  role?: string | null;
}

export interface IDecodedStripe {
  sub?: string;
}

export interface ITokenOptions {
  sub: string;
  role: string;
  expiresIn?: string;
}

export interface ITokenProvider {
  generateToken(options: ITokenOptions): string;
  verifyToken(token: string): IDecodedAccount;
}
