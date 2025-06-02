import { container } from '.';
import { BcryptyHashProvider } from '../../../shared/providers/hash-provider/bcrypt-hash-providers';
import { JWTTokenProvider } from '../../../shared/providers/token-provider/jwt-token-provider';

export function registerProviders() {
  container.register(BcryptyHashProvider, 'HashProvider');
  container.register(JWTTokenProvider, 'TokenProvider');
}
