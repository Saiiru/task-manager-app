import { Task } from '@/domain/entities/Task';
import { TaskRepository } from '@/domain/repositories/TaskRepository';

export class TaskUseCases {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getPaginatedTasks(page: number, limit: number): Promise<Task[]> {
    const allTasks = await this.taskRepository.findAll();
    const startIndex = (page - 1) * limit;
    return allTasks.slice(startIndex, startIndex + limit);
  }

  async searchTasks(query: string): Promise<Task[]> {
    const allTasks = await this.taskRepository.findAll();
    return allTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
