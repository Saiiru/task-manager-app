import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:8080/graphql");

export const getUser = async (id) => {
  const query = gql`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        lastName
        email
        createdAt
        updatedAt
      }
    }
  `;
  const variables = { id };
  const data = await client.request(query, variables);
  return data.user;
};

export const getUsers = async () => {
  const query = gql`
    query GetUsers {
      users {
        id
        name
        lastName
        email
        createdAt
        updatedAt
      }
    }
  `;
  const data = await client.request(query);
  return data.users;
};

export const register = async (input) => {
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
  const variables = { input };
  const data = await client.request(mutation, variables);
  return data.register;
};

export const login = async (input) => {
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
  const variables = { input };
  const data = await client.request(mutation, variables);
  return data.login;
};

export const updateUser = async (input) => {
  const mutation = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        name
        lastName
        email
        createdAt
        updatedAt
      }
    }
  `;
  const variables = { input };
  const data = await client.request(mutation, variables);
  return data.updateUser;
};
