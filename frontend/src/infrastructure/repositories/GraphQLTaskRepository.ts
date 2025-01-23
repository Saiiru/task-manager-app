// src/infrastructure/repositories/GraphQLTaskRepository.ts
import { ApolloClient } from '@apollo/client';
import { ITaskRepository } from '@/application/ports/TaskRepository';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/domain/entities/Task';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '@/infrastructure/graphql/mutations/tasks';

export class GraphQLTaskRepository implements ITaskRepository {
  constructor(private client: ApolloClient<any>) {}

  async getTasks(): Promise<Task[]> {
    const { data } = await this.client.query({ query: GET_TASKS });
    return data.tasks;
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    const { data } = await this.client.mutate({
      mutation: CREATE_TASK,
      variables: { input: task },
    });
    return data.createTask;
  }

  async updateTask(task: UpdateTaskDTO): Promise<Task> {
    const { data } = await this.client.mutate({
      mutation: UPDATE_TASK,
      variables: { input: task },
    });
    return data.updateTask;
  }

  async deleteTask(id: string): Promise<void> {
    await this.client.mutate({
      mutation: DELETE_TASK,
      variables: { id },
    });
  }
}
