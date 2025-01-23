import { ApolloClient } from '@apollo/client';
import { IAuthRepository } from '@/application/ports/UserRepository';
import { AuthInput, AuthResponse, User } from '@/domain/entities/User';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_CURRENT_USER,
} from '@/infrastructure/graphql/mutations/users';
import { getApolloClient } from '@/infrastructure/graphql/apollo-client';

export class GraphQLUserRepository implements IAuthRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = getApolloClient();
  }

  async login(input: AuthInput): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input },
    });
    return data.login;
  }

  async register(input: AuthInput & { name: string }): Promise<AuthResponse> {
    const { data } = await this.client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { input },
    });
    return data.register;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await this.client.query({
        query: GET_CURRENT_USER,
      });
      return data.me;
    } catch {
      return null;
    }
  }
}
