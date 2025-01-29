import { gql } from "@apollo/client";
import { client } from "@/infrastructure/graphql/apollo-client";

const REGISTER_MUTATION = gql`
  mutation Register($input: UserRegister!) {
    register(input: $input) {
      id
      email
      name
      lastName
      avatar
      createdAt
      updatedAt
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: UserLogin!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
        lastName
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;

export class AuthService {
  async registerUser(input: UserRegister) {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { input },
    });
    return data.register;
  }

  async login(input: UserLogin) {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input },
    });
    return data.login;
  }
}
