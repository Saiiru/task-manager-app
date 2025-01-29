import { client } from "@/infrastructure/graphql/apollo-client";
import { GET_TASKS } from "@/infrastructure/graphql/queries/tasks";
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "@/infrastructure/graphql/mutations/tasks";
import { Task, NewTask } from "@/domain/entities/Task";

class TaskService {
  async getTasks(filter: any) {
    const { data } = await client.query({
      query: GET_TASKS,
      variables: { filter },
    });
    return data.tasks;
  }

  async createTask(input: NewTask) {
    const { data } = await client.mutate({
      mutation: CREATE_TASK,
      variables: { input },
    });
    return data.createTask;
  }

  async updateTask(input: UpdateTask) {
    const { data } = await client.mutate({
      mutation: UPDATE_TASK,
      variables: { input },
    });
    return data.updateTask;
  }

  async deleteTask(id: string) {
    const { data } = await client.mutate({
      mutation: DELETE_TASK,
      variables: { id },
    });
    return data.deleteTask;
  }
}

export default new TaskService();
