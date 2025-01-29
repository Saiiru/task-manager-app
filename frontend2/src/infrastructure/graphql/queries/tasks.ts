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
      createdAt
      updatedAt
    }
  }
`;
