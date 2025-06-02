import { compare, hash } from 'bcryptjs';
import { IHashProvider } from './hash-provider';

export class BcryptyHashProvider implements IHashProvider {
  constructor(private readonly salt: number = 10) {}

  async encrypt(payload: string): Promise<string> {
    const generatedHash = await hash(payload, this.salt);

    return generatedHash;
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const isValid = await compare(payload, hash);

    return isValid;
  }
}
