import { gql } from '@apollo/client';

export const GET_TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      date
      isCompleted
      isImportant
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      date
      isCompleted
      isImportant
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      date
      isCompleted
      isImportant
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
