import { ApolloClient } from '@apollo/client';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { AuthCredentials, AuthResponse } from '@/domain/entities/User';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from '@/application/services/AuthService';
import { createApolloClient } from '@/lib/apollo/apollo-client';

export class AuthRepository implements IAuthRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = createApolloClient();
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input: credentials },
    });
    return data.login;
  }

  async register(
    userData: AuthCredentials & { name: string },
  ): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { input: userData },
    });
    return data.register;
  }
}
