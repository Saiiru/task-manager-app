import { gql } from "@apollo/client";
import client from "@/apollo/client";

export const fetchTasks = async (
  name?: string,
  page?: number,
  limit?: number
) => {
  const query = gql`
    query GetTasks($name: String, $page: Int, $limit: Int) {
      tasks(name: $name, page: $page, limit: $limit) {
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
  const variables = { name, page, limit };
  const response = await client.query({ query, variables });
  return response.data.tasks;
};

export const createTask = async (task: {
  title: string;
  description: string;
  userId: string;
  isImportant: boolean;
  date: string;
}) => {
  const mutation = gql`
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
  const variables = { input: task };
  const response = await client.mutate({ mutation, variables });
  return response.data.createTask;
};

export const updateTask = async (task: {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
  date: string;
}) => {
  const mutation = gql`
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
  const variables = { input: task };
  const response = await client.mutate({ mutation, variables });
  return response.data.updateTask;
};

export const deleteTask = async (id: string) => {
  const mutation = gql`
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id)
    }
  `;
  const variables = { id };
  const response = await client.mutate({ mutation, variables });
  return response.data.deleteTask;
};
