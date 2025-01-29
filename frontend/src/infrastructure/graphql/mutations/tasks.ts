import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: NewTask!) {
    createTask(input: $input) {
      id
      title
      description
      userId
      isCompleted
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTask!) {
    updateTask(input: $input) {
      id
      title
      description
      userId
      isCompleted
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
