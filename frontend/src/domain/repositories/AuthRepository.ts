import { AuthCredentials, AuthResponse } from '../entities/User';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  register(user: AuthCredentials & { name: string }): Promise<AuthResponse>;
}
