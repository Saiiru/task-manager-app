import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($input: UserLogin!) {
    login(input: $input) {
      user {
        id
        email
        name
        lastName
        createdAt
        updatedAt
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserRegister!) {
    register(input: $input) {
      id
      email
      name
      lastName
      createdAt
      updatedAt
    }
  }
`;
