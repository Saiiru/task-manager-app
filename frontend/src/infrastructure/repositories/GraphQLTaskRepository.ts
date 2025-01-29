import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($filter: TaskFilter) {
    tasks(filter: $filter) {
      edges {
        node {
          id
          title
          description
          userId
          isCompleted
          isImportant
          date
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        totalCount
      }
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      userId
      isCompleted
      isImportant
      date
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: NewTask!) {
    createTask(input: $input) {
      id
      title
      description
      userId
      isCompleted
      isImportant
      date
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      userId
      isCompleted
      isImportant
      date
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
