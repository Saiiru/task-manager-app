import { ApolloClient } from "@apollo/client";
import {
  UserRepository,
  RegisterInput,
  RegisterResponse,
  LoginInput,
  LoginResponse,
} from "@/application/ports/UserRepository";
import {
  LOGIN_USER,
  REGISTER_USER,
} from "@/infrastructure/graphql/mutations/users";

export class GraphQLUserRepository implements UserRepository {
  constructor(private client: ApolloClient<any>) {}

  async register(input: RegisterInput): Promise<RegisterResponse> {
    const { data } = await this.client.mutate({
      mutation: REGISTER_USER,
      variables: { input },
      fetchPolicy: "no-cache",
    });

    if (!data?.register) {
      throw new Error("Registration failed");
    }

    return data.register;
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const { data } = await this.client.mutate({
      mutation: LOGIN_USER,
      variables: { input },
      fetchPolicy: "no-cache",
    });

    if (!data?.login) {
      throw new Error("Login failed");
    }

    return data.login;
  }
}
