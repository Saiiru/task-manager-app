// src/application/ports/TaskRepository.ts
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/domain/entities/Task';

export interface ITaskRepository {
  getTasks(): Promise<Task[]>;
  createTask(task: CreateTaskDTO): Promise<Task>;
  updateTask(task: UpdateTaskDTO): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
