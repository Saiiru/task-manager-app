import { gql } from "@apollo/client";
import client from "@/apollo/client";

export const login = async (email: string, password: string) => {
  const mutation = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
          name
          lastName
          email
        }
      }
    }
  `;
  const variables = { input: { email, password } };
  const response = await client.mutate({ mutation, variables });
  return response.data.login;
};

export const register = async (
  name: string,
  lastName: string,
  email: string,
  password: string
) => {
  const mutation = gql`
    mutation Register($input: NewUser!) {
      register(input: $input) {
        token
        user {
          id
          name
          lastName
          email
        }
      }
    }
  `;
  const variables = { input: { name, lastName, email, password } };
  const response = await client.mutate({ mutation, variables });
  return response.data.register;
};
